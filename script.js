// Function to validate input fields and highlight empty ones
function validateFieldsAndHighlight() {
    const inputs = document.querySelectorAll('input');
    let isValid = true;

    inputs.forEach((input) => {
        if (input.value.trim() === '') {
            input.style.border = '2px solid red'; // Highlight the empty fields in red
            isValid = false;
        } else {
            input.style.border = ''; // Remove red border if field is filled
        }
    });

    return isValid;
}

// Function to save all findings
function saveAllFindings() {
    if (!validateFieldsAndHighlight()) {
        alert('Please fill all required fields before saving findings.');
        return;
    }

    const findings = {
        task1: {
            phone: document.getElementById('task1-phone').value,
            summary: document.getElementById('task1-summary').value,
            search: document.getElementById('task1-search').value,
        },
        task2: {
            carrier: document.getElementById('task2-carrier').value,
            location: document.getElementById('task2-location').value,
        },
        task3: {
            platform: document.getElementById('task3-platform').value,
            profile: document.getElementById('task3-profile').value,
        },
        task4: {
            image: document.getElementById('task4-image').value,
            date: document.getElementById('task4-date').value,
            camera: document.getElementById('task4-camera').value,
        },
        task5: {
            website: document.getElementById('task5-website').value,
            scam: document.getElementById('task5-scam').value,
        },
    };

    console.log('All Findings:', findings);
    alert('All findings have been saved!');
}

// Function to generate the full report
function generateReport() {
    if (!validateFieldsAndHighlight()) {
        alert('Please fill all required fields before generating the report.');
        return;
    }

    const reportContainer = document.getElementById('full-report');
    reportContainer.innerHTML = `
        <h3>Full Report</h3>
        <p><strong>Task 1: Search Engine Query</strong></p>
        <p>Phone Number: ${document.getElementById('task1-phone').value}</p>
        <p>Search Engine Used: ${document.getElementById('task1-search').value}</p>
        <p>Result Summary: ${document.getElementById('task1-summary').value}</p>
        
        <p><strong>Task 2: Reverse Phone Lookup</strong></p>
        <p>Carrier: ${document.getElementById('task2-carrier').value}</p>
        <p>Location: ${document.getElementById('task2-location').value}</p>
        
        <p><strong>Task 3: Social Media Search</strong></p>
        <p>Social Media Platform: ${document.getElementById('task3-platform').value}</p>
        <p>Associated Profile: ${document.getElementById('task3-profile').value}</p>
        
        <p><strong>Task 4: Metadata Analysis</strong></p>
        <p>Image Associated: ${document.getElementById('task4-image').value}</p>
        <p>Date Taken: ${document.getElementById('task4-date').value}</p>
        <p>Camera Model: ${document.getElementById('task4-camera').value}</p>
        
        <p><strong>Task 5: Spam or Scam Report</strong></p>
        <p>Report Website: ${document.getElementById('task5-website').value}</p>
        <p>Scam Reported: ${document.getElementById('task5-scam').value}</p>
    `;

    // Show the flag popup
    showFlagPopup();
}

// Securely store the encoded flag (Base64 encoded)
const flag = atob("VEhNe09TSU5UX2lzX0ZVTn0="); // Decoded: THM{OSINT_is_FUN}

// Function to show the flag popup
function showFlagPopup() {
    const flagPopup = document.getElementById("flag-popup");
    const flagText = document.getElementById("flag-text");
    flagText.textContent = flag; // Inject the flag dynamically
    flagPopup.classList.add("show");
}

// Function to close the flag popup
function closePopup() {
    const flagPopup = document.getElementById("flag-popup");
    flagPopup.classList.remove("show");
}

// Add event listeners to input fields to reset border color on input
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', () => {
        if (input.value.trim() !== '') {
            input.style.border = ''; // Reset border color when user fills the field
        }
    });
});
