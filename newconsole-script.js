// Universitas AI Chat Console - Unified JavaScript Document

// Translations
const translations = {
    en: {
        aiGreeting: "Hi, I'm Herakles — Your AI Assistant. What do you want to learn?",
        summarize: "Summarize",
        bullets: "Bullets",
        explain: "Explain",
        explainConcepts: "Explain Concepts",
        stepByStep: "Step by Step",
        glossary: "Glossary",
        analyze: "Analyze",
        evaluate: "Evaluate",
        improvements: "Improvements",
        extractDetails: "Extract Details",
        actions: "Actions",
        nextActions: "Next Actions",
        actionPlan: "Action Plan",
        webSearch: "Web Search",
        resources: "Resources",
        quiz: "Quiz",
        newChat: "New Chat",
        messagePlaceholder: "Type a message...",
        navMenu: "Menu",
        navApps: "Apps",
        navLearn: "Learn",
        errorMessage: "An error occurred. Please try again.",
        browserNotSupported: "Your browser does not support audio recording",
        microphoneError: "Error accessing microphone. Please check your settings and try again.",
        offlineMessage: "You are currently offline. Some features may not be available.",
        chatHistory: "Chat History"
    },
    es: {
        aiGreeting: "Hola, soy Herakles — Tu Asistente de IA. ¿Qué quieres aprender?",
        // ... (other Spanish translations)
    },
    fr: {
        aiGreeting: "Bonjour, je suis Herakles — Votre Assistant IA. Que voulez-vous apprendre ?",
        // ... (other French translations)
    },
    it: {
        aiGreeting: "Ciao, sono Herakles — Il tuo Assistente IA. Cosa vuoi imparare?",
        // ... (other Italian translations)
    },
    de: {
        aiGreeting: "Hallo, ich bin Herakles — Dein KI-Assistent. Was möchtest du lernen?",
        // ... (other German translations)
    },
    pt: {
        aiGreeting: "Olá, sou Herakles — Seu Assistente de IA. O que você quer aprender?",
        // ... (other Portuguese translations)
    },
    ar: {
        aiGreeting: "مرحبًا، أنا هيراكليس — مساعدك الذكي. ماذا تريد أن تتعلم؟",
        // ... (other Arabic translations)
    }
};

// Language names for the translation menu
const languageNames = {
    en: "In English",
    es: "En Español",
    fr: "En Français",
    it: "In Italiano",
    de: "Auf Deutsch",
    pt: "Em Português",
    ar: "بالعربية"
};

// Global variables
let language = 'en';
let isDarkMode = false;
let isRecording = false;
let currentChatId = null;

// DOM Elements
const app = document.getElementById('app');
const chatBox = document.getElementById('chatBox');
const messageInput = document.getElementById('messageInput');
const sendMessageBtn = document.getElementById('sendMessageBtn');
const voiceInputBtn = document.getElementById('voiceInputBtn');
const attachmentBtn = document.getElementById('attachmentBtn');
const fileInput = document.getElementById('fileInput');
const darkModeBtn = document.getElementById('darkModeBtn');
const darkModeIcon = document.getElementById('darkModeIcon');
const languageSelect = document.getElementById('languageSelect');
const newChatBtn = document.getElementById('newChatBtn');
const sidebar = document.getElementById('sidebar');
const sidebarToggle = document.getElementById('sidebarToggle');
const closeSidebarBtn = document.getElementById('closeSidebarBtn');
const chatList = document.getElementById('chatList');

// Functions
function updateLanguage() {
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        element.textContent = translations[language][key];
    });

    messageInput.placeholder = translations[language].messagePlaceholder;

    updateButtonText('summarizeBtn', 'summarize');
    updateButtonText('explainBtn', 'explain');
    updateButtonText('analyzeBtn', 'analyze');
    updateButtonText('actionsBtn', 'actions');

    updateChatLanguage();
    setRTL();
}

function updateButtonText(buttonId, translationKey) {
    const button = document.getElementById(buttonId);
    if (!['translateBtn', 'webSearchBtn', 'moreBtn'].includes(buttonId)) {
        button.textContent = translations[language][translationKey];
    }
}

function updateChatLanguage() {
    const chatBubbles = chatBox.querySelectorAll('.chat-bubble');
    chatBubbles.forEach(bubble => {
        if (bubble.classList.contains('ai') && Object.values(translations).some(lang => lang.aiGreeting === bubble.textContent)) {
            bubble.textContent = translations[language].aiGreeting;
        }
    });
}

function setRTL() {
    if (['ar'].includes(language)) {
        document.body.classList.add('rtl');
        chatBox.style.direction = 'rtl';
    } else {
        document.body.classList.remove('rtl');
        chatBox.style.direction = 'ltr';
    }
}

function populateMenu(menu, options) {
    if (menu.style.display === 'block') {
        menu.style.display = 'none';
        return;
    }

    menu.innerHTML = '';
    if (menu.id === 'translateMenu') {
        Object.entries(languageNames).forEach(([lang, name]) => {
            const button = document.createElement('button');
            button.textContent = name;
            button.addEventListener('click', () => {
                messageInput.value = name;
                menu.style.display = 'none';
            });
            menu.appendChild(button);
        });
    } else {
        options.forEach(option => {
            const button = document.createElement('button');
            button.textContent = translations[language][option];
            button.addEventListener('click', () => {
                messageInput.value = translations[language][option];
                menu.style.display = 'none';
            });
            menu.appendChild(button);
        });
    }

    // Close all other menus
    document.querySelectorAll('.language-menu').forEach(otherMenu => {
        if (otherMenu !== menu) {
            otherMenu.style.display = 'none';
        }
    });

    menu.style.display = 'block';
}

function showMenu(menu, event) {
    const rect = event.target.getBoundingClientRect();
    menu.style.left = `${rect.left}px`;
    menu.style.top = `${rect.bottom + 5}px`;
}

// Event Listeners for auto-suggestion buttons
document.getElementById('summarizeBtn').addEventListener('click', (event) => {
    event.stopPropagation();
    populateMenu(document.getElementById('summarizeMenu'), ['summarize', 'bullets']);
    showMenu(document.getElementById('summarizeMenu'), event);
});

document.getElementById('explainBtn').addEventListener('click', (event) => {
    event.stopPropagation();
    populateMenu(document.getElementById('explainMenu'), ['explainConcepts', 'stepByStep', 'glossary']);
    showMenu(document.getElementById('explainMenu'), event);
});

document.getElementById('analyzeBtn').addEventListener('click', (event) => {
    event.stopPropagation();
    populateMenu(document.getElementById('analyzeMenu'), ['evaluate', 'improvements', 'extractDetails']);
    showMenu(document.getElementById('analyzeMenu'), event);
});

document.getElementById('actionsBtn').addEventListener('click', (event) => {
    event.stopPropagation();
    populateMenu(document.getElementById('actionsMenu'), ['nextActions', 'actionPlan']);
    showMenu(document.getElementById('actionsMenu'), event);
});

document.getElementById('translateBtn').addEventListener('click', (event) => {
    event.stopPropagation();
    populateMenu(document.getElementById('translateMenu'));
    showMenu(document.getElementById('translateMenu'), event);
});

document.getElementById('webSearchBtn').addEventListener('click', () => {
    messageInput.value = translations[language].webSearch;
});

document.getElementById('moreBtn').addEventListener('click', (event) => {
    event.stopPropagation();
    populateMenu(document.getElementById('moreMenu'), ['resources', 'quiz']);
    showMenu(document.getElementById('moreMenu'), event);
});

// Close all menus when clicking outside
document.addEventListener('click', () => {
    document.querySelectorAll('.language-menu').forEach(menu => {
        menu.style.display = 'none';
    });
});

// Prevent closing when clicking inside the menu
document.querySelectorAll('.language-menu').forEach(menu => {
    menu.addEventListener('click', (event) => {
        event.stopPropagation();
    });
});

languageSelect.addEventListener('change', function() {
    language = this.value;
    updateLanguage();
    updateGreeting();
    saveChatHistory(); // Save the updated chat with new language
});

function toggleDarkMode() {
    isDarkMode = !isDarkMode;
    if (isDarkMode) {
        app.classList.remove('light-mode');
        app.classList.add('dark-mode');
        darkModeIcon.innerHTML = '<path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>';
        attachmentBtn.style.color = 'white';
    } else {
        app.classList.remove('dark-mode');
        app.classList.add('light-mode');
        darkModeIcon.innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>';
        attachmentBtn.style.color = 'black';
    }
    updateLanguage();
}

async function sendMessage() {
    const message = messageInput.value.trim();
    if (message) {
        createChatBubble(message, true);
        messageInput.value = '';

        try {
            const response = await callGPT35API(message);
            createChatBubble(response, false);
            saveChatHistory();
        } catch (error) {
            handleError(error);
        }
    }
}

sendMessageBtn.addEventListener('click', sendMessage);
messageInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

attachmentBtn.addEventListener('click', function() {
    fileInput.click();
});

fileInput.addEventListener('change', function() {
    if (fileInput.files.length > 0) {
        handleFileUpload(fileInput.files[0]);
    }
});

voiceInputBtn.addEventListener('click', toggleRecording);

function toggleRecording() {
    if (isRecording) {
        stopRecording();
    } else {
        startRecording();
    }
}

function startRecording() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        alert(translations[language].browserNotSupported);
        return;
    }

    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            const mediaRecorder = new MediaRecorder(stream);
            window.mediaStream = stream;
            window.mediaRecorder = mediaRecorder;
            let chunks = [];

            mediaRecorder.ondataavailable = (e) => {
                chunks.push(e.data);
            };

            mediaRecorder.onstop = () => {
                const blob = new Blob(chunks, { type: 'audio/webm' });
                chunks = [];
                handleVoiceInput(blob);
            };

            mediaRecorder.start();
            isRecording = true;
            voiceInputBtn.classList.add('recording');
        })
        .catch(error => {
            console.error('Error accessing microphone:', error);
            alert(translations[language].microphoneError);
        });
}

function stopRecording() {
    if (window.mediaRecorder && isRecording) {
        window.mediaRecorder.stop();
        window.mediaStream.getTracks().forEach(track => track.stop());
        isRecording = false;
        voiceInputBtn.classList.remove('recording');
    }
}

async function handleVoiceInput(audioBlob) {
    const formData = new FormData();
    formData.append('audio', audioBlob, 'recording.webm');

    try {
        const response = await safeFetch('/api/transcribe', {
            method: 'POST',
            body: formData
        });
        messageInput.value = response.transcription;
    } catch (error) {
        handleError(error);
    }
}

function createChatBubble(text, isUser = false) {
    const bubble = document.createElement('div');
    bubble.classList.add('chat-bubble', isUser ? 'user' : 'ai');
    bubble.textContent = text;
    
    // Add accessibility attributes
    bubble.setAttribute('role', 'log');
    bubble.setAttribute('aria-live', 'polite');
    
    chatBox.appendChild(bubble);
    chatBox.scrollTop = chatBox.scrollHeight;
}

async function handleFileUpload(file) {
    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await safeFetch('/api/upload', {
            method: 'POST',
            body: formData
        });
        createChatBubble(`File uploaded: ${file.name}`, true);
        const aiResponse = await callGPT35API(`Analyze the uploaded file: ${file.name}`);
        createChatBubble(aiResponse, false);
    } catch (error) {
        handleError(error);
    }
}

async function callGPT35API(message) {
    try {
        const response = await safeFetch('/api/gpt', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message, language, chatId: currentChatId })
        });
        return response.response;
    } catch (error) {
        handleError(error);
        return translations[language].errorMessage;
    }
}

function handleError(error) {
    console.error('Error:', error);
    alert(translations[language].errorMessage);
}

function saveChatHistory() {
    const chatHistory = Array.from(chatBox.children).map(bubble => ({
        text: bubble.textContent,
        isUser: bubble.classList.contains('user')
    }));
    localStorage.setItem(`chat_${currentChatId}`, JSON.stringify(chatHistory));
    updateChatList();
}

function loadChatHistory(chatId) {
    const chatHistory = JSON.parse(localStorage.getItem(`chat_${chatId}`));
    if (chatHistory) {
        chatBox.innerHTML = '';
        chatHistory.forEach(message => createChatBubble(message.text, message.isUser));
    }
}

newChatBtn.addEventListener('click', startNewChat);

function startNewChat() {
    currentChatId = Date.now();
    chatBox.innerHTML = '';
    createChatBubble(translations[language].aiGreeting, false);
    saveChatHistory();
}

function updateChatList() {
    chatList.innerHTML = '';
    const chats = Object.keys(localStorage)
        .filter(key => key.startsWith('chat_'))
        .sort((a, b) => b.split('_')[1] - a.split('_')[1]);

    chats.forEach(chatKey => {
        const chatId = chatKey.split('_')[1];
        const chatData = JSON.parse(localStorage.getItem(chatKey));
        const chatItem = document.createElement('div');
        chatItem.classList.add('chat-item');
        chatItem.textContent = chatData[0].text.substring(0, 30) + '...';
        chatItem.addEventListener('click', () => loadChat(chatId));
        chatList.appendChild(chatItem);
    });
}

function loadChat(chatId) {
    currentChatId = chatId;
    loadChatHistory(chatId);
    closeSidebar();
}

sidebarToggle.addEventListener('click', openSidebar);
closeSidebarBtn.addEventListener('click', closeSidebar);

function openSidebar() {
    sidebar.classList.add('open');
    updateChatList();
}

function closeSidebar() {
    sidebar.classList.remove('open');
}

function handleResize() {
    const isMobile = window.innerWidth <= 768;
    document.querySelectorAll('.response-suggestions button').forEach(button => {
        button.style.fontSize = isMobile ? '12px' : '14px';
    });
}

const debouncedHandleResize = debounce(handleResize, 250);
window.addEventListener('resize', debouncedHandleResize);

chatBox.addEventListener('dragover', (e) => {
    e.preventDefault();
    chatBox.classList.add('dragover');
});

chatBox.addEventListener('dragleave', (e) => {
    e.preventDefault();
    chatBox.classList.remove('dragover');
});

chatBox.addEventListener('drop', (e) => {
    e.preventDefault();
    chatBox.classList.remove('dragover');
    if (e.dataTransfer.files.length > 0) {
        handleFileUpload(e.dataTransfer.files[0]);
    }
});

function handleNetworkChange() {
    if (navigator.onLine) {
        document.querySelectorAll('button, input').forEach(el => el.disabled = false);
    } else {
        document.querySelectorAll('button, input').forEach(el => el.disabled = true);
        alert(translations[language].offlineMessage);
    }
}

window.addEventListener('online', handleNetworkChange);
window.addEventListener('offline', handleNetworkChange);

// Accessibility improvements
document.querySelectorAll('button, input, select').forEach(el => {
    if (!el.getAttribute('tabindex')) {
        el.setAttribute('tabindex', '0');
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        document.querySelectorAll('.language-menu').forEach(menu => {
            menu.style.display = 'none';
        });
        closeSidebar();
    }
});

// Dark mode preference detection
const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
function handleDarkModeChange(e) {
    if (e.matches) {
        if (!isDarkMode) toggleDarkMode();
    } else {
        if (isDarkMode) toggleDarkMode();
    }
}
darkModeMediaQuery.addListener(handleDarkModeChange);

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Safe fetch function with error handling
async function safeFetch(url, options) {
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}

// Initialize the application
function initApp() {
    updateLanguage();
    handleResize();
    handleNetworkChange();
    startNewChat();
    handleDarkModeChange(darkModeMediaQuery);
}

// Call initApp when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initApp);

// Ensure proper cleanup when the page is unloaded
window.addEventListener('beforeunload', () => {
    if (window.mediaStream) {
        window.mediaStream.getTracks().forEach(track => track.stop());
    }
});
