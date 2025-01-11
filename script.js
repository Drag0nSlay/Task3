function saveAllFindings() {
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
      }
    };
  
    console.log('All Findings:', findings);
  
    // You can save the findings to localStorage or send them to the server here.
    alert('All findings have been saved!');
  }
  
  function generateReport() {
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
  
    // Show the flag popup in the bottom-right corner
    const flagPopup = document.getElementById('flag-popup');
    flagPopup.classList.remove('hidden');  // Display the flag
    flagPopup.classList.add('show');  // Ensure it's visible
  
    // Ensure the flag stays visible until the user leaves the page
    window.onbeforeunload = function () {
      flagPopup.classList.add('hidden');  // Hide the flag when the user navigates away
    };
  }  