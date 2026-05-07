from flask import Flask, request, jsonify
from flask_cors import CORS
from scanner import scan_website

app = Flask(__name__)

# Allow your specific frontend origin and support common headers
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

@app.route("/ping", methods=["GET"])
def ping():
    return jsonify({"status": "online", "message": "Backend is reachable"})

@app.route("/scan", methods=["GET"])
def scan():
    url = request.args.get("url")
    if not url:
        return jsonify({"error": "No URL provided"}), 400
    
    try:
        print(f"DEBUG: Scanning URL -> {url}")
        scan_result = scan_website(url)
        return jsonify(scan_result)
    except Exception as e:
        print(f"ERROR: {str(e)}")
        return jsonify({"error": "Internal server error", "details": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, host='127.0.0.1', port=5000)