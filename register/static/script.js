// DOM Elements
const form = document.getElementById('registrationForm');
const collegeSelect = document.getElementById('college');
const otherCollegeGroup = document.getElementById('otherCollegeGroup');
const poornimaSection = document.getElementById('poornimaSection');
const residenceSelect = document.getElementById('residence');
const hostelNameGroup = document.getElementById('hostelNameGroup');
const eventSelect = document.getElementById('event');
const teamFields = document.getElementById('teamFields');
const nocFile = document.getElementById('nocFile');
const fileName = document.getElementById('fileName');

// Show/hide dynamic fields based on selections
collegeSelect.addEventListener('change', function() {
    const value = this.value;
    
    // Show/hide Other College field
    if (value === 'Other') {
        otherCollegeGroup.style.display = 'block';
    } else {
        otherCollegeGroup.style.display = 'none';
        document.getElementById('otherCollege').value = '';
    }
    
    // Show/hide Poornima section
    if (value.includes('Poornima')) {
        poornimaSection.style.display = 'block';
    } else {
        poornimaSection.style.display = 'none';
        document.getElementById('residence').value = '';
        document.getElementById('hostelName').value = '';
        document.getElementById('collegeRegID').value = '';
        hostelNameGroup.style.display = 'none';
    }
});

residenceSelect.addEventListener('change', function() {
    if (this.value === 'Hostel') {
        hostelNameGroup.style.display = 'block';
    } else {
        hostelNameGroup.style.display = 'none';
        document.getElementById('hostelName').value = '';
    }
});

eventSelect.addEventListener('change', function() {
    if (this.value) {
        teamFields.style.display = 'block';
    } else {
        teamFields.style.display = 'none';
        clearTeamFields();
    }
});

nocFile.addEventListener('change', function() {
    if (this.files.length > 0) {
        fileName.textContent = this.files[0].name;
        
        // Validate file size (5MB)
        const fileSize = this.files[0].size / 1024 / 1024;
        if (fileSize > 5) {
            showError(nocFile.parentElement.parentElement, 'File size must be less than 5MB');
            this.value = '';
            fileName.textContent = 'No file chosen';
        } else {
            clearError(nocFile.parentElement.parentElement);
        }
    } else {
        fileName.textContent = 'No file chosen';
    }
});

// Validation functions
function validateField(field, errorContainer) {
    const value = field.value.trim();
    let isValid = true;
    
    clearError(errorContainer);
    
    // Check if required field is empty
    if (field.hasAttribute('required') || field.closest('.form-group').querySelector('label.required')) {
        if (!value) {
            showError(errorContainer, 'This field is required');
            isValid = false;
        }
    }
    
    // Specific validations
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showError(errorContainer, 'Please enter a valid email address');
            isValid = false;
        }
    }
    
    if (field.type === 'number' && value) {
        const num = parseInt(value);
        if (num < field.min || num > field.max) {
            showError(errorContainer, `Value must be between ${field.min} and ${field.max}`);
            isValid = false;
        }
    }
    
    return isValid;
}

function validateRadioGroup(groupName, errorContainer) {
    const radios = document.querySelectorAll(`input[name="${groupName}"]`);
    const checked = Array.from(radios).some(radio => radio.checked);
    clearError(errorContainer);
    
    if (!checked) {
        showError(errorContainer, 'Please select an option');
        return false;
    }
    return true;
}

function validateSelect(select, errorContainer) {
    clearError(errorContainer);
    if (!select.value) {
        showError(errorContainer, 'Please select an option');
        return false;
    }
    return true;
}

function validateFileUpload(fileInput, errorContainer) {
    clearError(errorContainer);
    const driveLink = document.getElementById('nocDriveLink').value.trim();
    
    if (!fileInput.files.length && !driveLink) {
        showError(errorContainer, 'Please upload a file or provide a Google Drive link');
        return false;
    }
    
    if (driveLink && !isValidURL(driveLink)) {
        showError(errorContainer.parentElement.parentElement.querySelector('.error-message'), 'Please enter a valid URL');
        return false;
    }
    
    return true;
}

function isValidURL(string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
}

function validateCollegeRegID(field, errorContainer) {
    const value = field.value.trim();
    clearError(errorContainer);
    
    if (!value) {
        showError(errorContainer, 'This field is required');
        return false;
    }
    
    // Alphanumeric validation
    const alphanumericRegex = /^[a-zA-Z0-9]+$/;
    if (!alphanumericRegex.test(value)) {
        showError(errorContainer, 'Registration ID must contain only letters and numbers');
        return false;
    }
    
    return true;
}

function showError(container, message) {
    const errorElement = container.querySelector('.error-message');
    if (errorElement) {
        errorElement.textContent = message;
        const input = container.querySelector('input, select');
        if (input) {
            input.style.borderColor = '#ef4444';
        }
    }
}

function clearError(container) {
    const errorElement = container.querySelector('.error-message');
    if (errorElement) {
        errorElement.textContent = '';
        const input = container.querySelector('input, select');
        if (input) {
            input.style.borderColor = '#d1d5db';
        }
    }
}

function clearTeamFields() {
    document.getElementById('teamLeader').value = '';
    document.getElementById('teamMembersCount').value = '';
    document.getElementById('member1Name').value = '';
    document.getElementById('member1RegID').value = '';
    document.getElementById('member2Name').value = '';
    document.getElementById('member2RegID').value = '';
}

// Form submission
form.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Clear all errors first
    document.querySelectorAll('.error-message').forEach(el => {
        el.textContent = '';
    });
    document.querySelectorAll('input, select').forEach(el => {
        el.style.borderColor = '#d1d5db';
    });
    
    // Validate all fields
    let isValid = true;
    
    // Basic Information
    const fullNameField = document.getElementById('fullName');
    if (!validateField(fullNameField, fullNameField.closest('.form-group'))) {
        isValid = false;
    }
    
    const genderContainer = document.querySelector('.radio-label').closest('.form-group');
    if (!validateRadioGroup('gender', genderContainer)) {
        isValid = false;
    }
    
    const emailField = document.getElementById('email');
    if (!validateField(emailField, emailField.closest('.form-group'))) {
        isValid = false;
    }
    
    const collegeField = document.getElementById('college');
    if (!validateSelect(collegeField, collegeField.closest('.form-group'))) {
        isValid = false;
    }
    
    if (document.getElementById('college').value === 'Other') {
        const otherCollegeField = document.getElementById('otherCollege');
        if (!validateField(otherCollegeField, otherCollegeField.closest('.form-group'))) {
            isValid = false;
        }
    }
    
    const yearField = document.getElementById('year');
    if (!validateSelect(yearField, yearField.closest('.form-group'))) {
        isValid = false;
    }
    
    // Poornima specific fields
    if (document.getElementById('college').value.includes('Poornima')) {
        if (!validateSelect(residenceSelect, residenceSelect.closest('.form-group'))) {
            isValid = false;
        }
        
        if (residenceSelect.value === 'Hostel') {
            const hostelNameField = document.getElementById('hostelName');
            if (!validateField(hostelNameField, hostelNameField.closest('.form-group'))) {
                isValid = false;
            }
        }
        
        const collegeRegIDField = document.getElementById('collegeRegID');
        if (!validateCollegeRegID(collegeRegIDField, collegeRegIDField.closest('.form-group'))) {
            isValid = false;
        }
    }
    
    // NOC upload
    const nocContainer = nocFile.closest('.form-group');
    if (!validateFileUpload(nocFile, nocContainer)) {
        isValid = false;
    }
    
    // Event selection
    if (!validateSelect(eventSelect, eventSelect.closest('.form-group'))) {
        isValid = false;
    }
    
    // Team fields
    if (eventSelect.value) {
        const teamLeaderField = document.getElementById('teamLeader');
        if (!validateField(teamLeaderField, teamLeaderField.closest('.form-group'))) {
            isValid = false;
        }
        
        const teamCountField = document.getElementById('teamMembersCount');
        if (!validateField(teamCountField, teamCountField.closest('.form-group'))) {
            isValid = false;
        }
    }
    
    if (!isValid) {
        alert('Please fill all required fields correctly before submitting.');
        return;
    }
    
    // Collect form data
    const formData = collectFormData();
    
    // Send data to backend
    try {
        const response = await fetch('/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
        
        if (response.ok) {
            showSuccessMessage();
            form.reset();
            fileName.textContent = 'No file chosen';
            otherCollegeGroup.style.display = 'none';
            poornimaSection.style.display = 'none';
            hostelNameGroup.style.display = 'none';
            teamFields.style.display = 'none';
            clearTeamFields();
        } else {
            alert('Error submitting form. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error submitting form. Please try again.');
    }
});

function collectFormData() {
    const data = {
        name: document.getElementById('fullName').value.trim(),
        gender: document.querySelector('input[name="gender"]:checked')?.value || '',
        email: document.getElementById('email').value.trim(),
        college: document.getElementById('college').value,
        otherCollege: document.getElementById('otherCollege').value.trim(),
        year: document.getElementById('year').value,
        residence: document.getElementById('residence').value,
        hostelName: document.getElementById('hostelName').value.trim(),
        collegeRegID: document.getElementById('collegeRegID').value.trim(),
        nocFileLink: document.getElementById('nocDriveLink').value.trim() || (nocFile.files[0] ? `File: ${nocFile.files[0].name}` : ''),
        event: document.getElementById('event').value,
        teamLeader: document.getElementById('teamLeader').value.trim(),
        teamMembersCount: document.getElementById('teamMembersCount').value,
        member1Name: document.getElementById('member1Name').value.trim(),
        member1RegID: document.getElementById('member1RegID').value.trim(),
        member2Name: document.getElementById('member2Name').value.trim(),
        member2RegID: document.getElementById('member2RegID').value.trim()
    };
    
    return data;
}

function showSuccessMessage() {
    const successMsg = document.getElementById('successMessage');
    form.style.display = 'none';
    successMsg.style.display = 'block';
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Auto-hide after 5 seconds or allow user to click to register again
    setTimeout(() => {
        successMsg.style.display = 'none';
        form.style.display = 'block';
    }, 5000);
}

// Real-time validation on blur
document.querySelectorAll('input, select').forEach(field => {
    if (field.type !== 'submit') {
        field.addEventListener('blur', function() {
            if (this.type === 'radio') {
                const container = document.querySelector(`input[name="${this.name}"]`).closest('.radio-group').parentElement;
                validateRadioGroup(this.name, container);
            } else {
                validateField(this, this.closest('.form-group'));
            }
        });
    }
});

