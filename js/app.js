const container = document.getElementById('sections-container');

if (!container) {
  console.error('sections-container not found');
}

document.getElementById('totalSections').textContent = appointees.length;

appointees.forEach((person, index) => {

  const section = document.createElement('section');
  section.className = 'card';

  let html = `
    <h2>Section ${index + 1}: ${person}</h2>
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
        <label class="option-label">
          <input type="radio" name="${person}_${cIndex}" value="${i}" required />
          <span>${i}</span>
        </label>
      `;
    }

    html += `</div></div>`;
  });

  html += `</div>`;

  section.innerHTML = html;
  container.appendChild(section);
});

const form = document.getElementById('evaluationForm');

form.addEventListener('submit', async (e) => {

  e.preventDefault();

  const formData = new FormData(form);

  const data = {};

  formData.forEach((value, key) => {
    data[key] = value;
  });

  try {

    await fetch(
      'https://script.google.com/macros/s/AKfycbxbv3bUL-H0yp343ddcLci1EkhHBkgkBeUx5fhkpYIKJZF_oSx0rIs8Ik8EJZ43dC1U/exec',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }
    );

    const toast = document.getElementById('toast');

    toast.style.display = 'block';
    toast.innerHTML = 'Evaluation Submitted Successfully';

    form.reset();

    setTimeout(() => {
      toast.style.display = 'none';
    }, 4000);

  } catch (error) {

    console.error(error);
    alert('Submission Failed');
  }
});

