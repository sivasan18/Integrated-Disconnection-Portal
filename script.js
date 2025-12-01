// ===================================
// Provider Database
// ===================================
const providers = {
    mobile: [
        { name: 'Airtel', logo: 'A' },
        { name: 'Jio', logo: 'J' },
        { name: 'Vi (Vodafone Idea)', logo: 'V' },
        { name: 'BSNL', logo: 'B' },
        { name: 'MTNL', logo: 'M' }
    ],
    internet: [
        { name: 'Airtel Xstream Fiber', logo: 'A' },
        { name: 'Jio Fiber', logo: 'J' },
        { name: 'ACT Fibernet', logo: 'A' },
        { name: 'BSNL Broadband', logo: 'B' },
        { name: 'Hathway', logo: 'H' },
        { name: 'Tikona', logo: 'T' },
        { name: 'Excitel', logo: 'E' },
        { name: 'You Broadband', logo: 'Y' }
    ],
    dth: [
        { name: 'Tata Play', logo: 'T' },
        { name: 'Airtel Digital TV', logo: 'A' },
        { name: 'Sun Direct', logo: 'S' },
        { name: 'Dish TV', logo: 'D' },
        { name: 'd2h', logo: 'D' }
    ]
};

// ===================================
// Application State
// ===================================
const appState = {
    selectedService: null,
    selectedProvider: null,
    accountNumber: null,
    customerName: null,
    customerEmail: null,
    billCopy: null,
    connectionProof: null,
    aadhaarNumber: null,
    aadhaarCopy: null,
    hasAadhaarVerification: false
};

// ===================================
// DOM Elements
// ===================================
const sections = {
    service: document.getElementById('step-service'),
    provider: document.getElementById('step-provider'),
    details: document.getElementById('step-details'),
    documents: document.getElementById('step-documents'),
    confirmation: document.getElementById('step-confirmation')
};

const providerGrid = document.getElementById('provider-grid');
const detailsForm = document.getElementById('details-form');
const documentsForm = document.getElementById('documents-form');
const confirmationDetails = document.getElementById('confirmation-details');

// ===================================
// Navigation Functions
// ===================================
function showSection(sectionName) {
    // Hide all sections
    Object.values(sections).forEach(section => {
        section.classList.remove('active');
    });

    // Show selected section
    sections[sectionName].classList.add('active');

    // Smooth scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===================================
// Step 1: Service Selection
// ===================================
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('click', function () {
        const service = this.dataset.service;
        appState.selectedService = service;

        // Populate providers for selected service
        populateProviders(service);

        // Navigate to provider selection
        showSection('provider');
    });
});

// ===================================
// Step 2: Provider Selection
// ===================================
function populateProviders(service) {
    const serviceProviders = providers[service];

    providerGrid.innerHTML = serviceProviders.map(provider => `
        <button class="provider-card" data-provider="${provider.name}">
            <div class="provider-logo">${provider.logo}</div>
            <h4>${provider.name}</h4>
        </button>
    `).join('');

    // Add click listeners to provider cards
    document.querySelectorAll('.provider-card').forEach(card => {
        card.addEventListener('click', function () {
            appState.selectedProvider = this.dataset.provider;

            // Update form label based on service type
            updateFormLabel();

            // Navigate to details form
            showSection('details');
        });
    });
}

function updateFormLabel() {
    const accountLabel = document.getElementById('account-label');
    const accountInput = document.getElementById('account-number');

    if (appState.selectedService === 'mobile') {
        accountLabel.textContent = 'Mobile Number';
        accountInput.placeholder = 'Enter your 10-digit mobile number';
    } else if (appState.selectedService === 'internet') {
        accountLabel.textContent = 'Customer ID / Account Number';
        accountInput.placeholder = 'Enter your customer ID or account number';
    } else if (appState.selectedService === 'dth') {
        accountLabel.textContent = 'Subscriber ID / VC Number';
        accountInput.placeholder = 'Enter your subscriber ID or VC number';
    }
}

// Back to Service Selection
document.getElementById('back-to-service-btn').addEventListener('click', function () {
    showSection('service');
});

// ===================================
// Step 3: Details Form
// ===================================
detailsForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Get form values
    appState.accountNumber = document.getElementById('account-number').value;
    appState.customerName = document.getElementById('customer-name').value;
    appState.customerEmail = document.getElementById('customer-email').value;

    // Navigate to documents upload step
    showSection('documents');
});

// Back to Provider Selection
document.getElementById('back-to-provider-btn').addEventListener('click', function () {
    showSection('provider');
});

// ===================================
// Step 4: Document Upload & Verification
// ===================================

// File upload handlers
function setupFileUpload(inputId, labelId) {
    const input = document.getElementById(inputId);
    const label = document.getElementById(labelId);

    input.addEventListener('change', function () {
        if (this.files && this.files[0]) {
            const fileName = this.files[0].name;
            const fileSize = (this.files[0].size / 1024 / 1024).toFixed(2); // MB

            // Update label
            label.classList.add('has-file');
            const span = label.querySelector('span');
            span.textContent = `✓ ${fileName} (${fileSize} MB)`;

            // Store file reference
            appState[inputId.replace('-', '')] = this.files[0];
        }
    });
}

// Setup all file uploads
setupFileUpload('bill-copy', 'bill-copy-label');
setupFileUpload('connection-proof', 'connection-proof-label');
setupFileUpload('aadhaar-copy', 'aadhaar-copy-label');

// Aadhaar number input handler
const aadhaarInput = document.getElementById('aadhaar-number');
const aadhaarUploadGroup = document.getElementById('aadhaar-upload-group');

aadhaarInput.addEventListener('input', function () {
    const value = this.value.trim();

    // Show Aadhaar upload if number is entered
    if (value.length > 0) {
        aadhaarUploadGroup.style.display = 'block';
        // Make Aadhaar copy required if number is provided
        document.getElementById('aadhaar-copy').required = value.length === 12;
    } else {
        aadhaarUploadGroup.style.display = 'none';
        document.getElementById('aadhaar-copy').required = false;
    }
});

// Documents form submission
documentsForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Get Aadhaar details
    const aadhaarNumber = aadhaarInput.value.trim();
    appState.aadhaarNumber = aadhaarNumber;
    appState.hasAadhaarVerification = aadhaarNumber.length === 12;

    // Populate confirmation details
    displayConfirmation();

    // Navigate to confirmation
    showSection('confirmation');
});

// Back to Details
document.getElementById('back-to-details-btn').addEventListener('click', function () {
    showSection('details');
});

// ===================================
// Step 5: Confirmation
// ===================================
function displayConfirmation() {
    const serviceLabels = {
        mobile: 'Mobile',
        internet: 'Internet / Broadband',
        dth: 'DTH / TV'
    };

    const currentDate = new Date();
    const requestId = 'REQ' + Date.now().toString().slice(-8);

    confirmationDetails.innerHTML = `
        <div class="detail-row">
            <span class="detail-label">Request ID</span>
            <span class="detail-value">${requestId}</span>
        </div>
        <div class="detail-row">
            <span class="detail-label">Service Type</span>
            <span class="detail-value">${serviceLabels[appState.selectedService]}</span>
        </div>
        <div class="detail-row">
            <span class="detail-label">Provider</span>
            <span class="detail-value">${appState.selectedProvider}</span>
        </div>
        <div class="detail-row">
            <span class="detail-label">Account Number</span>
            <span class="detail-value">${appState.accountNumber}</span>
        </div>
        <div class="detail-row">
            <span class="detail-label">Name</span>
            <span class="detail-value">${appState.customerName}</span>
        </div>
        <div class="detail-row">
            <span class="detail-label">Email</span>
            <span class="detail-value">${appState.customerEmail}</span>
        </div>
        <div class="detail-row">
            <span class="detail-label">Aadhaar Verification</span>
            <span class="detail-value">${appState.hasAadhaarVerification ? '✓ Verified' : '✗ Not Provided'}</span>
        </div>
        <div class="detail-row">
            <span class="detail-label">Submitted On</span>
            <span class="detail-value">${currentDate.toLocaleString('en-IN', {
        dateStyle: 'medium',
        timeStyle: 'short'
    })}</span>
        </div>
    `;

    // Update termination timeline based on Aadhaar verification
    const terminationTimeline = document.getElementById('termination-timeline');
    if (appState.hasAadhaarVerification) {
        terminationTimeline.innerHTML = `
            <strong>Termination Timeline</strong>
            <p>✓ Aadhaar verification successful! Your connection will be terminated within <strong>24 hours</strong>.</p>
        `;
    } else {
        terminationTimeline.innerHTML = `
            <strong>Termination Timeline</strong>
            <p>Without Aadhaar verification, your request will be processed within <strong>up to 7 working days</strong>.</p>
        `;
    }
}

// New Request Button
document.getElementById('new-request-btn').addEventListener('click', function () {
    // Reset forms
    detailsForm.reset();
    documentsForm.reset();

    // Reset file upload labels
    document.querySelectorAll('.file-upload-label').forEach(label => {
        label.classList.remove('has-file');
        const span = label.querySelector('span');
        span.textContent = 'Choose file or drag here';
    });

    // Reset state
    appState.selectedService = null;
    appState.selectedProvider = null;
    appState.accountNumber = null;
    appState.customerName = null;
    appState.customerEmail = null;
    appState.billCopy = null;
    appState.connectionProof = null;
    appState.aadhaarNumber = null;
    appState.aadhaarCopy = null;
    appState.hasAadhaarVerification = false;

    // Hide Aadhaar upload group
    document.getElementById('aadhaar-upload-group').style.display = 'none';

    // Navigate back to service selection
    showSection('service');
});

// ===================================
// Form Validation Enhancement
// ===================================
const formInputs = document.querySelectorAll('#details-form input');

formInputs.forEach(input => {
    input.addEventListener('invalid', function (e) {
        e.preventDefault();
        this.classList.add('invalid');
    });

    input.addEventListener('input', function () {
        this.classList.remove('invalid');
    });
});

// ===================================
// Smooth Scroll Enhancement
// ===================================
document.addEventListener('DOMContentLoaded', function () {
    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';

    // Initial animation for hero
    const hero = document.getElementById('hero-section');
    setTimeout(() => {
        hero.style.opacity = '1';
    }, 100);
});

// ===================================
// Keyboard Navigation
// ===================================
document.addEventListener('keydown', function (e) {
    // Allow ESC to go back in certain sections
    if (e.key === 'Escape') {
        const currentSection = document.querySelector('.step-section.active');

        if (currentSection.id === 'step-provider') {
            showSection('service');
        } else if (currentSection.id === 'step-details') {
            showSection('provider');
        } else if (currentSection.id === 'step-documents') {
            showSection('details');
        }
    }
});

// ===================================
// Analytics Tracking (Demo)
// ===================================
function trackEvent(eventName, eventData) {
    console.log('Event:', eventName, eventData);
    // In production, integrate with analytics service
}

// Track service selection
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('click', function () {
        trackEvent('service_selected', { service: this.dataset.service });
    });
});
