function expandTech(techId) {
    const techDetails = document.getElementById(techId);const labs = [
    {
        name: "Smart Infrastructure Lab",
        focus: "Smart Cities and Digital Infrastructure",
        icon: "fa-city",
        description: "Developing AI and blockchain solutions for urban environments and digital infrastructure."
    },
    {
        name: "Advanced Manufacturing Lab",
        focus: "Digital Manufacturing and Automated Processes",
        icon: "fa-industry",
        description: "Integrating AI and IoT for next-generation manufacturing processes and supply chain management."
    },
    {
        name: "Decentralized Finance Lab",
        focus: "Financial Instruments and Decentralized Finance",
        icon: "fa-coins",
        description: "Creating innovative DeFi platforms and blockchain-based financial solutions."
    },
    {
        name: "Contextual Advertising Lab",
        focus: "Personalized and Transparent Advertising",
        icon: "fa-ad",
        description: "Developing AI-driven, privacy-focused advertising technologies and blockchain ad verification systems."
    },
    {
        name: "Media & Entertainment Lab",
        focus: "Content Creation and Distribution",
        icon: "fa-film",
        description: "Exploring AI in content creation and blockchain for digital rights management."
    },
    {
        name: "Supply Chain Transparency Lab",
        focus: "Real-time Supply Chain Tracking and Automation",
        icon: "fa-truck",
        description: "Building blockchain and IoT solutions for transparent and efficient supply chain management."
    },
    {
        name: "RegTech & Compliance Lab",
        focus: "Regulatory Technologies and Compliance Solutions",
        icon: "fa-balance-scale",
        description: "Developing AI and blockchain-based tools for regulatory compliance and reporting."
    }
];

function populateLabsGrid() {
    const labsContainer = document.querySelector('.labs-container');
    labs.forEach((lab, index) => {
        const labCard = document.createElement('div');
        labCard.className = 'lab-card';
        labCard.innerHTML = `
            <i class="fas ${lab.icon} fa-3x"></i>
            <h3>${lab.name}</h3>
            <p>${lab.focus}</p>
            <div class="lab-details" id="lab-details-${index}">
                <p>${lab.description}</p>
                <h4>Key Problem Statements:</h4>
                <ul>
                    <li>Integration of AI and blockchain technologies in ${lab.focus.toLowerCase()}</li>
                    <li>Scalability and security challenges in the ${lab.focus.toLowerCase()} sector</li>
                    <li>Industry-specific optimization and efficiency improvements</li>
                </ul>
                <h4>Commercialization Potential:</h4>
                <ul>
                    <li>AI-powered analytics and optimization tools for ${lab.focus.toLowerCase()}</li>
                    <li>Blockchain-based transparency and security solutions</li>
                    <li>Decentralized platforms for industry-specific applications</li>
                </ul>
            </div>
            <button class="cta-button expand-btn" onclick="toggleLabDetails(${index})">Learn More</button>
        `;
        labsContainer.appendChild(labCard);
    });
}

function toggleLabDetails(index) {
    const labDetails = document.getElementById(`lab-details-${index}`);
    const expandBtn = labDetails.nextElementSibling;
    
    if (labDetails.style.display === 'none' || labDetails.style.display === '') {
        labDetails.style.display = 'block';
        expandBtn.textContent = 'Show Less';
    } else {
        labDetails.style.display = 'none';
        expandBtn.textContent = 'Learn More';
    }
}

function showContactModal() {
    document.getElementById('contact-modal').style.display = 'block';
    populateLabOptions();
}

function closeContactModal() {
    document.getElementById('contact-modal').style.display = 'none';
}

function populateLabOptions() {
    const labSelect = document.getElementById('lab-interest');
    labSelect.innerHTML = '<option value="">Select Lab of Interest</option>';
    labs.forEach(lab => {
        const option = document.createElement('option');
        option.value = lab.name;
        option.textContent = lab.name;
        labSelect.appendChild(option);
    });
}

function submitPartnerForm() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const company = document.getElementById('company').value;
    const labInterest = document.getElementById('lab-interest').value;
    const message = document.getElementById('message').value;

    // Here you would typically send this data to a server
    console.log('Partner Form Submission:', { name, email, company, labInterest, message });

    alert('Thank you for your interest in partnering with VRI. We will be in touch shortly.');
    closeContactModal();
    return false; // Prevent form submission
}

function toggleMode() {
    const body = document.body;
    const modeIcon = document.querySelector('.mode-icon');
    
    body.classList.toggle('night-mode');
    
    if (body.classList.contains('night-mode')) {
        modeIcon.innerHTML = `
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        `;
    } else {
        modeIcon.innerHTML = `
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        `;
    }
}

// Close modal when clicking outside of it
window.onclick = function(event) {
    const modal = document.getElementById('contact-modal');
    if (event.target === modal) {
        closeContactModal();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    populateLabsGrid();
    toggleMode(); // Set initial mode icon
});
    techDetails.style.display = techDetails.style.display === 'none' ? 'block' : 'none';
}

function animateStats() {
    const stats = [
        { id: 'startups-launched', end: 50, duration: 2000 },
        { id: 'funds-raised', end: 100, duration: 2500, prefix: '$', suffix: 'M+' },
        { id: 'government-partners', end: 10, duration: 1500, suffix: '+' }
    ];
    
    stats.forEach(stat => {
        const element = document.getElementById(stat.id);
        let start = 0;
        const increment = stat.end / (stat.duration / 16);
        
        const timer = setInterval(() => {
            start += increment;
            if (start >= stat.end) {
                clearInterval(timer);
                start = stat.end;
            }
            element.textContent = `${stat.prefix || ''}${Math.floor(start)}${stat.suffix || ''}`;
        }, 16);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    animateStats();
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
