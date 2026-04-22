async function analyzeJob() {
  const description = document.getElementById("job-description").value;

  try {
    const response = await fetch("http://localhost:3000/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ description })
    });

    const data = await response.json();
    displayResult(data);

  } catch (error) {
    document.getElementById("job-result").innerText =
      "Error analyzing job description";
  }
}

function displayResult(data) {
  const { riskLevel, reasons } = data;

  let className = "low-risk";
  if (riskLevel === "High") className = "high-risk";
  else if (riskLevel === "Medium") className = "medium-risk";

  document.getElementById("job-result").innerHTML = `
    <p class="${className}">Risk Level: ${riskLevel}</p>
    <ul>${reasons.map(r => `<li>${r}</li>`).join("")}</ul>
  `;
}

// Company Check
async function verifyCompany() {
  const companyName = document.getElementById("company-name").value;

  try {
    const response = await fetch(`http://localhost:3000/company/${companyName}`);
    const data = await response.json();

    document.getElementById("company-result").innerText =
      `Company Status: ${data.status}`;

  } catch (error) {
    document.getElementById("company-result").innerText =
      "Error verifying company";
  }
}

// Report Scam
async function reportScam() {
  const name = document.getElementById("report-name").value;
  const email = document.getElementById("report-email").value;
  const company = document.getElementById("report-company").value;
  const description = document.getElementById("report-description").value;

  try {
    const response = await fetch("http://localhost:3000/report", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email, company, description })
    });

    const data = await response.json();

    document.getElementById("report-result").innerText =
      data.message;

  } catch (error) {
    document.getElementById("report-result").innerText =
      "Error submitting report";
  }
}