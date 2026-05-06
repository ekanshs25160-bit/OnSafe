// Vercel serverless function entrypoint for the OnSafe API
// This re-exports the Express app from server/index.js so Vercel can serve it.

import app from "../server/index.js";

export default app;
