// Function to load data rows for the current page
function loadRows() {
    const loadingIndicator = document.getElementById('loading');
    loadingIndicator.style.display = 'block';

    const start = (currentPage - 1) * maxRows;
    const end = start + maxRows;

    // Get data for the current page
    const rowsToLoad = data.slice(start, end);
    const tableBody = document.getElementById('music-table-body');
    tableBody.innerHTML = ''; // Clear old rows

    rowsToLoad.forEach(row => {
        if (!row) return; // Skip if no data
        const tr = document.createElement('tr');

        const tdRow = document.createElement('td');
        const tdName = document.createElement('td');
        const tdAuthor = document.createElement('td');
        const tdLanguage = document.createElement('td');
        const tdLength = document.createElement('td');
        const tdInstrument = document.createElement('td');
        const tdMajor = document.createElement('td');
        const tdBpm = document.createElement('td');
        const tdLastUpdated = document.createElement('td');

        const nameLink = document.createElement('a');
        nameLink.href = row.link;
        nameLink.textContent = row.name;
        nameLink.target = '_blank';
        nameLink.className = 'link-name';

        tdRow.textContent = row.rowNumber;
        tdName.appendChild(nameLink);
        tdAuthor.textContent = row.author;
        tdLanguage.textContent = row.language;
        tdLength.textContent = row.length;
        tdInstrument.textContent = row.instrument;
        tdMajor.textContent = row.major;
        tdBpm.textContent = row.bpm;
        tdLastUpdated.textContent = row.lastUpdated;

        tr.appendChild(tdRow);
        tr.appendChild(tdName);
        tr.appendChild(tdAuthor);
        tr.appendChild(tdLanguage);
        tr.appendChild(tdLength);
        tr.appendChild(tdInstrument);
        tr.appendChild(tdMajor);
        tr.appendChild(tdBpm);
        tr.appendChild(tdLastUpdated);

        tableBody.appendChild(tr);
    });

    updatePagination(); // Update pagination info
    loadingIndicator.style.display = 'none';
}

// Function to update pagination buttons and info
function updatePagination() {
    const pageInfo = document.getElementById('pageInfo');
    const prevPageButton = document.getElementById('prevPage');
    const nextPageButton = document.getElementById('nextPage');

    const totalPages = Math.ceil(data.length / maxRows); // Calculate total pages
    pageInfo.textContent = `Page ${currentPage} of ${totalPages}`; // Update page info
    prevPageButton.disabled = currentPage === 1;
    nextPageButton.disabled = (currentPage * maxRows) >= data.length;
}

// Function to handle page change
function changePage(direction) {
    if (direction === 'next' && (currentPage * maxRows) < data.length) {
        currentPage++;
    } else if (direction === 'prev' && currentPage > 1) {
        currentPage--;
    }
    loadRows(); // Reload data for new page
}

// Add event listeners for pagination buttons
document.getElementById('nextPage').addEventListener('click', () => changePage('next'));
document.getElementById('prevPage').addEventListener('click', () => changePage('prev'));

// Search functionality
document.getElementById('searchInput').addEventListener('input', function() {
    const searchValue = this.value.toLowerCase();
    const rows = document.querySelectorAll('#music-table-body tr');
    rows.forEach(row => {
        const name = row.querySelector('td:nth-child(2)').textContent.toLowerCase();
        const author = row.querySelector('td:nth-child(3)').textContent.toLowerCase();
        row.style.display = (name.includes(searchValue) || author.includes(searchValue)) ? '' : 'none';
    });
});
