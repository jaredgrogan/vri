document.addEventListener('DOMContentLoaded', function() {
    populateTeam();
    populatePortfolio();
});

function populateTeam() {
    const teamMembers = [
        { name: 'Jane Doe', role: 'Managing Partner', image: 'jane-doe.jpg' },
        { name: 'John Smith', role: 'Investment Director', image: 'john-smith.jpg' },
        { name: 'Alice Johnson', role: 'AI Specialist', image: 'alice-johnson.jpg' },
        { name: 'Bob Williams', role: 'Blockchain Expert', image: 'bob-williams.jpg' }
    ];

    const teamGrid = document.getElementById('team-grid');
    teamMembers.forEach(member => {
        const memberCard = document.createElement('div');
        memberCard.className = 'team-member';
        memberCard.innerHTML = `
            <img src="${member.image}" alt="${member.name}">
            <h3>${member.name}</h3>
            <p>${member.role}</p>
        `;
        teamGrid.appendChild(memberCard);
    });
}

function populatePortfolio() {
    const portfolioCompanies = [
        { name: 'AI Insights', description: 'AI-driven business intelligence platform', image: 'ai-insights.jpg' },
        { name: 'BlockChain Solutions', description: 'Scalable blockchain infrastructure', image: 'blockchain-solutions.jpg' },
        { name: 'NLP Innovate', description: 'Advanced natural language processing tools', image: 'nlp-innovate.jpg' }
    ];

    const portfolioSlider = document.getElementById('portfolio-slider');
    portfolioCompanies.forEach(company => {
        const slide = document.createElement('div');
        slide.className = 'portfolio-slide';
        slide.innerHTML = `
            <img src="${company.image}" alt="${company.name}">
            <div class="slide-content">
                <h3>${company.name}</h3>
                <p>${company.description}</p>
            </div>
        `;
        portfolioSlider.appendChild(slide);
    });
}

function showLPModal() {
    document.getElementById('lp-modal').style.display = 'block';
}

function closeLPModal() {
    document.getElementById('lp-modal').style.display = 'none';
}

function submitLPForm() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const organization = document.getElementById('organization').value;
    const message = document.getElementById('message').value;

    // Here you would typically send this data to a server
    console.log('LP Information Request:', { name, email, organization, message });

    alert('Thank you for your interest. We will be in touch shortly.');
    closeLPModal();
    return false; // Prevent form submission
}

// Close modal when clicking outside of it
window.onclick = function(event) {
    if (event.target.id === 'lp-modal') {
        closeLPModal();
    }
  
