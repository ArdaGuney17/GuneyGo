// Global function for custom messages (accessible by any script)
function showCustomMessage(message, type = 'success') {
  const customUploadMessage = document.getElementById('customUploadMessage');
  if (!customUploadMessage) {
    // Fallback to alert if the custom message element isn't found
    console.error('Custom message element #customUploadMessage not found. Using alert.');
    alert(message);
    return;
  }

  customUploadMessage.textContent = message;
  customUploadMessage.style.backgroundColor = type === 'success' ? '#4CAF50' : '#f44336';
  customUploadMessage.style.display = 'block';

  // Trigger fade-in effect after a slight delay
  setTimeout(() => {
    customUploadMessage.style.opacity = 1;
  }, 10);

  // Automatically hide the message after 5 seconds
  setTimeout(() => {
    customUploadMessage.style.opacity = 0;
    setTimeout(() => {
      customUploadMessage.style.display = 'none';
    }, 300); // Match transition duration
  }, 5000); // 5000ms = 5 seconds
}


// --- All Navigation and Dropdown JavaScript ---
document.addEventListener('DOMContentLoaded', function() {
  const mobileBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  const menuIcon = mobileBtn.querySelector('i');

  // Dropdown elements - check if they exist before querying
  const dropdownToggle = document.querySelector('.dropdown-toggle');
  const dropdownMenu = document.querySelector('.dropdown-menu');
  const dropdownArrow = document.querySelector('.dropdown-arrow');


  // 1. Mobile Menu Toggle
  if (mobileBtn && navLinks && menuIcon) { // Ensure elements exist
    mobileBtn.addEventListener('click', function() {
      navLinks.classList.toggle('active');

      if (navLinks.classList.contains('active')) {
        menuIcon.classList.remove('fa-bars');
        menuIcon.classList.add('fa-times');
      } else {
        menuIcon.classList.remove('fa-times');
        menuIcon.classList.add('fa-bars');
        // Hide dropdown if mobile menu closes (when toggling inactive)
        if (dropdownMenu) {
          dropdownMenu.classList.remove('active');
          dropdownArrow.classList.remove('fa-chevron-up');
          dropdownArrow.classList.add('fa-chevron-down');
        }
      }
    });
  }


  // 2. Close menu when clicking on nav links (excluding dropdown toggle)
  document.querySelectorAll('.nav-links a:not(.dropdown-toggle)').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      menuIcon.classList.remove('fa-times');
      menuIcon.classList.add('fa-bars');
      // Hide dropdown when any regular nav item is clicked
      if (dropdownMenu) {
        dropdownMenu.classList.remove('active');
        dropdownArrow.classList.remove('fa-chevron-up');
        dropdownArrow.classList.add('fa-chevron-down');
      }
    });
  });

  // 3. Handle Dropdown Toggle Click
  if (dropdownToggle) { // Only add listener if dropdownToggle exists
    dropdownToggle.addEventListener('click', function(event) {
      event.preventDefault(); // Prevent default link behavior
      // Only toggle dropdown on desktop or when mobile menu is active
      if (window.innerWidth > 768 || navLinks.classList.contains('active')) {
        dropdownMenu.classList.toggle('active');
        dropdownArrow.classList.toggle('fa-chevron-down');
        dropdownArrow.classList.toggle('fa-chevron-up');
      }
    });
  }


  // 4. Auto-close mobile menu and dropdown when resizing to desktop
  window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
      navLinks.classList.remove('active');
      menuIcon.classList.remove('fa-times');
      menuIcon.classList.add('fa-bars');
      // Ensure dropdown is hidden when returning to desktop view
      if (dropdownMenu) {
        dropdownMenu.classList.remove('active');
        dropdownArrow.classList.remove('fa-chevron-up');
        dropdownArrow.classList.add('fa-chevron-down');
      }
    }
  });

  // 5. Close dropdown if clicked outside (only if dropdown elements exist)
  if (dropdownToggle && dropdownMenu) { // Ensure both exist before adding global listener
    document.addEventListener('click', function(event) {
      // Check if the click was outside both the toggle and the menu
      if (!dropdownToggle.contains(event.target) && !dropdownMenu.contains(event.target)) {
        dropdownMenu.classList.remove('active');
        dropdownArrow.classList.remove('fa-chevron-up');
        dropdownArrow.classList.add('fa-chevron-down');
      }
    });
  }

  // --- Document Upload Form JavaScript ---
  const uploadForm = document.getElementById('uploadForm');
  if (uploadForm) { // Ensure the form exists before adding listener
    uploadForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      const fileInput = document.getElementById('fileInput');
      const file = fileInput.files[0];

      if (!file) {
        showCustomMessage('Please select a file to upload.', 'error');
        return;
      }

      const uploadButton = this.querySelector('.submit-btn');
      if (uploadButton) {
        uploadButton.disabled = true;
        uploadButton.innerHTML = '<span>Uploading...</span><i class="fas fa-spinner fa-spin"></i>'; // Loading spinner
      }

      const reader = new FileReader();
      reader.onload = async function(event) {
        const base64 = event.target.result.split(',')[1];

        try {
          // Your Google Apps Script URL
          const response = await fetch('https://script.google.com/macros/s/AKfycbyLCPA1JylIdUnpX_2x-ai6v4_dk4G1tkSz3LijoXmyX88gd2qZn92ek9crfGVj14LN/exec', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
              file: base64,
              filename: file.name,
              type: file.type
            })
          });

          const result = await response.json();
          if (result.status === 'success') {
            showCustomMessage('File uploaded successfully!', 'success');
            console.log('File URL:', result.url);
            document.getElementById('uploadForm').reset();
          } else {
            showCustomMessage('Upload failed: ' + (result.message || 'An unknown error occurred.'), 'error');
          }
        } catch (error) {
          console.error('Fetch error:', error);
          showCustomMessage('Could not connect to the upload service. Please try again.', 'error');
        } finally {
          if (uploadButton) {
            uploadButton.disabled = false;
            uploadButton.innerHTML = '<span>Upload Files</span><i class="fas fa-upload"></i>'; // Reset button
          }
        }
      };
      reader.readAsDataURL(file);
    });
  }
});
