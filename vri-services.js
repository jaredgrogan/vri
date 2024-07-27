function toggleServiceDetails(serviceId) {
    const detailsElement = document.getElementById(serviceId);
    detailsElement.classList.toggle('active');
}

function showContactModal() {
    document.getElementById('contact-modal').style.display = 'block';
}

function closeContactModal() {
    document.getElementById('contact-modal').style.display = 'none';
}

function submitContactForm() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const company = document.getElementById('company').value;
    const serviceInterest = document.getElementById('service-interest').value;
    const message = document.getElementById('message').value;

    // Here you would typically send this data to a server
    console.log('Contact Form Submission:', { name, email, company, serviceInterest, message });

    alert('Thank you for your interest. We will be in touch shortly.');
    closeContactModal();
    return false; // Prevent form submission
}

// Close modal when clicking outside of it
window.onclick = function(event) {
    if (event.target.id === 'contact-modal') {
        closeContactModal();
    }
}

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
