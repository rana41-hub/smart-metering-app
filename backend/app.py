from flask import Flask, request, jsonify
from flask_cors import CORS
from google import genai
import os
import json
from datetime import datetime

app = Flask(__name__)
# Enable CORS for all routes and methods
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

# File Paths
DATA_DIR = os.path.join(os.path.dirname(__file__), 'data')
APPLIANCES_FILE = os.path.join(DATA_DIR, 'appliances.json')
USERS_FILE = os.path.join(DATA_DIR, 'users.json')
LOGS_FILE = os.path.join(DATA_DIR, 'usage_logs.json')
ROUTINES_FILE = os.path.join(DATA_DIR, 'routines.json')
AUTONOMOUS_LOG_FILE = os.path.join(DATA_DIR, 'autonomous_ai_log.json')
CHAT_HISTORY_FILE = os.path.join(DATA_DIR, 'chat_history.json')

STATE_FILE = os.path.join(os.path.dirname(__file__), 'state.json')
USER_STATE_FILE = os.path.join(os.path.dirname(__file__), 'user_state.json')

from dotenv import load_dotenv
load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_KEY_3") or os.getenv("GEMINI_KEY_4") or "dummy_key"

try:
    if GEMINI_API_KEY == "dummy_key":
        client = None
    else:
        client = genai.Client(api_key=GEMINI_API_KEY)
except Exception as e:
    print(f"Error initializing Gemini client: {e}")
    client = None

def _read_json(filepath, default=None):
    if default is None:
        default = []
    try:
        if os.path.exists(filepath):
            with open(filepath, 'r') as f:
                return json.load(f)
        return default
    except Exception as e:
        print(f"Error reading {filepath}: {e}")
        return default

def _write_json(filepath, data):
    try:
        os.makedirs(os.path.dirname(filepath), exist_ok=True)
        with open(filepath, 'w') as f:
            json.dump(data, f, indent=2)
        return True
    except Exception as e:
        print(f"Error writing {filepath}: {e}")
        return False

# --- WEB PANEL Endpoints ---

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({"status": "healthy"})

@app.route('/appliances', methods=['GET'])
def get_appliances():
    data = _read_json(APPLIANCES_FILE)
    return jsonify(data)

@app.route('/appliances/health', methods=['GET'])
def get_appliances_health():
    return jsonify({"success": True, "status": "operational"})

@app.route('/appliances/<uid>/state', methods=['POST'])
def update_appliance_state_by_uid(uid):
    data = request.json
    new_state = data.get('state')
    if not new_state:
        return jsonify({"success": False, "message": "State is required"}), 400

    appliances = _read_json(APPLIANCES_FILE)
    found = False
    for app_item in appliances:
        if str(app_item.get('uid')) == str(uid):
            app_item['state'] = new_state
            if new_state == "on":
                app_item['lastTurnedOnTimestamp'] = int(datetime.now().timestamp() * 1000)
            elif new_state == "off" and app_item.get('lastTurnedOnTimestamp'):
                duration = (int(datetime.now().timestamp() * 1000) - app_item['lastTurnedOnTimestamp']) / (1000 * 60 * 60)
                app_item['todayUsageHours'] = app_item.get('todayUsageHours', 0.0) + duration
            found = True
            break
            
    if found:
        _write_json(APPLIANCES_FILE, appliances)
        return jsonify({"success": True, "appliance": next(a for a in appliances if str(a['uid']) == str(uid))})
    return jsonify({"success": False, "message": "Appliance not found"}), 404

@app.route('/users/<user_id>', methods=['GET'])
def get_user(user_id):
    users = _read_json(USERS_FILE, default={})
    if isinstance(users, list):
        user = next((u for u in users if str(u.get('id', u.get('uid'))) == user_id), None)
        if user:
            return jsonify({"success": True, "user": user})
    elif isinstance(users, dict) and user_id in users:
        return jsonify({"success": True, "user": users[user_id]})
    
    return jsonify({
        "success": True, 
        "user": {
            "id": user_id, 
            "name": "User", 
            "monthlyBudget": 2000, 
            "currentBill": 1250, 
            "energyScore": 85,
            "todayUsageKwh": 8.5
        }
    })

@app.route('/logs', methods=['GET'])
def get_logs():
    return jsonify(_read_json(LOGS_FILE))

@app.route('/autonomous-ai/log', methods=['GET'])
def get_autonomous_log():
    return jsonify(_read_json(AUTONOMOUS_LOG_FILE))

@app.route('/routines', methods=['GET'])
def get_routines():
    return jsonify(_read_json(ROUTINES_FILE))

@app.route('/chatbot', methods=['POST'])
def chatbot_interaction():
    data = request.json
    message = data.get('message', '')
    
    # Define fallback keys in order
    api_keys = [
        os.getenv('GEMINI_API_KEY_2'),
        os.getenv('GEMINI_KEY_3'),
        os.getenv('GEMINI_KEY_4'),
        os.getenv('GEMINI_KEY_1'),
    ]
    # Filter out None/empty keys
    api_keys = [k for k in api_keys if k]
    
    if not api_keys:
        return jsonify({"success": True, "reply": "Gemini API key not configured. This is a mock response from the Python backend."})
    
    prompt = f"You are PrakashAI, a helpful smart home assistant. The user says: {message}"
    
    # Try each key until one succeeds
    for key in api_keys:
        try:
            temp_client = genai.Client(api_key=key)
            response = temp_client.models.generate_content(
                model='gemini-2.5-flash-lite',
                contents=prompt,
            )
            return jsonify({"success": True, "reply": response.text})
        except Exception as e:
            err_str = str(e)
            if "429" in err_str or "exhausted" in err_str.lower() or "quota" in err_str.lower():
                continue # Try the next key!
            return jsonify({"success": False, "error": err_str}), 500

    # If all keys are exhausted
    return jsonify({
        "success": True, 
        "reply": "My AI computing quota is fully exhausted across all backup keys (Rate Limit). Please wait a few minutes for the limit to reset before I can continue answering!"
    })

# --- LEGACY Flutter App Endpoints ---

@app.route('/status', methods=['GET'])
def get_legacy_status():
    data = _read_json(STATE_FILE, default={"state": "off"})
    return jsonify(data)

@app.route('/state', methods=['POST'])
def update_legacy_state():
    data = request.json
    new_state = data.get('state')
    _write_json(STATE_FILE, {"state": new_state})
    return jsonify({"success": True, "state": new_state})

@app.route('/user/status', methods=['GET'])
def get_legacy_user_status():
    # Always return False so the app never shows the "Access Revoked" screen
    return jsonify({"blocked": False})

@app.route('/user/block', methods=['POST'])
def update_legacy_user_status():
    data = request.json
    is_blocked = data.get('blocked', False)
    _write_json(USER_STATE_FILE, {"blocked": is_blocked})
    return jsonify({"success": True, "blocked": is_blocked})

@app.route('/api/chat', methods=['POST'])
def legacy_chat():
    return chatbot_interaction()

if __name__ == '__main__':
    # Render assigns a dynamic port via the PORT environment variable.
    # Defaulting to 3000 for local development matching PrakashAI endpoints.
    port = int(os.environ.get("PORT", 3000))
    app.run(debug=True, host='0.0.0.0', port=port)
