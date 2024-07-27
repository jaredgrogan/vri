function expandTech(techId) {
    const techDetails = document.getElementById(techId);
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
