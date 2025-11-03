# Event Registration System

A modern, responsive web-based registration form for events or festivals with comprehensive validation and CSV data storage.

## Features

- **Modern, Clean Design**: Beautiful UI with gradient backgrounds and smooth transitions
- **Responsive Layout**: Works perfectly on desktop, tablet, and mobile devices
- **Comprehensive Validation**: Client-side validation for all form fields
- **Dynamic Fields**: Conditional fields based on user selections
- **CSV Storage**: All registrations saved to a CSV file
- **Poornima Brand Colors**: Beautiful blue and purple theme

## Form Sections

### 1. Basic Information
- Full Name (required)
- Gender (required, radio buttons)
- Email Address (required, validated)
- Select College (dropdown)
  - Poornima College
  - Poornima Institute
  - Poornima University
  - Other (shows additional text field)
- Year of Study (dropdown)

### 2. If Poornima (Any)
*Appears only when Poornima college is selected*
- Residence Type (Hostel/Day Scholar)
- Hostel Name (required if Hostel selected)
- College Registration ID (required, alphanumeric validation)

### 3. Upload NOC
- File upload (PDF, JPG, PNG, max 5MB)
- OR Google Drive link

### 4. Interested Events
- Select Event (required)
  - RC Car
  - Robo Soccer
  - Robo War
  - MOM
  - Circuitary
  - Mini War
  - Tank War
  - Spud Gun
- Team Leader Name (required when event selected)
- Number of Team Members (required, 1-10)
- Member 1 Name & Registration ID
- Member 2 Name & Registration ID

## Installation & Usage

### Option 1: Standalone Version (No Backend Required)

Simply open `standalone.html` in any modern web browser! This version includes all styling and JavaScript inline, allowing you to test the form functionality immediately without any setup.

**Perfect for:**
- Quick testing
- Demonstrations
- When you don't need CSV storage
- Showing form validation in action

### Option 2: Full Version with CSV Storage

1. **Clone or download the project**

2. **Install Python dependencies**:
   ```bash
   pip install -r requirements.txt
   ```
   or
   ```bash
   python -m pip install flask
   ```

3. **Run the Flask application**:
   ```bash
   python app.py
   ```

4. **Open your browser**:
   Navigate to `http://localhost:5000`

## Project Structure

```
register/
│
├── app.py                 # Flask backend server
├── standalone.html        # Standalone version (all-in-one)
├── requirements.txt       # Python dependencies
├── registrations.csv      # Data storage (created automatically)
├── README.md             # This file
│
├── templates/
│   └── index.html        # Main registration form (Flask version)
│
└── static/
    ├── styles.css        # CSS styling
    └── script.js         # JavaScript validation
```

## Validation Features

- All required fields must be filled
- Email format validation
- Alphanumeric validation for Registration IDs
- File upload validation (type and size)
- URL validation for Google Drive links
- Team size validation (1-10 members)
- Real-time error messages

## Data Storage

All registrations are saved to `registrations.csv` with the following columns:

- Name, Gender, Email, College, OtherCollege, Year
- Residence, HostelName, CollegeRegID
- NOCFileLink, Event
- TeamLeader, TeamMembersCount
- Member1Name, Member1RegID, Member2Name, Member2RegID

## Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Flask (Python)
- **Data Storage**: CSV
- **Styling**: Custom CSS with modern design patterns

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Customization

### Changing Colors
Edit `static/styles.css`:
- Main gradient: Line 7-8 (body background)
- Button color: Line 238-239
- Heading color: Line 36

### Adding New Events
Edit `templates/index.html`:
Add new `<option>` tags in the event dropdown (lines 146-156)

### Modifying Validation Rules
Edit `static/script.js`:
- File size limit: Line 51
- Max team size: Line 172

## License

This project is open source and available for educational purposes.

## Contact

For issues or questions, please contact the development team.

