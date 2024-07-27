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
    
    if (labDetails.classList.contains('active')) {
        labDetails.classList.remove('active');
        expandBtn.textContent = 'Learn More';
    } else {
        labDetails.classList.add('active');
        expandBtn.textContent = 'Show Less';
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
    const labSelect = document.getElementById('lab
