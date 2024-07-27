document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const modeToggle = document.querySelector('.mode-toggle');
    const modeIcon = document.querySelector('.mode-icon');
    const typingText = document.getElementById('typing-text');

    function toggleMode() {
        body.classList.toggle('night-mode');
        body.classList.toggle('day-mode');
        updateModeIcon();
    }

    function updateModeIcon() {
        const isNightMode = body.classList.contains('night-mode');
        modeIcon.innerHTML = isNightMode ? getSunIcon() : getMoonIcon();
        modeIcon.style.fill = isNightMode ? 'white' : 'black';
    }

    function getSunIcon() {
        return `
            <circle cx="12" cy="12" r="4" />
            <line x1="12" y1="2" x2="12" y2="4" stroke-width="2" stroke-linecap="round" />
            <line x1="12" y1="20" x2="12" y2="22" stroke-width="2" stroke-linecap="round" />
            <line x1="4" y1="12" x2="2" y2="12" stroke-width="2" stroke-linecap="round" />
            <line x1="20" y1="12" x2="22" y2="12" stroke-width="2" stroke-linecap="round" />
            <line x1="6.34" y1="6.34" x2="4.92" y2="4.92" stroke-width="2" stroke-linecap="round" />
            <line x1="17.66" y1="17.66" x2="19.08" y2="19.08" stroke-width="2" stroke-linecap="round" />
            <line x1="6.34" y1="17.66" x2="4.92" y2="19.08" stroke-width="2" stroke-linecap="round" />
            <line x1="17.66" y1="6.34" x2="19.08" y2="4.92" stroke-width="2" stroke-linecap="round" />
        `;
    }

    function getMoonIcon() {
        return `<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />`;
    }

    modeToggle.addEventListener('click', toggleMode);
    updateModeIcon(); // This will set the initial icon to moon (night mode icon)

    function typeText(text, element, speed = 100) {
        let i = 0;
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    typeText('blockchaintech.ai', typingText);
});

function launchApp() {
    // Add your app launch logic here
    console.log('Launching app...');
}
