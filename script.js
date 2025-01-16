// Function to fetch and validate data from external JSON
async function fetchValidationData() {
    try {
      const response = await fetch('http://localhost:3000'); // You can also use localStorage for this
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Failed to load validation data", error);
    }
  }
  
  // Function to validate input fields, detect suspicious input, and highlight empty or suspicious fields
  async function validateFieldsAndHighlight() {
    const inputs = document.querySelectorAll('input');
    let isValid = true;
  
    // Fetch validation data
    const validationData = await fetchValidationData();
  
    // Collect input data
    const inputData = {};
    inputs.forEach(input => {
      const value = input.value.trim();
      const id = input.id;
      const fieldName = id.split('-')[1];
      inputData[fieldName] = value;
    });
  
    // Check for empty fields first
    inputs.forEach((input) => {
      const value = input.value.trim();
      const id = input.id;
      const fieldName = id.split('-')[1];
  
      // Check for empty fields and highlight them in red
      if (value === '') {
        input.style.border = '2px solid red'; // Highlight the empty fields in red
        isValid = false;
        removeWarning(input); // Remove any previous warning
      } else {
        input.style.border = ''; // Remove red border if field is filled
      }
  
      // Check for suspicious input only if the field is filled
      if (value !== '' && validationData[fieldName] && value !== validationData[fieldName]) {
        isValid = false;
        highlightSuspiciousField(input);
      } else {
        removeWarning(input); // Remove warning if input is valid
      }
    });
  
    return isValid;
  }
  
  // Function to highlight suspicious fields
  function highlightSuspiciousField(field) {
    field.style.border = '2px solid orange';
    displayWarning(field, 'Suspicious input detected!'); // Show warning message below the field
  }
  
  // Function to display warning below the field
  function displayWarning(input, message) {
    let warningMessage = input.nextElementSibling;
    // Check if the next sibling is a warning message, otherwise create a new one
    if (!warningMessage || !warningMessage.classList.contains('warning')) {
      warningMessage = document.createElement('div');
      warningMessage.classList.add('warning');
      warningMessage.style.color = 'orange';
      warningMessage.style.fontSize = '0.9rem';
      input.parentNode.insertBefore(warningMessage, input.nextSibling); // Insert directly after the input field
    }
    warningMessage.textContent = message; // Set the warning text
  }
  
  // Function to remove warning if the field becomes valid
  function removeWarning(input) {
    let warningMessage = input.nextElementSibling;
    if (warningMessage && warningMessage.classList.contains('warning')) {
      warningMessage.remove();
    }
  }
  
  // Function to save all findings
  async function saveAllFindings() {
    const isValid = await validateFieldsAndHighlight();
    if (!isValid) {
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
  async function generateReport() {
    const isValid = await validateFieldsAndHighlight();
    if (!isValid) {
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
  
  const flag = atob("VEhNe09TSU5UX2lzX0ZVTn0=");
  
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
  
  // Add event listeners to input fields to reset border color and remove warning on valid input
  document.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', () => {
      const value = input.value.trim();
      if (value !== '') {
        input.style.border = ''; // Reset border color when user fills the field
        removeWarning(input); // Remove warning if input is now valid
      } else {
        input.style.border = '2px solid red'; // Set red border for empty fields
      }
    });
  });
