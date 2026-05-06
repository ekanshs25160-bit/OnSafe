export const sprints = [
  {
    "id": "SPR-ESSENTIAL",
    "tier_name": "Essential",
    "tagline": "Security foundations for idea-stage startups",
    "price": 5000,
    "currency": "INR",
    "price_display": "₹5,000",
    "estimated_duration": "3–5 business days",
    "description": "A focused security health-check covering the critical vulnerabilities that kill early-stage deals. Ideal for pre-seed founders preparing for their first investor or enterprise conversation.",
    "features": [
      "OWASP Top 10 vulnerability scan",
      "Authentication & session management review",
      "Basic dependency audit (npm/pip/gem)",
      "One-page executive summary report",
      "30-min expert debrief call",
      "Remediation priority list (founder-readable)"
    ],
    "deliverables": ["PDF Security Report", "Priority Fix List", "30-min Call Recording"],
    "best_for": "Pre-seed / Idea Stage",
    "badge_color": "#4ade80",
    "popular": false
  },
  {
    "id": "SPR-ADVANCED",
    "tier_name": "Advanced",
    "tagline": "Investor-ready security posture for seed-stage MVPs",
    "price": 50000,
    "currency": "INR",
    "price_display": "₹50,000",
    "estimated_duration": "7–10 business days",
    "description": "A deep-dive security assessment of your full MVP stack. Covers API security, cloud configuration, and data handling — everything a Series A investor's technical due diligence will probe.",
    "features": [
      "Everything in Essential",
      "Full API endpoint penetration test",
      "Cloud IAM & secrets audit (AWS/GCP/Azure)",
      "Data encryption & storage review",
      "SAST/DAST automated scanning",
      "Detailed vulnerability report with CVSS scores",
      "Two expert revision rounds",
      "NDA-protected engagement"
    ],
    "deliverables": ["Full Penetration Test Report", "Cloud Audit Findings", "CVSS-Scored Vuln List", "2× Revision Rounds"],
    "best_for": "Seed Stage / Pre-Series A",
    "badge_color": "#818cf8",
    "popular": true
  },
  {
    "id": "SPR-FULL-MVP",
    "tier_name": "Full MVP Shield",
    "tagline": "Enterprise-grade security certification for your product",
    "price": 150000,
    "currency": "INR",
    "price_display": "₹1,50,000",
    "estimated_duration": "15–20 business days",
    "description": "A comprehensive security engagement designed to make your startup enterprise-sale ready. Includes full remediation support, a security roadmap, and a shareable Trust Report you can provide to enterprise clients and investors.",
    "features": [
      "Everything in Advanced",
      "Full compliance gap analysis (SOC 2 / GDPR / ISO 27001)",
      "Manual code review of critical auth paths",
      "Threat modeling workshop (2 sessions)",
      "Secure SDLC recommendations",
      "Post-remediation re-test included",
      "Shareable OnSafe Trust Certificate",
      "Dedicated expert for full engagement duration",
      "Priority Slack access to assigned expert"
    ],
    "deliverables": [
      "Full Security Assessment Report",
      "Compliance Gap Analysis",
      "Threat Model Document",
      "Re-test Sign-off",
      "OnSafe Trust Certificate (PDF + Badge)"
    ],
    "best_for": "Series A+ / Enterprise-Ready",
    "badge_color": "#f59e0b",
    "popular": false
  }
];
