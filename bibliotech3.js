<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Universitas AI - Research Assistant</title>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&family=Source+Sans+Pro:wght@400;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="bibliotech3.css">
</head>
<body>
    <header>
        <div class="header-left">
            <a href="index.html" class="logo-link">
                <img src="favicon5.svg" alt="Herakles AI Logo" class="logo">
            </a>
            <h1 class="header-title">// Discover the Universe</h1>
        </div>
        <div class="header-right">
            <div class="menu-button" id="fileMenu">
                <button class="icon-button" title="File Options">
                    <span class="icon icon-file" aria-label="File menu"></span>
                </button>
                <div class="dropdown-menu">
                    <div class="menu-item" id="newWorkspaceBtn">New Workspace</div>
                    <div class="menu-item" id="saveWorkspaceBtn">Save Workspace</div>
                    <div class="menu-item" id="openWorkspaceBtn">Open Workspace</div>
                </div>
            </div>
            <div class="menu-button" id="settingsMenu">
                <button class="icon-button" title="Settings">
                    <span class="icon icon-settings" aria-label="Settings menu"></span>
                </button>
                <div class="dropdown-menu">
                    <h3>Settings</h3>
                    <h4>Herakles Audio</h4>
                    <label for="volumeSlider">Volume:</label>
                    <input type="range" id="volumeSlider" min="0" max="100" value="100">
                    <label for="genderToggle">Gender:</label>
                    <select id="genderToggle">
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                    <h4>Display</h4>
                    <label for="nightModeToggle">Night Mode:</label>
                    <input type="checkbox" id="nightModeToggle">
                    <h4>Time</h4>
                    <label for="timeFormat">Time Format:</label>
                    <select id="timeFormat">
                        <option value="12hr">12 Hour</option>
                        <option value="24hr">24 Hour</option>
                    </select>
                </div>
            </div>
            <div id="timeDisplay" class="time-display"></div>
        </div>
    </header>

    <main>
        <section class="workspace-info panel">
            <h2 id="workspaceTitle" contenteditable="true">Research Workspace</h2>
            <input type="text" id="tagInput" placeholder="Enter up to 5 tags (separated by spaces)">
            <textarea id="noteInput" placeholder="Outline your research question in 250 characters." maxlength="250"></textarea>
            <div class="char-counter"><span id="charCount">0</span> / 250</div>
        </section>

        <section class="search-section panel">
            <h2>Search Academic Databases</h2>
            <div class="search-bar">
                <input type="text" id="searchTerms" placeholder="Enter your research query...">
                <button id="searchBtn" class="icon-button" title="Search">
                    <span class="icon icon-search" aria-label="Search"></span>
                </button>
            </div>
            <div class="database-options">
                <span class="database-option">arXiv</span>
                <span class="database-option">Crossref</span>
                <span class="database-option">DOAJ</span>
                <span class="database-option">Microsoft Academic Graph</span>
                <span class="database-option">ORCID</span>
                <span class="database-option">PubMed</span>
                <span class="database-option">Scopus</span>
                <span class="database-option">Semantic Scholar</span>
                <span class="database-option">Unpaywall</span>
                <span class="database-option">Web of Science</span>
                <span class="database-option">Open Alex API</span>
            </div>
            <div class="date-range">
                <label for="startDate">Start Date:</label>
                <input type="date" id="startDate">
                <label for="endDate">End Date:</label>
                <input type="date" id="endDate">
            </div>
            <div class="button-row">
                <button id="searchExecuteBtn" class="action-button">Search</button>
                <button id="exportSearchBtn" class="export-button">Export Results</button>
            </div>
            <div id="searchResults" class="search-results"></div>
        </section>

        <section class="rag-chat panel">
            <h2>Chat with Herakles AI</h2>
            <div id="chatArea">
                <div class="chat-message ai">Hi, I'm Herakles. How can I assist you with your research today?</div>
            </div>
            <div class="chat-input-container">
                <input type="text" id="chatInput" placeholder="Type your message here...">
                <button id="sendBtn" class="icon-button" title="Send Message">
                    <span class="icon icon-send" aria-label="Send message"></span>
                </button>
                <button id="micBtn" class="icon-button" title="Voice Input">
                    <span class="icon icon-microphone" aria-label="Voice input"></span>
                </button>
            </div>
            <div class="quick-actions">
                <button id="summarizeBtn" class="action-button">Summarize</button>
                <button id="generateGlossaryBtn" class="action-button">Generate Glossary</button>
                <button id="findRelatedWorkBtn" class="action-button">Find Related Work</button>
            </div>
        </section>

        <section class="citation-bibliography">
            <div class="citation-tools panel">
                <h2>Citation Analysis & Management</h2>
                <div class="button-row">
                    <button id="generateCitationBtn" class="action-button">Generate Citation</button>
                    <button id="citationAnalysisBtn" class="action-button">Citation Analysis</button>
                </div>
                <select id="citationFormat">
                    <option value="">Select Citation Format</option>
                    <option value="apa">APA</option>
                    <option value="mla">MLA</option>
                    <option value="chicago">Chicago</option>
                    <option value="harvard">Harvard</option>
                    <option value="ieee">IEEE</option>
                </select>
                <div id="citationResults"></div>
                <div id="citationNetwork"></div>
            </div>
            <div class="bibliography panel">
                <h2>Bibliography</h2>
                <div id="bibliographyList"></div>
                <button id="exportBibliographyBtn" class="export-button">Export Bibliography</button>
            </div>
        </section>
    </main>

    <footer>
        <p>&copy; 2024 UNIVERSITAS AI</p>
    </footer>

    <script src="https://d3js.org/d3.v7.min.js"></script>
    <script src="bibliotech3.js"></script>
</body>
</html>
