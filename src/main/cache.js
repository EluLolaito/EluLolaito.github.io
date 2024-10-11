const CACHE_KEY = 'csvData'; // Key to store data in local storage
const CACHE_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours

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
