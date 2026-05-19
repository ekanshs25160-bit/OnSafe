const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const app = express();
const PORT = process.env.PORT || 3001;

const PYTHON_SCANNER_URL = "https://onsafe-python.onrender.com";

app.use(cors({
  origin: "*"
}));
app.use(express.json());

// Health check endpoint - verify deploy version and python scanner URL
app.get('/api/ping', (req, res) => {
  res.json({
    status: 'online',
    version: '2.0.1',
    python_scanner_url: PYTHON_SCANNER_URL,
    timestamp: new Date().toISOString()
  });
});

// Helper to read JSON data
const getData = (filename) => {
  const filePath = path.join(__dirname, 'data', `${filename}.json`);
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
};

// Helper to save JSON data
const saveData = (filename, data) => {
  const filePath = path.join(__dirname, 'data', `${filename}.json`);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
};

// API Endpoints
app.get('/api/experts', (req, res) => {
  try {
    const experts = getData('experts');
    res.json(experts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load experts' });
  }
});

app.get('/api/sprints', (req, res) => {
  try {
    const sprints = getData('sprints');
    res.json(sprints);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load sprints' });
  }
});

app.get('/api/dashboard/summary', (req, res) => {
  try {
    const projectStatus = getData('project_status');
    const vulnerabilities = getData('vulnerabilities');
    res.json({
      project_status: projectStatus,
      latest_vulnerabilities: vulnerabilities
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to load dashboard summary' });
  }
});

app.post('/api/scan', (req, res) => {
  const { url } = req.body;
  if (!url) {
    return res.status(400).json({ error: 'No URL provided' });
  }

  console.log(`INITIATING_SCAN: ${url}`);

  // Execute the Python scan tool logic
  // We'll call the Flask API if it's running, or run the script directly.
  const pythonScript = path.join(__dirname, '..', 'python_scanner', 'scanner.py');

  
  // We need to pass the URL to the script. 
  // Since scanner.py is a module, we can write a small wrapper or just use the Flask API if it's up.
  // Let's assume the user wants the Node server to be the primary orchestrator.
  
  // Strategy: Call the existing Flask API at 127.0.0.1:5000/scan
  // We use fetch (Node 18+) or a simple http request.
  
  const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

  fetch(`${PYTHON_SCANNER_URL}/scan?url=${encodeURIComponent(url)}`)
    .then(response => response.json())
    .then(scanResult => {
      // Update global_health_score in project_status.json
      const projectStatus = getData('project_status');
      projectStatus.global_health_score = scanResult.score;
      
      // Update grade based on score
      if (scanResult.score >= 90) projectStatus.health_grade = 'A';
      else if (scanResult.score >= 80) projectStatus.health_grade = 'B';
      else if (scanResult.score >= 70) projectStatus.health_grade = 'C';
      else projectStatus.health_grade = 'D';
      
      saveData('project_status', projectStatus);

      res.json({
        ...scanResult,
        updated_project_status: projectStatus
      });
    })
    .catch(error => {
      console.error('Scan execution failed:', error);
      res.status(500).json({ error: 'Scan execution failed', details: error.message });
    });
});

app.listen(PORT, () => {
  console.log(`OnSafe Backend Server running on port ${PORT}`);
});
