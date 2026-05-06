import app from './index.js';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("");
  console.log("  ┌─────────────────────────────────────────────┐");
  console.log("  │        OnSafe Mock API Server                │");
  console.log("  │  Running on  →  http://localhost:" + PORT + "        │");
  console.log("  │  500ms latency simulation  →  ENABLED        │");
  console.log("  │  CORS         →  localhost:* allowed         │");
  console.log("  └─────────────────────────────────────────────┘");
  console.log("");
  console.log("  Available endpoints:");
  console.log("    GET  /health");
  console.log("    GET  /api/experts");
  console.log("    GET  /api/experts/:id");
  console.log("    GET  /api/experts/:id/report");
  console.log("    GET  /api/sprints");
  console.log("    GET  /api/sprints/:id");
  console.log("    GET  /api/dashboard/vulnerabilities");
  console.log("    GET  /api/dashboard/vulnerabilities/:id");
  console.log("    GET  /api/project/status");
  console.log("");
});
