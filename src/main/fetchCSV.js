let data = []; // Array to hold CSV data
let currentPage = 1; // Current page
const maxRows = 50; // Maximum rows to display
const url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSJStygYg3TxUHIpPxTQj7mDP_hk9o7X4neM4pI0Cy3WnMKuCokGSc63Mt-3_gyI8rzPmJ63jRLxNyY/pub?gid=0&single=true&output=csv"; // CSV URL

// Function to fetch CSV data
async function fetchCSV() {
    const cachedData = getCachedData(); // Check for cached data

    if (cachedData) {
        data = cachedData; // Use cached data
        loadRows(); // Load first rows after parsing
    } else {
        const response = await fetch(url);
        const dataString = await response.text();
        parseCSV(dataString); // Parse data from CSV
    }
}

// Function to parse CSV data
function parseCSV(dataString) {
    const rows = dataString.split('\n').slice(1); // Remove header row
    data = rows.map(row => {
        const columns = row.split(',');
        return {
            rowNumber: columns[0],
            name: columns[1],
            author: columns[2],
            language: columns[3],
            length: columns[4],
            instrument: columns[5],
            major: columns[6],
            bpm: columns[7],
            link: columns[8],
            lastUpdated: columns[9],
        };
    });
    setCachedData(data); // Store parsed data in cache
    loadRows(); // Load first rows after parsing
}
