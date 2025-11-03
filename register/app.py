from flask import Flask, render_template, request, jsonify, send_from_directory
import csv
import os
from datetime import datetime

app = Flask(__name__)

# CSV file path
CSV_FILE = 'registrations.csv'

# CSV headers matching the form fields
CSV_HEADERS = [
    'Name', 'Gender', 'Email', 'College', 'OtherCollege', 'Year', 
    'Residence', 'HostelName', 'CollegeRegID', 'NOCFileLink', 'Event', 
    'TeamLeader', 'TeamMembersCount', 'Member1Name', 'Member1RegID', 
    'Member2Name', 'Member2RegID'
]

# Initialize CSV file if it doesn't exist
def init_csv():
    if not os.path.exists(CSV_FILE):
        with open(CSV_FILE, 'w', newline='', encoding='utf-8') as f:
            writer = csv.writer(f)
            writer.writerow(CSV_HEADERS)

# Initialize CSV on startup
init_csv()

# Serve the registration form
@app.route('/')
def index():
    return render_template('index.html')

# Handle form submission
@app.route('/submit', methods=['POST'])
def submit_form():
    try:
        data = request.json
        
        # Prepare CSV row data
        csv_row = [
            data.get('name', ''),
            data.get('gender', ''),
            data.get('email', ''),
            data.get('college', ''),
            data.get('otherCollege', ''),
            data.get('year', ''),
            data.get('residence', ''),
            data.get('hostelName', ''),
            data.get('collegeRegID', ''),
            data.get('nocFileLink', ''),
            data.get('event', ''),
            data.get('teamLeader', ''),
            data.get('teamMembersCount', ''),
            data.get('member1Name', ''),
            data.get('member1RegID', ''),
            data.get('member2Name', ''),
            data.get('member2RegID', '')
        ]
        
        # Append to CSV file
        with open(CSV_FILE, 'a', newline='', encoding='utf-8') as f:
            writer = csv.writer(f)
            writer.writerow(csv_row)
        
        return jsonify({'success': True, 'message': 'Registration saved successfully'}), 200
        
    except Exception as e:
        print(f"Error saving registration: {e}")
        return jsonify({'success': False, 'message': 'Error saving registration'}), 500

# Serve static files
@app.route('/scripts/<path:filename>')
def scripts(filename):
    return send_from_directory('scripts', filename)

if __name__ == '__main__':
    # Ensure CSV is initialized before starting
    init_csv()
    print("Flask app starting...")
    print("Open http://localhost:5000 in your browser")
    app.run(debug=True, port=5000)

