// Mode toggle functionality
function toggleMode() {
    const body = document.body;
    body.classList.toggle('day-mode');
    body.classList.toggle('night-mode');
    
    // Save the current mode preference to localStorage
    const currentMode = body.classList.contains('night-mode') ? 'night' : 'day';
    localStorage.setItem('preferredMode', currentMode);
    
    // Update the mode toggle icon
    updateModeToggleIcon();
}

function updateModeToggleIcon() {
    const modeIcon = document.querySelector('.mode-icon');
    const isNightMode = document.body.classList.contains('night-mode');
    
    if (isNightMode) {
        modeIcon.innerHTML = `
            <path fill="currentColor" d="M12 3a9 9 0 109 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 01-4.4 2.26 5.403 5.403 0 01-3.14-9.8c-.44-.06-.9-.1-1.36-.1z" />
        `;
    } else {
        modeIcon.innerHTML = `
            <path fill="currentColor" d="M12 7a5 5 0 100 10 5 5 0 000-10zM2 12a10 10 0 1120 0 10 10 0 01-20 0z" />
        `;
    }
}

// Set initial mode based on user preference or time of day
function setInitialMode() {
    const preferredMode = localStorage.getItem('preferredMode');
    const currentHour = new Date().getHours();
    const isNightTime = currentHour < 6 || currentHour >= 18;
    
    if (preferredMode === 'night' || (preferredMode === null && isNightTime)) {
        document.body.classList.remove('day-mode');
        document.body.classList.add('night-mode');
    }
    
    updateModeToggleIcon();
}

// Modal functionality
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'block';
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'none';
}

// Close modal when clicking outside of it
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
}

// Partner carousel functionality
function initPartnerCarousel() {
    const partnerLogos = [
        { name: 'Partner 1', logo: 'partner1-logo.png' },
        { name: 'Partner 2', logo: 'partner2-logo.png' },
        { name: 'Partner 3', logo: 'partner3-logo.png' },
        { name: 'Partner 4', logo: 'partner4-logo.png' },
        { name: 'Partner 5', logo: 'partner5-logo.png' },
    ];

    const carousel = document.getElementById('partner-carousel');
    let currentIndex = 0;

    function updateCarousel() {
        carousel.innerHTML = '';
        for (let i = 0; i < 3; i++) {
            const index = (currentIndex + i) % partnerLogos.length;
            const partner = partnerLogos[index];
            const img = document.createElement('img');
            img.src = partner.logo;
            img.alt = partner.name;
            img.title = partner.name;
            carousel.appendChild(img);
        }
    }

    function rotateCarousel() {
        currentIndex = (currentIndex + 1) % partnerLogos.length;
        updateCarousel();
    }

    updateCarousel();
    setInterval(rotateCarousel, 3000); // Rotate every 3 seconds
}

// Form submission handling
function handleFormSubmission(event, formId) {
    event.preventDefault();
    const form = document.getElementById(formId);
    const formData = new FormData(form);
    
    // Here you would typically send the form data to your server
    // For this example, we'll just log it to the console
    console.log('Form submitted:', Object.fromEntries(formData));
    
    // Show a success message (you can replace this with a more sophisticated notification system)
    alert('Form submitted successfully!');
    
    // Close the modal
    const modalId = formId === 'custom-program-form' ? 'custom-program-modal' : 'incubator-modal';
    closeModal(modalId);
    
    // Reset the form
    form.reset();
}

// Initialize everything when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    setInitialMode();
    initPartnerCarousel();
    
    // Add event listeners for form submissions
    document.getElementById('custom-program-form').addEventListener('submit', (e) => handleFormSubmission(e, 'custom-program-form'));
    document.getElementById('incubator-form').addEventListener('submit', (e) => handleFormSubmission(e, 'incubator-form'));
});
