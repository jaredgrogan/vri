document.addEventListener('DOMContentLoaded', function() {
    initializeCalendar();
    populateHighlights();
});

function initializeCalendar() {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        events: [
            { title: 'Spring Demo Day', date: '2024-06-15' },
            { title: 'AI Hackathon', start: '2024-07-10', end: '2024-07-12' },
            { title: 'Investor Salon', date: '2024-08-05' },
            { title: 'Blockchain Panel', date: '2024-08-20' },
            { title: 'Fireside Chat with Tech Innovator', date: '2024-09-10' }
        ],
        eventClick: function(info) {
            alert('Event: ' + info.event.title);
            // You can replace this with a modal or more sophisticated event details display
        }
    });
    calendar.render();
}

function populateHighlights() {
    const highlights = [
        { image: 'highlight1.jpg', title: 'AI Hackathon Winners', description: 'See the groundbreaking projects from our last hackathon!' },
        { image: 'highlight2.jpg', title: 'Blockchain Panel Insights', description: 'Key takeaways from our expert panel on the future of blockchain.' },
        { image: 'highlight3.jpg', title: 'Investor Salon Success', description: 'Startups that secured funding at our recent investor event.' }
    ];

    const slider = document.querySelector('.highlight-slider');
    highlights.forEach(highlight => {
        const slide = document.createElement('div');
        slide.className = 'highlight-slide';
        slide.innerHTML = `
            <img src="${highlight.image}" alt="${highlight.title}">
            <div class="slide-content">
                <h3>${highlight.title}</h3>
                <p>${highlight.description}</p>
            </div>
        `;
        slider.appendChild(slide);
    });
}

function registerEvent(eventName) {
    alert(`You've registered for ${eventName}!`);
    // Here you would typically send the registration data to a server
}

function filterEvents(category) {
    alert(`Filtering events for category: ${category}`);
    // Here you would typically update the displayed events based on the selected category
}

function subscribeNewsletter() {
    const email = document.getElementById('email').value;
    alert(`Thank you for subscribing with email: ${email}`);
    // Here you would typically send the email to a server for newsletter subscription
    return false; // Prevent form submission
}
