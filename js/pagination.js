const container = document.getElementById('sections-container');

const itemsPerPage = window.itemsPerPage || 10;
let currentPage = window.currentPage || 1;

function renderPage(page) {

  container.innerHTML = "";

  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;

  const pageItems = appointees.slice(start, end);

  pageItems.forEach((person, index) => {

    const globalIndex = start + index;

    const section = document.createElement('section');
    section.className = 'card';

    let html = `
      <h2>Section ${globalIndex + 1}: ${person}</h2>
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

  const totalPages = Math.ceil(appointees.length / itemsPerPage);

  document.getElementById('pageInfo').textContent =
    `Page ${page} of ${totalPages}`;

  document.getElementById('prevBtn').disabled = page === 1;
  document.getElementById('nextBtn').disabled = page === totalPages;
}

function bindPagination() {

  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  if (!prevBtn || !nextBtn) return;

  prevBtn.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      renderPage(currentPage);
    }
  });

  nextBtn.addEventListener('click', () => {
    const totalPages = Math.ceil(appointees.length / itemsPerPage);

    if (currentPage < totalPages) {
      currentPage++;
      renderPage(currentPage);
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {

  renderPage(currentPage);
  bindPagination();

  document.getElementById('totalSections').textContent = appointees.length;
});