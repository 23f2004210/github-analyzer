import os 
from flask import Flask, jsonify, request, render_template, send_from_directory 
from flask_cors import CORS 
from services.github_service import GitHubService 

app = Flask(__name__, static_folder='static', template_folder='templates') 
CORS(app, resources={
    r"/*": {
        "origins": "*"  # Relaxing for Railway/Mobile or keeping the remote intent
    }
}) 


# Initialize GitHub Service
github_service = GitHubService() 

@app.route('/') 
def index(): 
    return render_template('index.html') 

@app.route('/app') 
def dashboard(): 
    return render_template('app.html') 

@app.route('/api/user/<username>', methods=['GET']) 
def get_user_data(username): 
    try: 
        data = github_service.get_user_analytics(username) 
        return jsonify(data), 200 
    except Exception as e: 
        return jsonify({"error": str(e)}), 500 

if __name__ == '__main__': 
    port = int(os.environ.get('PORT', 5000)) 
    app.run(debug=True, host='0.0.0.0', port=port) 
