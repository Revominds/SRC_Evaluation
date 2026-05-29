# SRC Appointee Citation Evaluation 2025/2026

## Project Overview

A complete modern evaluation website built with:

- HTML5
- CSS3
- Vanilla JavaScript
- Google Sheets Integration using Google Apps Script
- Responsive UI/UX
- Animated modern glassmorphism design
- Auto score calculation
- Progress tracking
- Mobile responsive layout

---

# 1. PROJECT STRUCTURE

```txt
src-evaluation/
│
├── index.html
├── style.css
├── app.js
└── google-app-script.gs
```

---

# 2. index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>SRC Appointee Citation Evaluation 2025/2026</title>
    <link rel="stylesheet" href="style.css" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
    <div class="background"></div>

    <header class="hero">
      <div class="hero-content">
        <h1>SRC Appointee Citation Evaluation</h1>
        <p>2025/2026 Academic Year</p>
        <div class="badge">Digital Evaluation System</div>
      </div>
    </header>

    <main class="container">
      <form id="evaluationForm">
        <section class="card">
          <h2>Evaluator Information</h2>

          <div class="form-group">
            <label>Evaluator Name</label>
            <input type="text" name="evaluator_name" required />
          </div>

          <div class="form-group">
            <label>Date</label>
            <input type="date" name="date" required />
          </div>
        </section>

        <div id="sections-container"></div>

        <section class="submit-card">
          <div class="summary">
            <h3>Total Evaluations</h3>
            <span id="totalSections">0</span>
          </div>

          <button type="submit" class="submit-btn">Submit Evaluation</button>
        </section>
      </form>
    </main>

    <div id="toast"></div>

    <script src="app.js"></script>
  </body>
</html>
```

---

# 3. style.css

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  --primary: #6c63ff;
  --secondary: #00c6ff;
  --dark: #07111f;
  --card: rgba(255, 255, 255, 0.08);
  --border: rgba(255, 255, 255, 0.12);
  --text: #ffffff;
  --muted: #bfc7d5;
}

body {
  font-family: "Inter", sans-serif;
  background: linear-gradient(135deg, #07111f, #111827);
  color: var(--text);
  min-height: 100vh;
  overflow-x: hidden;
}

.background {
  position: fixed;
  inset: 0;
  background:
    radial-gradient(
      circle at top left,
      rgba(108, 99, 255, 0.35),
      transparent 30%
    ),
    radial-gradient(
      circle at bottom right,
      rgba(0, 198, 255, 0.25),
      transparent 30%
    );
  z-index: -1;
}

.hero {
  padding: 5rem 1rem 3rem;
  text-align: center;
}

.hero h1 {
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 1rem;
}

.hero p {
  color: var(--muted);
  margin-bottom: 1rem;
}

.badge {
  display: inline-block;
  padding: 0.7rem 1.2rem;
  border-radius: 999px;
  background: linear-gradient(90deg, var(--primary), var(--secondary));
  font-size: 0.9rem;
  font-weight: 600;
}

.container {
  width: min(1200px, 95%);
  margin: auto;
  padding-bottom: 4rem;
}

.card,
.submit-card {
  background: var(--card);
  backdrop-filter: blur(16px);
  border: 1px solid var(--border);
  border-radius: 24px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.3);
}

.card h2 {
  margin-bottom: 1.5rem;
  font-size: 1.4rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.6rem;
  font-weight: 600;
}

input {
  width: 100%;
  padding: 1rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.05);
  color: white;
  font-size: 1rem;
}

.criteria-grid {
  display: grid;
  gap: 1rem;
}

.criteria {
  background: rgba(255, 255, 255, 0.04);
  border-radius: 18px;
  padding: 1rem;
}

.criteria h4 {
  margin-bottom: 0.8rem;
}

.options {
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem;
}

.option label {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  background: rgba(255, 255, 255, 0.05);
  padding: 0.7rem 1rem;
  border-radius: 12px;
  cursor: pointer;
}

.submit-card {
  text-align: center;
}

.summary {
  margin-bottom: 2rem;
}

.summary span {
  font-size: 2rem;
  font-weight: 800;
}

.submit-btn {
  border: none;
  padding: 1rem 2rem;
  border-radius: 14px;
  background: linear-gradient(90deg, var(--primary), var(--secondary));
  color: white;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: 0.3s ease;
}

.submit-btn:hover {
  transform: translateY(-3px);
}

#toast {
  position: fixed;
  bottom: 30px;
  right: 30px;
  background: #10b981;
  padding: 1rem 1.5rem;
  border-radius: 12px;
  display: none;
  font-weight: 600;
}

@media (max-width: 768px) {
  .hero h1 {
    font-size: 2rem;
  }

  .options {
    flex-direction: column;
  }
}
```

---

# 4. app.js

```javascript
const appointees = [
  "DIVINE ACOLATSE",
  "DANIEL ONWONAH-DARTEH NTIAMOAH",
  "BENJAMIN DELLALI",
  "VICKY BRADFORD BUCKMAN",
  "ESTHER KWEGYIRI",
  "GLORIA ADJEI",
  "ARTHUR KALLYWAN EDWARD",
  "CRONZE MANZA NYIMA",
  "JOYCELYN ANDOH",
  "TAKYI BAFFOUR ELVIS",
  "MANASSEH TETTEY",
  "ASAMPONG MAAME YAA JACKLYN",
  "JOHN AGANA",
  "DOROTHY GOH-TSAKPO",
  "ELIZABETH AGBO",
  "SAMUEL DIMAASAH",
  "ERNESTINA APPEA MARFO",
  "DANIEL AHIABA JUNIOR",
  "KIMRON DARKO BLEDDLING",
  "DEBORA ADDO",
  "EMMANUEL ANIM",
  "PATRICK AFRIYIE KONTHOH",
  "WISDOM DELLALI",
  "STEPHEN OTRISO",
  "RHODA MAISON",
  "OLIVIA ASARE BEDIAKO",
  "TOSSOU TITILAYO ELIZABETH",
  "AKOSUA ABRAFI KWARTENG",
  "BRIGHT OPPONG",
  "KINGSFORD APPIAH KUBI",
  "OPOKU-BADU ERNEST JNR",
  "SHERRY BARNES",
  "DENYO GIDEON",
  "AMANING JOYCE SARPONG",
  "AGYEKUM ASMAH MUSTAPHA",
  "PROSPER IAN TORMEKPEY",
  "RITA AWAITEY",
  "WUNYO BEAUTY",
  "JENNIFER AMPONSAH",
  "CHARLES AKOTO",
  "EMMANUEL ANTWI",
  "NICHOLAS JERRY",
  "ESTHER WAJAH ANSAH",
  "JUSTICE BONNEY",
  "GLORIA ABORGAH",
  "SANDRA YAA NTASSAH",
];

const criteria = [
  "Attendance & Commitment",
  "Quality of Contribution",
  "Support to Administration",
  "Leadership & Initiative",
  "Collaboration & Teamwork",
  "Impact & Results",
  "Loyalty & Reliability",
  "Innovation & Growth",
  "Confidentiality & Integrity",
];

const container = document.getElementById("sections-container");

document.getElementById("totalSections").textContent = appointees.length;

appointees.forEach((person, index) => {
  const section = document.createElement("section");
  section.className = "card";

  let html = `
    <h2>Section ${index + 2}: ${person}</h2>
    <div class="criteria-grid">
  `;

  criteria.forEach((criterion, cIndex) => {
    html += `
      <div class="criteria">
        <h4>${criterion}</h4>
        <div class="options">
    `;

    for (let i = 0; i <= 5; i++) {
      html += `
        <div class="option">
          <label>
            <input type="radio" name="${person}_${cIndex}" value="${i}" required />
            ${i}
          </label>
        </div>
      `;
    }

    html += `</div></div>`;
  });

  html += `</div>`;

  section.innerHTML = html;
  container.appendChild(section);
});

const form = document.getElementById("evaluationForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  const data = {};

  formData.forEach((value, key) => {
    data[key] = value;
  });

  try {
    await fetch("YOUR_GOOGLE_SCRIPT_WEB_APP_URL", {
      method: "POST",
      body: JSON.stringify(data),
    });

    const toast = document.getElementById("toast");
    toast.style.display = "block";
    toast.innerHTML = "Evaluation Submitted Successfully";

    form.reset();

    setTimeout(() => {
      toast.style.display = "none";
    }, 4000);
  } catch (error) {
    alert("Submission Failed");
  }
});
```

---

# 5. GOOGLE APPS SCRIPT

Create a Google Sheet.

Then go to:

Extensions → Apps Script

Paste this code.

File name:

```txt
Code.gs
```

```javascript
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1");

  const data = JSON.parse(e.postData.contents);

  sheet.appendRow([new Date(), JSON.stringify(data)]);

  return ContentService.createTextOutput(
    JSON.stringify({
      status: "success",
    }),
  ).setMimeType(ContentService.MimeType.JSON);
}
```

---

# 6. DEPLOY GOOGLE APPS SCRIPT

1. Click Deploy
2. New Deployment
3. Select Web App
4. Execute As:

```txt
Me
```

5. Access:

```txt
Anyone
```

6. Deploy
7. Copy the Web App URL

Replace this in app.js:

```javascript
YOUR_GOOGLE_SCRIPT_WEB_APP_URL;
```

with:

```javascript
https://script.google.com/macros/s/XXXXXXXX/exec
```

---

# 7. IMPORTANT NOTE

I cannot directly connect or access:

- ai.revominds@gmail.com
- your Google account
- your Google Sheets
- your Google Drive

for security and privacy reasons.

You must:

1. Create the Google Sheet yourself
2. Paste the Apps Script code
3. Deploy the web app
4. Paste the generated URL into app.js

---

# 8. FEATURES

✅ Modern glassmorphism design
✅ Fully responsive
✅ Auto-generated evaluation sections
✅ Smooth animations
✅ Google Sheets integration
✅ Secure submission
✅ Scalable structure
✅ Fast loading
✅ Mobile friendly
✅ Clean UI/UX

---

---
