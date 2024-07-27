const labs = [
    {
        name: "Smart Infrastructure Lab",
        focus: "Smart Cities and Digital Infrastructure",
        icon: "fa-city"
    },
    {
        name: "Advanced Manufacturing Lab",
        focus: "Digital Manufacturing and Automated Processes",
        icon: "fa-industry"
    },
    {
        name: "Decentralized Finance Lab",
        focus: "Financial Instruments and Decentralized Finance",
        icon: "fa-coins"
    },
    {
        name: "Contextual Advertising Lab",
        focus: "Personalized and Transparent Advertising",
        icon: "fa-ad"
    },
    {
        name: "Media & Entertainment Lab",
        focus: "Content Creation and Distribution",
        icon: "fa-film"
    },
    {
        name: "Supply Chain Transparency Lab",
        focus: "Real-time Supply Chain Tracking and Automation",
        icon: "fa-truck"
    },
    {
        name: "RegTech & Compliance Lab",
        focus: "Regulatory Technologies and Compliance Solutions",
        icon: "fa-balance-scale"
    }
];

function populateLabsGrid() {
    const labsGrid = document.getElementById('labs-grid');
    labs.forEach(lab => {
        const labCard = document.createElement('div');
        labCard.className = 'lab-card';
        labCard.innerHTML = `
            <i class="fas ${lab.icon} fa-2x"></i>
            <h3>${lab.name}</h3>
            <p>${lab.focus}</p>
        `;
        labCard.addEventListener('click', () => showLabDetails(lab));
        labsGrid.appendChild(labCard);
    });
}

function showLabDetails(lab) {
    const labContent = document.getElementById('lab-content');
    labContent.innerHTML = `
        <h3>${lab.name}</h3>
        <p><strong>Focus:</strong> ${lab.focus}</p>
        <p><strong>Key Problem Statements:</strong></p>
        <ul>
            <li>Integration of AI and blockchain technologies</li>
            <li>Scalability and security challenges</li>
            <li>Industry-specific optimization and efficiency</li>
        </ul>
        <p><strong>Commercialization Potential:</strong></p>
        <ul>
            <li>AI-powered analytics and optimization tools</li>
            <li>Blockchain-based transparency and security solutions</li>
            <li>Decentralized platforms for industry-specific applications</li>
        </ul>
    `;
    document.getElementById('lab-details').scrollIntoView({ behavior: 'smooth' });
}

document.addEventListener('DOMContentLoaded', populateLabsGrid);
