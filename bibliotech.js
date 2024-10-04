// DOM Elements
const nightModeToggle = document.getElementById('nightModeToggle');
const timeDisplay = document.getElementById('timeDisplay');
const workspaceTitle = document.getElementById('workspaceTitle');
const tagInput = document.getElementById('tagInput');
const noteInput = document.getElementById('noteInput');
const charCount = document.getElementById('charCount');
const searchTerms = document.getElementById('searchTerms');
const searchBtn = document.getElementById('searchBtn');
const searchExecuteBtn = document.getElementById('searchExecuteBtn');
const exportSearchBtn = document.getElementById('exportSearchBtn');
const chatInput = document.getElementById('chatInput');
const sendBtn = document.getElementById('sendBtn');
const micBtn = document.getElementById('micBtn');
const chatArea = document.getElementById('chatArea');
const generateCitationBtn = document.getElementById('generateCitationBtn');
const citationAnalysisBtn = document.getElementById('citationAnalysisBtn');
const exportCitationsBtn = document.getElementById('exportCitationsBtn');
const exportBibliographyBtn = document.getElementById('exportBibliographyBtn');

// Night Mode Toggle
nightModeToggle.addEventListener('change', () => {
    document.body.setAttribute('data-theme', nightModeToggle.checked ? 'dark' : 'light');
});

// Time Display
function updateTime() {
    const now = new Date();
    const options = { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true };
    timeDisplay.textContent = now.toLocaleString('en-US', options).replace(',', '');
}
updateTime();
setInterval(updateTime, 60000);

// Workspace Title
workspaceTitle.addEventListener('blur', () => {
    if (workspaceTitle.textContent.trim() === '') {
        workspaceTitle.textContent = 'Research Workspace';
    }
});

// Tag Input
tagInput.addEventListener('input', () => {
    const tags = tagInput.value.split(' ').slice(0, 5).map(tag => tag.startsWith('#') ? tag : '#' + tag);
    tagInput.value = tags.join(' ');
});

// Note Input
noteInput.addEventListener('input', () => {
    charCount.textContent = noteInput.value.length;
});

// Database Selection
const databaseOptions = document.querySelectorAll('.database-option');
databaseOptions.forEach(option => {
    option.addEventListener('click', () => {
        option.classList.toggle('selected');
    });
});

// Search Functionality
searchExecuteBtn.addEventListener('click', performSearch);

async function performSearch() {
    const query = searchTerms.value;
    const selectedDatabases = Array.from(document.querySelectorAll('.database-option.selected')).map(el => el.textContent);
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;

    // TODO: Implement actual API call
    console.log('Searching:', { query, selectedDatabases, startDate, endDate });

    // Simulated search results
    const results = [
        { title: 'Sample Paper 1', authors: ['John Doe', 'Jane Smith'], year: 2021 },
        { title: 'Sample Paper 2', authors: ['Alice Johnson'], year: 2020 },
    ];

    displaySearchResults(results);
}

function displaySearchResults(results) {
    const searchResults = document.getElementById('searchResults');
    searchResults.innerHTML = '';

    results.forEach(result => {
        const resultElement = document.createElement('div');
        resultElement.classList.add('search-result');
        resultElement.innerHTML = `
            <h3>${result.title}</h3>
            <p>Authors: ${result.authors.join(', ')}</p>
            <p>Year: ${result.year}</p>
        `;
        searchResults.appendChild(resultElement);
    });
}

// Chat Functionality
sendBtn.addEventListener('click', sendMessage);
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    const message = chatInput.value.trim();
    if (message) {
        appendMessage('user', message);
        chatInput.value = '';

        // TODO: Implement actual API call for RAG
        setTimeout(() => {
            appendMessage('ai', "I'm processing your request. Please wait...");
        }, 500);
    }
}

function appendMessage(sender, text) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('chat-message', sender);
    messageElement.textContent = text;
    chatArea.appendChild(messageElement);
    chatArea.scrollTop = chatArea.scrollHeight;
}

// Voice Input
let recognition;
if ('webkitSpeechRecognition' in window) {
    recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript;
        chatInput.value = transcript;
        sendMessage();
    };

    recognition.onend = function() {
        micBtn.classList.remove('recording');
    };
}

micBtn.addEventListener('click', () => {
    if (recognition) {
        if (micBtn.classList.contains('recording')) {
            recognition.stop();
        } else {
            recognition.start();
            micBtn.classList.add('recording');
        }
    } else {
        alert('Speech recognition is not supported in this browser.');
    }
});

// Citation Functionality
generateCitationBtn.addEventListener('click', generateCitation);
citationAnalysisBtn.addEventListener('click', analyzeCitations);

function generateCitation() {
    const citationFormat = document.getElementById('citationFormat').value;
    const citationResults = document.getElementById('citationResults');
    
    // TODO: Implement actual citation generation
    citationResults.textContent = `Generated citation in ${citationFormat} format.`;
}

function analyzeCitations() {
    // TODO: Implement actual citation analysis
    console.log('Citation analysis requested');
    
    // Simulated citation network data
    const data = {
        nodes: [
            { id: 'Paper A', group: 1 },
            { id: 'Paper B', group: 1 },
            { id: 'Paper C', group: 2 },
        ],
        links: [
            { source: 'Paper A', target: 'Paper B', value: 1 },
            { source: 'Paper B', target: 'Paper C', value: 1 },
        ]
    };

    renderCitationNetwork(data);
}

function renderCitationNetwork(data) {
    const width = 400;
    const height = 300;

    const svg = d3.select("#citationNetwork")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    const simulation = d3.forceSimulation(data.nodes)
        .force("link", d3.forceLink(data.links).id(d => d.id))
        .force("charge", d3.forceManyBody())
        .force("center", d3.forceCenter(width / 2, height / 2));

    const link = svg.append("g")
        .selectAll("line")
        .data(data.links)
        .enter().append("line")
        .attr("stroke", "#999")
        .attr("stroke-opacity", 0.6);

    const node = svg.append("g")
        .selectAll("circle")
        .data(data.nodes)
        .enter().append("circle")
        .attr("r", 5)
        .attr("fill", d => d.group === 1 ? "#ff4b4b" : "#4b4bff");

    node.append("title")
        .text(d => d.id);

    simulation.on("tick", () => {
        link
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);

        node
            .attr("cx", d => d.x)
            .attr("cy", d => d.y);
    });
}

// Export Functionality
exportSearchBtn.addEventListener('click', () => exportData('search'));
exportCitationsBtn.addEventListener('click', () => exportData('citations'));
exportBibliographyBtn.addEventListener('click', () => exportData('bibliography'));

function exportData(type) {
    let data;
    let filename;

    switch (type) {
        case 'search':
            data = document.getElementById('searchResults').innerText;
            filename = 'search_results.txt';
            break;
        case 'citations':
            data = document.getElementById('citationResults').innerText;
            filename = 'citations.txt';
            break;
        case 'bibliography':
            data = document.getElementById('bibliographyList').innerText;
            filename = 'bibliography.txt';
            break;
    }

    const blob = new Blob([data], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(url);
    document.body.removeChild(a);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Load saved workspace data, if any
    loadWorkspace();

    // Initialize database options
    initializeDatabaseOptions();

    // Set up menu button functionality
    setupMenuButtons();

    // Initialize citation network
    initializeCitationNetwork();

    console.log('App initialized');
});

function loadWorkspace() {
    // TODO: Implement actual workspace loading from local storage or server
    const savedWorkspace = localStorage.getItem('currentWorkspace');
    if (savedWorkspace) {
        const workspace = JSON.parse(savedWorkspace);
        workspaceTitle.textContent = workspace.title || 'Research Workspace';
        tagInput.value = workspace.tags.join(' ') || '';
        noteInput.value = workspace.note || '';
        charCount.textContent = noteInput.value.length;
    }
}

function initializeDatabaseOptions() {
    const savedDatabases = JSON.parse(localStorage.getItem('selectedDatabases')) || [];
    databaseOptions.forEach(option => {
        if (savedDatabases.includes(option.textContent)) {
            option.classList.add('selected');
        }
    });
}

function setupMenuButtons() {
    const menuButtons = document.querySelectorAll('.menu-button');
    menuButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.stopPropagation();
            this.classList.toggle('active');
            menuButtons.forEach(btn => {
                if (btn !== this) {
                    btn.classList.remove('active');
                }
            });
        });
    });

    document.addEventListener('click', () => {
        menuButtons.forEach(button => button.classList.remove('active'));
    });
}

function initializeCitationNetwork() {
    // Create an empty SVG for the citation network
    d3.select("#citationNetwork")
        .append("svg")
        .attr("width", 400)
        .attr("height", 300);
}

// Workspace management functions
function saveWorkspace() {
    const workspace = {
        title: workspaceTitle.textContent,
        tags: tagInput.value.split(' ').filter(tag => tag.startsWith('#')),
        note: noteInput.value
    };
    localStorage.setItem('currentWorkspace', JSON.stringify(workspace));
    alert('Workspace saved successfully!');
}

function createNewWorkspace() {
    if (confirm('Are you sure you want to create a new workspace? This will clear the current workspace.')) {
        workspaceTitle.textContent = 'New Research Workspace';
        tagInput.value = '';
        noteInput.value = '';
        charCount.textContent = '0';
        localStorage.removeItem('currentWorkspace');
        alert('New workspace created!');
    }
}

// Add event listeners for workspace management
document.querySelector('.menu-item:nth-child(1)').addEventListener('click', createNewWorkspace);
document.querySelector('.menu-item:nth-child(2)').addEventListener('click', saveWorkspace);
document.querySelector('.menu-item:nth-child(3)').addEventListener('click', loadWorkspace);

// Implement infinite scrolling for search results
let page = 1;
const resultsPerPage = 20;
let isLoading = false;
let hasMore = true;

window.addEventListener('scroll', () => {
    if (isLoading || !hasMore) return;
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
        loadMoreResults();
    }
});

async function loadMoreResults() {
    isLoading = true;
    page++;
    try {
        // TODO: Implement actual API call for pagination
        const newResults = await simulateSearchResults(page, resultsPerPage);
        if (newResults.length < resultsPerPage) {
            hasMore = false;
        }
        displaySearchResults(newResults, true);
    } catch (error) {
        console.error('Error loading more results:', error);
    } finally {
        isLoading = false;
    }
}

function simulateSearchResults(page, perPage) {
    // This is a placeholder function to simulate paginated results
    return new Promise(resolve => {
        setTimeout(() => {
            const results = [];
            for (let i = 0; i < perPage; i++) {
                results.push({
                    title: `Sample Paper ${(page - 1) * perPage + i + 1}`,
                    authors: ['Author A', 'Author B'],
                    year: 2020 + Math.floor(Math.random() * 5)
                });
            }
            resolve(results);
        }, 1000);
    });
}

// Enhance search results display
function displaySearchResults(results, append = false) {
    const searchResults = document.getElementById('searchResults');
    if (!append) {
        searchResults.innerHTML = '';
    }
    
    results.forEach(result => {
        const resultElement = document.createElement('div');
        resultElement.classList.add('search-result');
        resultElement.innerHTML = `
            <h3>${result.title}</h3>
            <p>Authors: ${result.authors.join(', ')}</p>
            <p>Year: ${result.year}</p>
            <div class="result-actions">
                <button onclick="addToBibliography('${result.title}')">Add to Bibliography</button>
                <button onclick="generateCitation('${result.title}')">Generate Citation</button>
            </div>
        `;
        searchResults.appendChild(resultElement);
    });
}

// Bibliography management
let bibliography = [];

function addToBibliography(paperTitle) {
    // In a real application, you would add the full paper details
    bibliography.push({ title: paperTitle });
    updateBibliographyDisplay();
    alert(`"${paperTitle}" added to bibliography!`);
}

function updateBibliographyDisplay() {
    const bibliographyList = document.getElementById('bibliographyList');
    bibliographyList.innerHTML = '';
    bibliography.forEach((paper, index) => {
        const paperElement = document.createElement('div');
        paperElement.classList.add('bibliography-item');
        paperElement.innerHTML = `
            <p>${paper.title}</p>
            <button onclick="removeBibliographyItem(${index})">Remove</button>
        `;
        bibliographyList.appendChild(paperElement);
    });
}

function removeBibliographyItem(index) {
    bibliography.splice(index, 1);
    updateBibliographyDisplay();
}

// Enhanced citation generation
function generateCitation(paperTitle) {
    const citationFormat = document.getElementById('citationFormat').value;
    const citationResults = document.getElementById('citationResults');
    
    // TODO: Implement actual citation generation
    // This is a placeholder
    const citation = `${paperTitle}. (2023). Journal of Placeholder Studies, 1(1), 1-10.`;
    
    citationResults.innerHTML += `<p>${citationFormat.toUpperCase()}: ${citation}</p>`;
}

// Implement command palette
const commandPalette = document.createElement('div');
commandPalette.id = 'commandPalette';
commandPalette.innerHTML = `
    <input type="text" id="commandInput" placeholder="Type a command...">
    <div id="commandResults"></div>
`;
document.body.appendChild(commandPalette);

const commandInput = document.getElementById('commandInput');
const commandResults = document.getElementById('commandResults');

const commands = [
    { name: 'New Workspace', action: createNewWorkspace },
    { name: 'Save Workspace', action: saveWorkspace },
    { name: 'Load Workspace', action: loadWorkspace },
    { name: 'Perform Search', action: performSearch },
    { name: 'Generate Citation', action: generateCitation },
    { name: 'Analyze Citations', action: analyzeCitations },
    // Add more commands as needed
];

document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        commandPalette.style.display = 'block';
        commandInput.focus();
    }
});

commandInput.addEventListener('input', () => {
    const query = commandInput.value.toLowerCase();
    const filteredCommands = commands.filter(cmd => cmd.name.toLowerCase().includes(query));
    displayCommands(filteredCommands);
});

function displayCommands(filteredCommands) {
    commandResults.innerHTML = '';
    filteredCommands.forEach(cmd => {
        const cmdElement = document.createElement('div');
        cmdElement.textContent = cmd.name;
        cmdElement.addEventListener('click', () => {
            cmd.action();
            commandPalette.style.display = 'none';
            commandInput.value = '';
        });
        commandResults.appendChild(cmdElement);
    });
}

document.addEventListener('click', (e) => {
    if (!commandPalette.contains(e.target)) {
        commandPalette.style.display = 'none';
    }
});

// Add this line at the end of the initialization function
console.log('Enhanced features initialized');
