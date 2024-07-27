document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const modeToggle = document.querySelector('.mode-toggle');
    const modeText = document.getElementById('mode-text');
    const typingText = document.getElementById('typing-text');

    function toggleMode() {
        body.classList.toggle('night-mode');
        body.classList.toggle('day-mode');
        modeText.textContent = body.classList.contains('night-mode') ? 'day' : 'night';
    }

    modeToggle.addEventListener('click', toggleMode);

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
