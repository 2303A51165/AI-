const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// ✅ Serve frontend files
app.use(express.static(path.join(__dirname, "public")));

// ✅ Home route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});


// 🔹 Analyze Job
app.post("/analyze", (req, res) => {
  const { description } = req.body;

  if (!description) {
    return res.status(400).json({ error: "Job description required" });
  }

  let riskScore = 0;
  const reasons = [];

  const keywords = [
    "earn money fast",
    "no experience",
    "urgent hiring",
    "registration fee",
    "work from home",
    "guaranteed income"
  ];

  keywords.forEach(k => {
    if (description.toLowerCase().includes(k)) {
      riskScore++;
      reasons.push(`Contains keyword: ${k}`);
    }
  });

  let riskLevel = "Low";
  if (riskScore >= 3) riskLevel = "High";
  else if (riskScore >= 1) riskLevel = "Medium";

  res.json({ riskLevel, reasons });
});


// 🔹 Company Check
app.get("/company/:name", (req, res) => {
  const companyName = req.params.name.toLowerCase();

  const trustedCompanies = ["google", "amazon", "tcs", "microsoft"];

  const status = trustedCompanies.includes(companyName)
    ? "Verified"
    : "Unknown";

  res.json({ companyName, status });
});


// 🔹 Report Scam
app.post("/report", (req, res) => {
  const { name, email, company, description } = req.body;

  if (!name || !email || !company || !description) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const report = {
    name,
    email,
    company,
    description,
    date: new Date()
  };

  console.log("Report received:", report);

  res.json({
    message: "Report submitted successfully",
    report
  });
});


// ✅ START SERVER + SHOW LINK
app.listen(PORT, () => {
  console.log("🚀 Server running on port 3000");
  console.log("👉 Open in browser: http://localhost:3000");
});