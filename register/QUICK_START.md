# Quick Start Guide

## 🚀 Two Ways to Use This Registration System

### Method 1: Standalone HTML (Recommended for Quick Start)

**The easiest way to get started - no installation required!**

1. Double-click on `standalone.html`
2. It will open in your default web browser
3. Start testing the form immediately!

**What you get:**
- ✅ All form fields working
- ✅ Full validation
- ✅ Dynamic field showing/hiding
- ✅ Beautiful responsive design
- ⚠️ Data won't be saved to CSV (but will be displayed in browser console)

**Perfect for:**
- Quick demonstrations
- Testing form behavior
- Showing to stakeholders
- Learning the form structure

---

### Method 2: Full System with CSV Storage

**For production use with data persistence**

**Prerequisites:**
- Python 3.x installed on your system

**Steps:**

1. Open Terminal/Command Prompt in the project folder

2. Install Flask:
   ```bash
   python -m pip install flask
   ```
   
   Or if you have pip directly:
   ```bash
   pip install -r requirements.txt
   ```

3. Run the server:
   ```bash
   python app.py
   ```

4. Open your browser and go to:
   ```
   http://localhost:5000
   ```

5. Start registering!

**What you get:**
- ✅ Everything from standalone version
- ✅ Data saved to `registrations.csv`
- ✅ Persistent storage
- ✅ Production-ready backend

---

## 📋 Testing the Form

### Test Case 1: Basic Registration (Non-Poornima)
1. Enter: Full Name, select Gender, enter Email
2. Select "Other" for College
3. Enter your college name in the new field
4. Select Year of Study
5. Enter Google Drive link OR upload a file
6. Select an Event
7. Fill in Team Leader and Number of Members
8. Click SUBMIT

### Test Case 2: Poornima Student Registration
1. Enter all basic information
2. Select any "Poornima" college
3. Notice the "If Poornima (Any)" section appears
4. Select Residence Type
5. If Hostel selected, enter Hostel Name
6. Enter College Registration ID (alphanumeric)
7. Complete remaining fields
8. Click SUBMIT

### Test Case 3: Validation Testing
1. Try submitting without filling required fields
2. Enter invalid email format
3. Select file larger than 5MB
4. Enter invalid registration ID with special characters
5. Notice error messages appear below each field

---

## 🎨 Design Features

- **Modern gradient background** (blue-purple theme)
- **Smooth animations** when fields appear/disappear
- **Mobile responsive** - works on phones/tablets
- **Accessibility features** - proper labels and focus states
- **Professional styling** - rounded corners, shadows, hover effects

---

## 🔍 Viewing Saved Data

### With Flask Version:
Data is saved to `registrations.csv` in the project folder. Open it with:
- Microsoft Excel
- Google Sheets
- Any text editor
- Python pandas library

### With Standalone Version:
Open browser console (F12) and check the logged form data after submission.

---

## ❓ Troubleshooting

**Flask won't start:**
- Make sure Python is installed: `python --version`
- Try: `python3 app.py` instead
- Install Flask explicitly: `python -m pip install flask`

**Form validation not working:**
- Check browser console for errors (F12)
- Make sure JavaScript is enabled in your browser
- Try using Chrome or Firefox

**CSV file not created:**
- With standalone version, CSV won't be created
- With Flask version, make sure the app is running
- Check folder permissions

---

## 💡 Tips

1. **Start with standalone.html** to understand the form
2. **Check browser console** for any JavaScript errors
3. **Test on different devices** to see responsive design
4. **Try different combinations** of fields to test conditional logic
5. **Read README.md** for detailed documentation

---

## 🎉 You're Ready!

Open `standalone.html` now and start exploring! 🚀

