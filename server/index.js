/**
 * OnSafe Platform — Mock API Server
 * ─────────────────────────────────
 * A lightweight Express.js REST API serving hardcoded JSON data to simulate
 * the OnSafe "Architecture of Trust" and Two-Sided Marketplace.
 *
 * Run with: node server/index.js   (or `npm run server` after adding the script)
 */

import express from "express";
import cors from "cors";
import { createRequire } from "module";
import path from "path";
import { fileURLToPath } from "url";

// ─── Compatibility helpers (ESM → require for JSON imports) ────────────────
const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ─── Data imports ──────────────────────────────────────────────────────────
const experts = require("./data/experts.json");
const sprints = require("./data/sprints.json");
const vulnerabilities = require("./data/vulnerabilities.json");
const projectStatus = require("./data/project_status.json");

// ─── App setup ─────────────────────────────────────────────────────────────
const app = express();
const PORT = process.env.PORT || 3000;

// ─── Middleware ────────────────────────────────────────────────────────────

/**
 * CORS — allow any localhost origin so the Vite dev server (typically :5173)
 * can fetch freely without browser policy errors.
 */
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (curl, Postman) and any localhost port
      if (!origin || /^http:\/\/localhost(:\d+)?$/.test(origin)) {
        return callback(null, true);
      }
      callback(new Error(`CORS policy: Origin ${origin} not allowed`));
    },
    methods: ["GET", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

/**
 * Latency simulation middleware
 * Adds a realistic 500ms delay to every request so the frontend can demonstrate
 * loading states, skeleton screens, and optimistic UI behaviour.
 *
 * Disable by setting the env var: SKIP_LATENCY=true
 */
app.use((req, res, next) => {
  if (process.env.SKIP_LATENCY === "true") return next();
  setTimeout(next, 500);
});

/**
 * Request logger — prints method, path, and timestamp for every incoming call.
 */
app.use((req, _res, next) => {
  const ts = new Date().toISOString();
  console.log(`  [${ts}]  ${req.method}  ${req.path}`);
  next();
});

// ─── Helper ────────────────────────────────────────────────────────────────

/**
 * Wraps a data payload in a consistent API envelope:
 * { success, timestamp, data, meta? }
 */
function respond(res, data, meta = null) {
  const payload = {
    success: true,
    timestamp: new Date().toISOString(),
    data,
  };
  if (meta) payload.meta = meta;
  res.json(payload);
}

// ─── Routes ────────────────────────────────────────────────────────────────

/** Health check — useful for deployment ping tests */
app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "OnSafe Mock API", port: PORT });
});

/**
 * GET /api/experts
 * Returns the verified security practitioner directory.
 * Optional query params:
 *   ?available=true   → filter to experts whose availability !== "Booked"
 *   ?specialty=<str>  → case-insensitive filter on specialties array
 */
app.get("/api/experts", (req, res) => {
  let result = [...experts];

  const { available, specialty } = req.query;

  if (available === "true") {
    result = result.filter((e) => e.availability !== "Booked");
  }

  if (specialty) {
    const term = specialty.toLowerCase();
    result = result.filter((e) =>
      e.specialties.some((s) => s.toLowerCase().includes(term))
    );
  }

  respond(res, result, {
    total: result.length,
    filters_applied: { available: available ?? null, specialty: specialty ?? null },
  });
});

/**
 * GET /api/experts/:id
 * Returns a single expert by their ID (e.g. EXP-001).
 */
app.get("/api/experts/:id", (req, res) => {
  const expert = experts.find(
    (e) => e.id.toLowerCase() === req.params.id.toLowerCase()
  );

  if (!expert) {
    return res.status(404).json({
      success: false,
      error: `Expert with ID "${req.params.id}" not found.`,
    });
  }

  respond(res, expert);
});

/**
 * GET /api/sprints
 * Returns all Security Sprint Package tiers.
 */
app.get("/api/sprints", (_req, res) => {
  respond(res, sprints, { total: sprints.length });
});

/**
 * GET /api/sprints/:id
 * Returns a single sprint tier by its ID (e.g. SPR-ADVANCED).
 */
app.get("/api/sprints/:id", (req, res) => {
  const sprint = sprints.find(
    (s) => s.id.toLowerCase() === req.params.id.toLowerCase()
  );

  if (!sprint) {
    return res.status(404).json({
      success: false,
      error: `Sprint tier "${req.params.id}" not found.`,
    });
  }

  respond(res, sprint);
});

/**
 * GET /api/dashboard/vulnerabilities
 * Returns all simulated security findings for the active project.
 * Optional query params:
 *   ?severity=Critical|High|Medium|Low   → filter by severity
 *   ?status=Open|In-Progress|Fixed        → filter by remediation status
 */
app.get("/api/dashboard/vulnerabilities", (req, res) => {
  let result = [...vulnerabilities];

  const { severity, status } = req.query;

  if (severity) {
    result = result.filter(
      (v) => v.severity.toLowerCase() === severity.toLowerCase()
    );
  }

  if (status) {
    result = result.filter(
      (v) => v.status.toLowerCase() === status.toLowerCase()
    );
  }

  // Summary counts across the (possibly filtered) result set
  const summary = {
    total: result.length,
    by_severity: {
      critical: result.filter((v) => v.severity === "Critical").length,
      high: result.filter((v) => v.severity === "High").length,
      medium: result.filter((v) => v.severity === "Medium").length,
      low: result.filter((v) => v.severity === "Low").length,
    },
    by_status: {
      open: result.filter((v) => v.status === "Open").length,
      in_progress: result.filter((v) => v.status === "In-Progress").length,
      fixed: result.filter((v) => v.status === "Fixed").length,
    },
  };

  respond(res, result, { ...summary, filters_applied: { severity: severity ?? null, status: status ?? null } });
});

/**
 * GET /api/dashboard/vulnerabilities/:id
 * Returns a single vulnerability finding by vuln_id (e.g. V-102).
 */
app.get("/api/dashboard/vulnerabilities/:id", (req, res) => {
  const vuln = vulnerabilities.find(
    (v) => v.vuln_id.toLowerCase() === req.params.id.toLowerCase()
  );

  if (!vuln) {
    return res.status(404).json({
      success: false,
      error: `Vulnerability "${req.params.id}" not found.`,
    });
  }

  respond(res, vuln);
});

/**
 * GET /api/project/status
 * Returns the current security posture and sprint progress for the active project.
 */
app.get("/api/project/status", (_req, res) => {
  respond(res, projectStatus);
});

// ─── 404 handler ───────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: `Route "${req.method} ${req.path}" not found on this server.`,
    available_routes: [
      "GET /health",
      "GET /api/experts",
      "GET /api/experts/:id",
      "GET /api/sprints",
      "GET /api/sprints/:id",
      "GET /api/dashboard/vulnerabilities",
      "GET /api/dashboard/vulnerabilities/:id",
      "GET /api/project/status",
    ],
  });
});

// ─── Global error handler ──────────────────────────────────────────────────
app.use((err, _req, res, _next) => {
  console.error("[Server Error]", err.message);
  res.status(500).json({ success: false, error: "Internal server error." });
});

// ─── Start ─────────────────────────────────────────────────────────────────
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
  console.log("    GET  /api/sprints");
  console.log("    GET  /api/sprints/:id");
  console.log("    GET  /api/dashboard/vulnerabilities");
  console.log("    GET  /api/dashboard/vulnerabilities/:id");
  console.log("    GET  /api/project/status");
  console.log("");
});
