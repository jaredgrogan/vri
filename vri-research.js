const labs = [
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
    labs.forEach(lab => {
        const labCard = document.createElement('div');
        labCard.className = 'lab-card';
        labCard.innerHTML = `
            <i class="fas ${lab.icon} fa-3x"></i>
            <h3>${lab.name}</h3>
            <p>${lab.focus}</p>
        `;
        labCard.addEventListener('click', () => showLabDetails(lab));
        labsContainer.appendChild(labCard);
    });
}

function showLabDetails(lab) {
    const labContent = document.getElementById('lab-content');
    labContent.innerHTML = `
        <h3>${lab.name}</h3>
        <p><strong>Focus:</strong> ${lab.focus}</p>
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
    `;
    document.getElementById('lab-details').scrollIntoView({ behavior: 'smooth' });
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
