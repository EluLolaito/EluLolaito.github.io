const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const cellSize = 2; // Smaller size for sakura shape
const rows = Math.floor(window.innerHeight / cellSize);
const cols = Math.floor(window.innerWidth / cellSize);

let grid = createGrid(rows, cols);

// Create an initial random grid with sakura shapes
function createGrid(rows, cols) {
    const grid = [];
    for (let y = 0; y < rows; y++) {
        const row = [];
        for (let x = 0; x < cols; x++) {
            row.push(Math.random() < 0.1 ? 1 : 0); // 10% chance of being alive (sakura)
        }
        grid.push(row);
    }
    return grid;
}

function drawGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas for redrawing
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            if (grid[y][x] === 1) {
                drawSakura(x * cellSize, y * cellSize); // Draw sakura shape
            }
        }
    }
}

function drawSakura(x, y) {
    ctx.fillStyle = '#ff6f91'; // Pink color for sakura
    ctx.beginPath();
    ctx.moveTo(x + cellSize / 2, y); // Top point
    ctx.bezierCurveTo(x + cellSize * 0.7, y + cellSize * 0.2, x + cellSize * 0.7, y + cellSize, x + cellSize / 2, y + cellSize); // Right curve
    ctx.bezierCurveTo(x, y + cellSize, x, y + cellSize * 0.2, x + cellSize / 2, y); // Left curve
    ctx.fill(); // Fill the sakura shape
}

function updateGrid() {
    const newGrid = createGrid(rows, cols);

    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            const neighbors = countNeighbors(x, y);
            if (grid[y][x] === 1) {
                newGrid[y][x] = neighbors === 2 || neighbors === 3 ? 1 : 0; // Survival rule
            } else {
                newGrid[y][x] = neighbors === 3 ? 1 : 0; // Birth rule
            }
        }
    }

    grid = newGrid;
}

function countNeighbors(x, y) {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) continue; // Skip the cell itself
            const newX = x + j;
            const newY = y + i;
            if (newX >= 0 && newY >= 0 && newX < cols && newY < rows) {
                count += grid[newY][newX]; // Count alive neighbors
            }
        }
    }
    return count;
}

function animate() {
    drawGrid();
    updateGrid();
    requestAnimationFrame(animate);
}

// Resize canvas to fit the window
canvas.width = cols * cellSize;
canvas.height = rows * cellSize;

// Start animation
animate();
