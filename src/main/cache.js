const CACHE_KEY = 'csvData'; // Key to store data in local storage
const CACHE_EXPIRY = 5 * 60 * 1000; // 5 minutes (adjust as needed)

function getCachedData() {
    const cachedData = localStorage.getItem(CACHE_KEY);
    const cachedTime = localStorage.getItem(CACHE_KEY + '_time');

    // Check if there is valid data in the cache
    if (cachedData && cachedTime && (Date.now() - cachedTime < CACHE_EXPIRY)) {
        console.log('Using cached data');
        return JSON.parse(cachedData);
    }
    return null; // No valid data in cache
}

function setCachedData(data) {
    // Store data in local storage
    localStorage.setItem(CACHE_KEY, JSON.stringify(data));
    localStorage.setItem(CACHE_KEY + '_time', Date.now());
}

// Function to clear cache
function clearCache() {
    localStorage.removeItem(CACHE_KEY);
    localStorage.removeItem(CACHE_KEY + '_time');
    console.log('Cache cleared');
}

// Example usage to clear cache before fetching new data
async function fetchCSV() {
    clearCache(); // Uncomment this line to clear cache every time before fetching

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
