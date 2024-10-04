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
const summarizeBtn = document.getElementById('summarizeBtn');
const generateGlossaryBtn = document.getElementById('generateGlossaryBtn');
const findRelatedWorkBtn = document.getElementById('findRelatedWorkBtn');

nightModeToggle.addEventListener('change', () => {
    const theme = nightModeToggle.checked ? 'dark' : 'light';
    document.body.setAttribute('data-theme', theme);
    updateIconColors(theme);
    localStorage.setItem('theme', theme);
});

function updateIconColors(theme) {
    const icons = document.querySelectorAll('.icon');
    icons.forEach(icon => {
        icon.style.fill = theme === 'light' ? '#A51C30' : '#ffffff';
    });
}

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
    saveWorkspace();
});

// Tag Input
tagInput.addEventListener('input', () => {
    const tags = tagInput.value.split(' ').slice(0, 5).map(tag => tag.startsWith('#') ? tag : '#' + tag);
    tagInput.value = tags.join(' ');
    saveWorkspace();
});

// Note Input
noteInput.addEventListener('input', () => {
    charCount.textContent = noteInput.value.length;
    saveWorkspace();
});

// Database Selection
const databaseOptions = document.querySelectorAll('.database-option');
databaseOptions.forEach(option => {
    option.addEventListener('click', () => {
        option.classList.toggle('selected');
        saveWorkspace();
    });
});

// Search Functionality
let currentPage = 1;
searchExecuteBtn.addEventListener('click', () => {
    currentPage = 1;
    performSearch();
});

async function performSearch() {
    const query = searchTerms.value;
    const selectedDatabases = Array.from(document.querySelectorAll('.database-option.selected')).map(el => el.textContent);
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;

    try {
        const response = await fetch('/api/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query, databases: selectedDatabases, startDate, endDate, page: currentPage }),
        });

        if (!response.ok) {
            throw new Error('Search request failed');
        }

        const data = await response.json();
        displaySearchResults(data.results);
    } catch (error) {
        console.error('Error performing search:', error);
        alert('An error occurred while searching. Please try again.');
    }
}

function displaySearchResults(results) {
    const searchResults = document.getElementById('searchResults');
    searchResults.innerHTML = '';
    
    results.forEach(result => {
        const resultElement = document.createElement('div');
        resultElement.classList.add('search-result');
        resultElement.innerHTML = `
            <input type="checkbox" value="${result.id}">
            <div>
                <h3>${result.title}</h3>
                <p>Authors: ${result.authors.join(', ')}</p>
                <p>Year: ${result.year}</p>
                <p>Source: ${result.source}</p>
                <div class="result-actions">
                    <button onclick="addToBibliography('${result.id}')">Add to Bibliography</button>
                    <button onclick="generateCitation('${result.id}')">Generate Citation</button>
                </div>
            </div>
        `;
        searchResults.appendChild(resultElement);
    });

    // Add pagination
    const paginationElement = document.createElement('div');
    paginationElement.classList.add('pagination');
    paginationElement.innerHTML = `
        <button onclick="previousPage()">Previous</button>
        <span>Page ${currentPage}</span>
        <button onclick="nextPage()">Next</button>
    `;
    searchResults.appendChild(paginationElement);
}

function previousPage() {
    if (currentPage > 1) {
        currentPage--;
        performSearch();
    }
}

function nextPage() {
    currentPage++;
    performSearch();
}

// Chat Functionality
sendBtn.addEventListener('click', sendMessage);
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

async function sendMessage() {
    const message = chatInput.value.trim();
    if (message) {
        appendMessage('user', message);
        chatInput.value = '';

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message }),
            });

            if (!response.ok) {
                throw new Error('Chat request failed');
            }

            const data = await response.json();
            appendMessage('ai', data.response);
        } catch (error) {
            console.error('Error sending chat message:', error);
            appendMessage('ai', 'Sorry, an error occurred. Please try again.');
        }
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

async function generateCitation() {
    const citationFormat = document.getElementById('citationFormat').value;
    const citationResults = document.getElementById('citationResults');
    
    try {
        const response = await fetch('/api/generate-citation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ format: citationFormat }),
        });

        if (!response.ok) {
            throw new Error('Citation generation failed');
        }

        const data = await response.json();
        citationResults.innerHTML += `<p>${citationFormat.toUpperCase()}: ${data.citation}</p>`;
    } catch (error) {
        console.error('Error generating citation:', error);
        alert('An error occurred while generating the citation. Please try again.');
    }
}

async function analyzeCitations() {
    try {
        const response = await fetch('/api/analyze-citations');
        
        if (!response.ok) {
            throw new Error('Citation analysis failed');
        }

        const data = await response.json();
        renderCitationNetwork(data);
    } catch (error) {
        console.error('Error analyzing citations:', error);
        alert('An error occurred while analyzing citations. Please try again.');
    }
}

function renderCitationNetwork(data) {
    const width = 400;
    const height = 300;

    const svg = d3.select("#citationNetwork")
        .html("")
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

async function exportData(type) {
    try {
        const response = await fetch(`/api/export/${type}`);
        
        if (!response.ok) {
            throw new Error(`Export ${type} failed`);
        }

        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = `${type}_export.txt`;
        document.body.appendChild(a);
        a.click();
        URL.revokeObjectURL(url);
        document.body.removeChild(a);
    } catch (error) {
        console.error(`Error exporting ${type}:`, error);
        alert(`An error occurred while exporting ${type}. Please try again.`);
    }
}

// Bibliography management
let bibliography = [];

async function addToBibliography(paperId) {
    try {
        const response = await fetch('/api/add-to-bibliography', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ paperId }),
        });

        if (!response.ok) {
            throw new Error('Failed to add to bibliography');
        }

        const data = await response.json();
        bibliography.push(data.paper);
        updateBibliographyDisplay();
        alert(`"${data.paper.title}" added to bibliography!`);
    } catch (error) {
        console.error('Error adding to bibliography:', error);
        alert('An error occurred while adding to the bibliography. Please try again.');
    }
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

async function removeBibliographyItem(index) {
    try {
        const paperId = bibliography[index].id;
        const response = await fetch(`/api/remove-from-bibliography/${paperId}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Failed to remove from bibliography');
        }

        bibliography.splice(index, 1);
        updateBibliographyDisplay();
    } catch (error) {
        console.error('Error removing from bibliography:', error);
        alert('An error occurred while removing from the bibliography. Please try again.');
    }
}

// Workspace management functions
function loadWorkspace() {
    const savedWorkspace = localStorage.getItem('currentWorkspace');
    if (savedWorkspace) {
        const workspace = JSON.parse(savedWorkspace);
        workspaceTitle.textContent = workspace.title || 'Research Workspace';
        tagInput.value = workspace.tags.join(' ') || '';
        noteInput.value = workspace.note || '';
        charCount.textContent = noteInput.value.length;

        // Load selected databases
        const selectedDatabases = workspace.selectedDatabases || [];
        databaseOptions.forEach(option => {
            if (selectedDatabases.includes(option.textContent)) {
                option.classList.add('selected');
            } else {
                option.classList.remove('selected');
            }
        });
    }
}

function saveWorkspace() {
    const workspace = {
        title: workspaceTitle.textContent,
        tags: tagInput.value.split(' ').filter(tag => tag.startsWith('#')),
        note: noteInput.value,
        selectedDatabases: Array.from(document.querySelectorAll('.database-option.selected')).map(el => el.textContent)
    };
    localStorage.setItem('currentWorkspace', JSON.stringify(workspace));
}

function createNewWorkspace() {
    if (confirm('Are you sure you want to create a new workspace? This will clear the current workspace.')) {
        workspaceTitle.textContent = 'New Research Workspace';
        tagInput.value = '';
        noteInput.value = '';
        charCount.textContent = '0';
        databaseOptions.forEach(option => option.classList.remove('selected'));
        localStorage.removeItem('currentWorkspace');
        alert('New workspace created!');
    }
}

// Setup menu buttons
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

        const dropdownMenu = button.querySelector('.dropdown-menu');
        dropdownMenu.addEventListener('click', (event) => {
            event.stopPropagation();
        });
    });

    document.addEventListener('click', () => {
        menuButtons.forEach(button => button.classList.remove('active'));
    });
}

// Quick Action Buttons
summarizeBtn.addEventListener('click', () => performQuickAction('summarize'));
generateGlossaryBtn.addEventListener('click', () => performQuickAction('generate-glossary'));
findRelatedWorkBtn.addEventListener('click', () => performQuickAction('find-related-work'));

async function performQuickAction(action) {
    const selectedPapers = getSelectedPapers();
    if (selectedPapers.length === 0) {
        alert('Please select at least one paper to perform this action.');
        return;
    }

    try {
        const response = await fetch(`/api/${action}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ papers: selectedPapers }),
        });

        if (!response.ok) {
            throw new Error(`${action} request failed`);
        }

        const data = await response.json();
        displayQuickActionResult(action, data);
    } catch (error) {
        console.error(`Error performing ${action}:`, error);
        alert(`An error occurred while performing ${action}. Please try again.`);
    }
}

function getSelectedPapers() {
    const checkboxes = document.querySelectorAll('.search-result input[type="checkbox"]:checked');
    return Array.from(checkboxes).map(checkbox => checkbox.value);
}

function displayQuickActionResult(action, data) {
    const resultMessage = `${action.charAt(0).toUpperCase() + action.slice(1)} result:\n\n${data.result}`;
    appendMessage('ai', resultMessage);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadWorkspace();
    setupMenuButtons();
    updateBibliographyDisplay();
    updateIconColors(nightModeToggle.checked ? 'dark' : 'light');

    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.setAttribute('data-theme', savedTheme);
        nightModeToggle.checked = savedTheme === 'dark';
        updateIconColors(savedTheme);
    }

    // Add event listeners for workspace management
    document.getElementById('newWorkspaceBtn').addEventListener('click', createNewWorkspace);
    document.getElementById('saveWorkspaceBtn').addEventListener('click', saveWorkspace);
    document.getElementById('openWorkspaceBtn').addEventListener('click', loadWorkspace);

    console.log('App initialized');
});

// Error handling function
function handleError(error, message) {
    console.error(error);
    alert(message);
}

// Use this function instead of inline error handling
function safelyExecute(asyncFunction, errorMessage) {
    return async (...args) => {
        try {
            await asyncFunction(...args);
        } catch (error) {
            handleError(error, errorMessage);
        }
    };
}

// Wrap our existing functions with error handling
const safePerformSearch = safelyExecute(performSearch, 'An error occurred while searching. Please try again.');
const safeSendMessage = safelyExecute(sendMessage, 'An error occurred while sending the message. Please try again.');
const safeGenerateCitation = safelyExecute(generateCitation, 'An error occurred while generating the citation. Please try again.');
const safeAnalyzeCitations = safelyExecute(analyzeCitations, 'An error occurred while analyzing citations. Please try again.');
const safeAddToBibliography = safelyExecute(addToBibliography, 'An error occurred while adding to the bibliography. Please try again.');
const safeRemoveBibliographyItem = safelyExecute(removeBibliographyItem, 'An error occurred while removing from the bibliography. Please try again.');

// Replace direct function calls with safe versions
searchExecuteBtn.addEventListener('click', () => {
    currentPage = 1;
    safePerformSearch();
});

sendBtn.addEventListener('click', safeSendMessage);
generateCitationBtn.addEventListener('click', safeGenerateCitation);
citationAnalysisBtn.addEventListener('click', safeAnalyzeCitations);

// Implement infinite scrolling for search results
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
    currentPage++;
    try {
        await safePerformSearch();
    } finally {
        isLoading = false;
    }
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'f') {
        e.preventDefault();
        document.getElementById('searchTerms').focus();
    }
    if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        safePerformSearch();
    }
    // Add more shortcuts as needed
});

// Performance optimization
const debounce = (func, delay) => {
    let inDebounce;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(inDebounce);
        inDebounce = setTimeout(() => func.apply(context, args), delay);
    }
};

const debouncedSearch = debounce(safePerformSearch, 300);

document.getElementById('searchTerms').addEventListener('input', debouncedSearch);

// Add this line at the end of the initialization function in DOMContentLoaded event
console.log('Enhanced features initialized');

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

// Call this function in the DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', () => {
    setupMenuButtons();
    // ... other initialization code
});
