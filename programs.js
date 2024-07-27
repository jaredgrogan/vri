document.addEventListener('DOMContentLoaded', function() {
    // Partner carousel
    const partners = [
        { name: 'Tech Corp', logo: 'tech-corp-logo.png' },
        { name: 'InnovateLab', logo: 'innovate-lab-logo.png' },
        { name: 'FutureAI', logo: 'future-ai-logo.png' },
        { name: 'BlockChain Solutions', logo: 'blockchain-solutions-logo.png' },
        { name: 'Data Dynamics', logo: 'data-dynamics-logo.png' }
    ];

    const carousel = document.getElementById('partner-carousel');
    partners.forEach(partner => {
        const img = document.createElement('img');
        img.src = partner.logo;
        img.alt = partner.name;
        img.className = 'partner-logo';
        carousel.appendChild(img);
    });

    // Form submissions
    document.getElementById('custom-program-form').addEventListener('submit', function(e) {
        e.preventDefault();
        // Here you would typically send the form data to a server
        alert('Custom program request submitted successfully!');
        closeModal('custom-program-modal');
    });

    document.getElementById('incubator-form').addEventListener('submit', function(e) {
        e.preventDefault();
        // Here you would typically send the form data to a server
        alert('Incubator application submitted successfully!');
        closeModal('incubator-modal');
    });
});

function showModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Close modal when clicking outside of it
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
}
