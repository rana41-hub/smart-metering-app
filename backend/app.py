from flask import Flask, request, jsonify
from flask_cors import CORS
from google import genai
import os

import json

app = Flask(__name__)
CORS(app)

STATE_FILE = os.path.join(os.path.dirname(__file__), 'state.json')
USER_STATE_FILE = os.path.join(os.path.dirname(__file__), 'user_state.json')

# Replace with the provided API keys or load from environment variables
GEMINI_API_KEY = "dummy_key"

try:
    client = genai.Client(api_key=GEMINI_API_KEY)
except Exception as e:
    print(f"Error initializing Gemini client: {e}")
    client = None

@app.route('/status', methods=['GET'])
def get_status():
    try:
        if os.path.exists(STATE_FILE):
            with open(STATE_FILE, 'r') as f:
                data = json.load(f)
            return jsonify(data)
        else:
            return jsonify({"state": "off"}), 200
    except Exception as e:
        print(f"[ERROR] Failed to read state.json: {e}")
        return jsonify({"error": "Cannot read state file"}), 500

@app.route('/state', methods=['POST'])
def update_state():
    try:
        data = request.json
        new_state = data.get('state')
        if new_state not in ['on', 'off']:
            return jsonify({"error": "state must be 'on' or 'off'"}), 400
        
        with open(STATE_FILE, 'w') as f:
            json.dump({"state": new_state}, f, indent=2)
            
        return jsonify({"success": True, "state": new_state})
    except Exception as e:
        print(f"[ERROR] Failed to write state.json: {e}")
        return jsonify({"error": "Failed to update state"}), 500

@app.route('/user/status', methods=['GET'])
def get_user_status():
    try:
        if os.path.exists(USER_STATE_FILE):
            with open(USER_STATE_FILE, 'r') as f:
                data = json.load(f)
            return jsonify(data)
        else:
            return jsonify({"blocked": False}), 200
    except Exception as e:
        print(f"[ERROR] Failed to read user_state.json: {e}")
        return jsonify({"error": "Cannot read user state file"}), 500

@app.route('/user/block', methods=['POST'])
def update_user_status():
    try:
        data = request.json
        is_blocked = data.get('blocked', False)
        
        with open(USER_STATE_FILE, 'w') as f:
            json.dump({"blocked": is_blocked}, f, indent=2)
            
        return jsonify({"success": True, "blocked": is_blocked})
    except Exception as e:
        print(f"[ERROR] Failed to write user_state.json: {e}")
        return jsonify({"error": "Failed to update user state"}), 500

@app.route('/api/chat', methods=['POST'])
def chat():
    if not client:
        return jsonify({"error": "Gemini Client not initialized"}), 500
        
    data = request.json
    user_message = data.get('message', '')
    language = data.get('language', 'English')
    
    if not user_message:
        return jsonify({"error": "No message provided"}), 400

    prompt = f"""You are PrakashAI, the world-class AI assistant for the Prakash Utility App in India.
You help users with their electricity bills, smart home automation, and resolving support tickets.
Always respond in {language}. Be concise, helpful, and professional.
User message: {user_message}
"""

    try:
        response = client.models.generate_content(
            model='gemini-2.5-flash-lite',
            contents=prompt,
        )
        return jsonify({
            "response": response.text,
            "status": "success"
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
