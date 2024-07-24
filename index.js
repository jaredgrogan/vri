import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Line } from 'react-chartjs-2';
import 'tailwindcss/tailwind.css';

const CodeEditor = () => {
  const [code, setCode] = useState('');

  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };

  return (
    <div className="code-editor">
      <textarea
        value={code}
        onChange={handleCodeChange}
        spellCheck="false"
        className="code-area"
        placeholder="Write your Python code here..."
      />
    </div>
  );
};

const Dashboard = () => {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'Accuracy',
        data: [65, 59, 80, 81, 56],
        fill: false,
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-2">
          <Line data={data} options={options} />
        </div>
        <div className="bg-gray-800 p-4 rounded">
          <h2 className="text-xl font-bold">Key Metrics</h2>
          <ul>
            <li>Accuracy: 81%</li>
            <li>Precision: 78%</li>
            <li>Recall: 84%</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const TutorialOverlay = ({ steps }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div className="tutorial-overlay">
      <div className="tutorial-step">
        <h3>{steps[currentStep].title}</h3>
        <p>{steps[currentStep].content}</p>
        <div className="buttons">
          <button onClick={prevStep} disabled={currentStep === 0}>
            Previous
          </button>
          <button onClick={nextStep} disabled={currentStep === steps.length - 1}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

const ProjectManagement = () => {
  const [projects, setProjects] = useState([]);
  const [newProjectName, setNewProjectName] = useState('');

  const addProject = () => {
    setProjects([...projects, { name: newProjectName, version: 1 }]);
    setNewProjectName('');
  };

  const saveVersion = (index) => {
    const updatedProjects = projects.map((project, i) => 
      i === index ? { ...project, version: project.version + 1 } : project
    );
    setProjects(updatedProjects);
  };

  const shareProject = (index) => {
    alert(`Sharing project: ${projects[index].name}`);
  };

  return (
    <div className="p-4">
      <h1>Project Management</h1>
      <input
        type="text"
        value={newProjectName}
        onChange={(e) => setNewProjectName(e.target.value)}
        placeholder="New Project Name"
      />
      <button onClick={addProject}>Add Project</button>
      <ul>
        {projects.map((project, index) => (
          <li key={index}>
            {project.name} (Version: {project.version})
            <button onClick={() => saveVersion(index)}>Save Version</button>
            <button onClick={() => shareProject(index)}>Share</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const AIAssistant = () => {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [analysis, setAnalysis] = useState('');

  const handleInputChange = (e) => {
    setInput(e.target.value);
    // Mock suggestions based on input
    setSuggestions(['Suggestion 1', 'Suggestion 2', 'Suggestion 3']);
  };

  const analyzeCode = () => {
    // Mock analysis of the code
    setAnalysis('Code is well-structured, but consider optimizing loop at line 4.');
  };

  return (
    <div className="ai-assistant p-4">
      <h1>AI Assistant</h1>
      <textarea
        value={input}
        onChange={handleInputChange}
        placeholder="Write your code here..."
      />
      <div className="suggestions">
        <h2>Suggestions</h2>
        <ul>
          {suggestions.map((suggestion, index) => (
            <li key={index}>{suggestion}</li>
          ))}
        </ul>
      </div>
      <button onClick={analyzeCode}>Analyze Code</button>
      {analysis && (
        <div className="analysis">
          <h2>Analysis</h2>
          <p>{analysis}</p>
        </div>
      )}
    </div>
  );
};

const App = () => {
  const tutorialSteps = [
    { title: 'Welcome', content: 'Welcome to the app! Let\'s get started.' },
    { title: 'Code Editor', content: 'This is the code editor. You can write your Python code here.' },
    { title: 'Dashboard', content: 'Here you can see the performance metrics of your AI model.' },
    { title: 'Project Management', content: 'Manage your projects, save versions, and share them.' },
    { title: 'AI Assistant', content: 'Get suggestions and analysis for your code.' }
  ];

  return (
    <div>
      <TutorialOverlay steps={tutorialSteps} />
      <Dashboard />
      <CodeEditor />
      <ProjectManagement />
      <AIAssistant />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
