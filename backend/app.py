import os 
from flask import Flask, jsonify, request 
from flask_cors import CORS 
from services.github_service import GitHubService 

app = Flask(__name__) 
CORS(app) 

# Initialize GitHub Service
github_service = GitHubService() 

@app.route("/")
def serve_frontend():
    return send_from_directory("../frontend", "index.html")

@app.route('/api/user/<username>', methods=['GET']) 
def get_user_data(username): 
    try: 
        data = github_service.get_user_analytics(username) 
        return jsonify(data), 200 
    except Exception as e: 
        return jsonify({"error": str(e)}), 500 

if __name__ == '__main__': 
    app.run(debug=True, port=5000) 
