import requests # HTTP requests
import os 

# Class for all GitHub API operations
class GitHubService: 
    def __init__(self): 
        # The base URL for all GitHub API requests
        self.base_url = "https://api.github.com" 

        # Safely grabs the GitHub Personal Access Token from environment variables
        self.token = os.environ.get("GITHUB_TOKEN") 

        # Specifies that we want the v3 JSON version of the GitHub API
        self.headers = {"Accept": "application/vnd.github.v3+json"} 

        if self.token: 
            self.headers["Authorization"] = f"token {self.token}" 

    # A helper method to handle getting data from the API
    def _make_request(self, endpoint): 
        # /users/username
        url = f"{self.base_url}{endpoint}" 
        # Makes a GET request to the calculated URL with our auth headers
        response = requests.get(url, headers=self.headers) 
        response.raise_for_status() 
        return response.json() # Returns the JSON data parsed into a Python dictionary

    # The main method that fetches all analytics for a given user
    def get_user_analytics(self, username): 
        # Gets the basic profile info (name, bio, followers, etc.)
        profile = self._make_request(f"/users/{username}") 

        # Sort by pushed to get recently active repos first
        # Gets up to 100 repositories for the user, starting with the most recently updated
        repos = self._make_request(f"/users/{username}/repos?per_page=100&sort=pushed") 
        
        languages = {}
        for repo in repos:
            lang = repo.get("language") 
            if lang: 
                languages[lang] = languages.get(lang, 0) + 1 
                
        from datetime import datetime, timedelta 
        import collections
        
        # Get the current date
        today = datetime.utcnow().date() 

        # if any missing key. set value to 0, rather than error
        date_counts = collections.defaultdict(int)
        
        # Only check the top 10 most recently pushed, non-fork repos to avoid API limits
        recent_repos = [r for r in repos if not r.get("fork")][:10] 
        
        for repo in recent_repos: # Loop through these top 10 recent repos
            repo_name = repo["name"] # Get the name of the current repo
            try:
                # Fetch recent commits by the user
                commits = self._make_request(f"/repos/{username}/{repo_name}/commits?author={username}&per_page=30") # Fetch the last 30 commits made by the user in this specific repo
                for commit in commits:
                    date_str = commit["commit"]["author"]["date"] 
                    commit_date = datetime.strptime(date_str, "%Y-%m-%dT%H:%M:%SZ").date() 
                    if (today - commit_date).days <= 30: 
                        date_counts[str(commit_date)] += 1 
            except Exception: 
                # Skip to the next repo
                pass 

        # x-axis labels
        timeline_labels = [] 
        # y-axis labels: number of commits
        timeline_data = [] 
        
        for i in range(29, -1, -1): 
            d = today - timedelta(days=i) 
            timeline_labels.append(d.strftime("%b %d")) 
            timeline_data.append(date_counts.get(str(d), 0)) 

        # Calculate coding streak
        streak = 0 
        current_date = today
        while str(current_date) in date_counts and date_counts[str(current_date)] > 0: 
            streak += 1 
            current_date -= timedelta(days=1) 
            
        if streak == 0: 
            # checking from a day before
            current_date = today - timedelta(days=1) 
            while str(current_date) in date_counts and date_counts[str(current_date)] > 0: 
                streak += 1 
                current_date -= timedelta(days=1) 
                
        return {
            "profile": profile, 
            "total_repos": len(repos), 
            "languages": languages, 
            "timeline": { 
                "labels": timeline_labels,
                "data": timeline_data
            },
            "streak": streak 
        }
