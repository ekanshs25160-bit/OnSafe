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

// ─── Data imports (ESM-compatible .js modules for Vercel bundler) ──────────
import expertsData from "./data/experts.js";
import sprintsData from "./data/sprints.js";
import vulnerabilitiesData from "./data/vulnerabilities.js";
import projectStatusData from "./data/project_status.js";
import expertReportsData from "./data/expert_reports.js";

const experts = expertsData;
const sprints = sprintsData;
const vulnerabilities = vulnerabilitiesData;
const projectStatus = projectStatusData;
const expertReports = expertReportsData;

// ─── App setup ─────────────────────────────────────────────────────────────
const app = express();
const PORT = process.env.PORT || 3000;

// ─── Middleware ────────────────────────────────────────────────────────────

/**
 * CORS — allow any localhost origin so the Vite dev server (typically :5173)
 * can fetch freely without browser policy errors.
 * In production (Vercel), allow the deployed frontend domain and all origins.
 */
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (curl, Postman) and any localhost port
      if (!origin || /^http:\/\/localhost(:\d+)?$/.test(origin)) {
        return callback(null, true);
      }
      // Allow any HTTPS origin in production (covers Vercel preview & prod domains)
      if (/^https:\/\//.test(origin)) {
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

// ─── Router (mount at both /api and / for Vercel compatibility) ──────────────
const router = express.Router();

/** Health check — useful for deployment ping tests */
router.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "OnSafe Mock API", port: PORT });
});

/**
 * GET /experts
 * Returns the verified security practitioner directory.
 */
router.get("/experts", (req, res) => {
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
 * GET /experts/:id
 * Returns a single expert by their ID (e.g. EXP-001).
 */
router.get("/experts/:id", (req, res) => {
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
 * GET /sprints
 * Returns all Security Sprint Package tiers.
 */
router.get("/sprints", (_req, res) => {
  respond(res, sprints, { total: sprints.length });
});

/**
 * GET /sprints/:id
 * Returns a single sprint tier by its ID (e.g. SPR-ADVANCED).
 */
router.get("/sprints/:id", (req, res) => {
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
 * GET /experts/:id/report
 * Returns the standardized security report metadata for a specific expert.
 */
router.get("/experts/:id/report", (req, res) => {
  const expertId = req.params.id.toUpperCase();
  const report = expertReports[expertId];

  if (!report) {
    return res.status(404).json({
      success: false,
      error: `No report found for expert ID "${expertId}".`,
    });
  }

  const expertFindings = vulnerabilities.filter(v => v.assigned_expert_id === expertId);
  
  respond(res, {
    ...report,
    findings: expertFindings
  });
});

/**
 * GET /dashboard/vulnerabilities
 * Returns all simulated security findings for the active project.
 */
router.get("/dashboard/vulnerabilities", (req, res) => {
  let result = [...vulnerabilities];

  const { severity, status, expert_id } = req.query;

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

  if (expert_id) {
    result = result.filter(
      (v) => v.assigned_expert_id.toLowerCase() === expert_id.toLowerCase()
    );
  }

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

  respond(res, result, { ...summary, filters_applied: { severity: severity ?? null, status: status ?? null, expert_id: expert_id ?? null } });
});

/**
 * GET /dashboard/vulnerabilities/:id
 * Returns a single vulnerability finding by vuln_id (e.g. V-102).
 */
router.get("/dashboard/vulnerabilities/:id", (req, res) => {
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
 * GET /project/status
 * Returns the current security posture and sprint progress for the active project.
 */
router.get("/project/status", (_req, res) => {
  respond(res, projectStatus);
});

// Mount router at both /api (local dev with proxy) and / (Vercel serverless)
app.use("/api", router);
app.use("/", router);

// ─── 404 handler ───────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: `Route "${req.method} ${req.path}" not found on this server.`,
    available_routes: [
      "GET /health",
      "GET /api/experts",
      "GET /api/experts/:id",
      "GET /api/experts/:id/report",
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

// ─── Export for serverless (Vercel) and local dev ────────────────────────────
export default app;
