import os
import sys
from flask import Flask, send_from_directory

# Determine the correct root path (even after packaging)
if getattr(sys, 'frozen', False):
    # When bundled by PyInstaller
    # sys._MEIPASS is the path to the temp folder where it's unpacked
    base_path = sys._MEIPASS
else:
    # During development (as a .py file)
    # Get the absolute path of the directory containing this script
    base_path = os.path.dirname(os.path.abspath(__file__))

# Define the path to the 'src' folder correctly
# This assumes your static files (index.html, style.css, etc.) are in 'src'
project_root = base_path 
# Initialize Flask, telling it where to find static files
app = Flask(__name__, static_folder=project_root, static_url_path='')

@app.route('/')
def index():
    # Serve 'index.html' from the 'src' directory
    return send_from_directory(project_root, 'index.html')

# Optional: serve other static files automatically
@app.route('/<path:filename>')
def serve_static(filename):
    return send_from_directory(project_root, filename)

if __name__ == '__main__':
    # Try to run on Port 80 (HTTP). If permission denied, fallback to 5000
    try:
        app.run(debug=True, host='0.0.0.0', port=8080)
    except PermissionError:
        print("\n[Error] Permission denied for Port 8080. Are you running as administrator?")
        print("... Starting server on Port 5000 instead ...\n")
        app.run(debug=True, host='0.0.0.0', port=5000)
    except OSError as e:
        # Handle cases where the port is already in use
        if e.errno in [10013, 13, 98]:  # WinError 10013 / EACCES / EADDRINUSE
            print(f"\n[Error] Could not bind to Port 8080 (Error: {e.strerror}).")
            print("... Starting server on Port 5000 instead ...\n")
            app.run(debug=True, host='0.0.0.0', port=5000)
        else:
            raise e  # Re-raise other OS errors