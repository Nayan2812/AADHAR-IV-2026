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
const submitWrapper = document.querySelector('.submit-wrapper');

// 🔹 Create Payment Section dynamically
const paymentSection = document.createElement('section');
paymentSection.classList.add('form-section');
paymentSection.id = 'paymentSection';
paymentSection.style.display = 'none';
paymentSection.innerHTML = `
    <h2 class="section-heading">Registration Fee Payment</h2>
    <p>Please complete your registration payment before submitting the form.</p>
    <div class="form-group">
        <label for="transactionID" class="required">Transaction ID</label>
        <input type="text" id="transactionID" name="transactionID" placeholder="Enter transaction ID">
        <span class="error-message"></span>
    </div>
    <div class="form-group">
        <label for="paymentScreenshot" class="required">Upload Payment Screenshot</label>
        <input type="file" id="paymentScreenshot" name="paymentScreenshot" accept=".jpg,.jpeg,.png,.pdf">
        <span class="error-message"></span>
        <small class="file-hint">Allowed: JPG, PNG, PDF | Max Size: 5 MB</small>
    </div>
`;
form.insertBefore(paymentSection, submitWrapper);

// Show/hide dynamic fields based on selections
collegeSelect.addEventListener('change', function() {
    const value = this.value;

    // 🔸 Poornima colleges
    if (value.includes('Poornima')) {
        poornimaSection.style.display = 'block';
        otherCollegeGroup.style.display = 'none';
        paymentSection.style.display = 'none';
    }
    // 🔸 Other college
    else if (value === 'Other') {
        poornimaSection.style.display = 'none';
        otherCollegeGroup.style.display = 'block';
        paymentSection.style.display = 'block';
    }
    // 🔸 None
    else {
        poornimaSection.style.display = 'none';
        otherCollegeGroup.style.display = 'none';
        paymentSection.style.display = 'none';
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

// 🔹 Event participant configurations
const eventParticipants = {
    'RC Car': { min: 2, max: 4 },       // e.g. driver + support crew
    'Robo Soccer': { min: 3, max: 5 },  // team-based
    'Robo War': { min: 3, max: 5 },
    'MOM': { min: 1, max: 1 },          // solo event
    'Circuitary': { min: 1, max: 2 },   // small teams
    'Mini War': { min: 3, max: 5 },
    'Tank War': { min: 3, max: 5 },
    'Spud Gun': { min: 2, max: 4 }
};

// 🔹 When an event is selected
eventSelect.addEventListener('change', function() {
    const selectedEvent = this.value;
    const config = eventParticipants[selectedEvent];

    // Hide section if no event selected
    if (!selectedEvent) {
        teamFields.style.display = 'none';
        clearTeamFields();
        return;
    }

    // Clear previous team fields
    clearTeamFields();

    // Generate fields dynamically
    const teamContainer = document.getElementById('teamContainer');
    const { min, max } = config || { min: 1, max: 1 };

    for (let i = 1; i <= max; i++) {
        const div = document.createElement('div');
        div.classList.add('form-group');

        const label = document.createElement('label');
        label.textContent = `Team Member ${i}${i <= min ? ' *' : ' (optional)'}`;

        const input = document.createElement('input');
        input.type = 'text';
        input.name = `member${i}`;
        input.placeholder = i <= min
            ? `Enter member ${i} name`
            : `Enter member ${i} name (optional)`;
        input.required = i <= min;

        div.appendChild(label);
        div.appendChild(input);
        teamContainer.appendChild(div);
    }

    teamFields.style.display = 'block';
});

// 🔹 Helper to clear existing team fields
function clearTeamFields() {
    const teamContainer = document.getElementById('teamContainer');
    if (teamContainer) teamContainer.innerHTML = '';
}


eventSelect.addEventListener('change', function() {
    const selectedEvent = this.value;
    const config = eventParticipants[selectedEvent];

    // Hide section if no event selected
    if (!selectedEvent) {
        teamFields.style.display = 'none';
        clearTeamFields();
        return;
    }

    // Clear previous team fields
    clearTeamFields();

    // Generate team fields dynamically
    const teamContainer = document.getElementById('teamContainer');
    const { min, max } = config || { min: 1, max: 1 };

    for (let i = 1; i <= max; i++) {
        const div = document.createElement('div');
        div.classList.add('form-group');

        const label = document.createElement('label');
        label.textContent = `Team Member ${i}${i <= min ? ' *' : ' (optional)'}`;

        const input = document.createElement('input');
        input.type = 'text';
        input.name = `member${i}`;
        input.placeholder = i <= min
            ? `Enter member ${i} name`
            : `Enter member ${i} name (optional)`;
        input.required = i <= min;

        div.appendChild(label);
        div.appendChild(input);
        teamContainer.appendChild(div);
    }

    teamFields.style.display = 'block';
});

// 🔹 Helper to clear existing team fields
function clearTeamFields() {
    const teamContainer = document.getElementById('teamContainer');
    if (teamContainer) teamContainer.innerHTML = '';
}


// 🔹 New: validate Payment Screenshot and Transaction ID if visible
function validatePaymentSection() {
    if (paymentSection.style.display === 'block') {
        const transactionField = document.getElementById('transactionID');
        const screenshotField = document.getElementById('paymentScreenshot');

        let valid = true;

        if (!validateField(transactionField, transactionField.closest('.form-group'))) valid = false;

        if (!screenshotField.files.length) {
            showError(screenshotField.closest('.form-group'), 'Please upload a payment screenshot');
            valid = false;
        } else {
            const fileSize = screenshotField.files[0].size / 1024 / 1024;
            if (fileSize > 5) {
                showError(screenshotField.closest('.form-group'), 'File size must be less than 5MB');
                valid = false;
            }
        }

        return valid;
    }
    return true;
}

// 🔹 Validation + submit logic stays same, just integrate payment validation
form.addEventListener('submit', async function(e) {
    e.preventDefault();

    // (Existing validation logic…)
    // You can keep your full validation flow as it is.

    let isValid = true;

    // After all existing validations:
    if (paymentSection.style.display === 'block') {
        if (!validatePaymentSection()) isValid = false;
    }

    if (!isValid) {
        alert('Please fill all required fields correctly before submitting.');
        return;
    }

    // Collect all form data
    const formData = collectFormData();
    if (paymentSection.style.display === 'block') {
        formData.transactionID = document.getElementById('transactionID').value.trim();
        formData.paymentScreenshot = document.getElementById('paymentScreenshot').files[0]?.name || '';
    }

    try {
        const response = await fetch('/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
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
            paymentSection.style.display = 'none';
            clearTeamFields();
        } else {
            alert('Error submitting form. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error submitting form. Please try again.');
    }
});
