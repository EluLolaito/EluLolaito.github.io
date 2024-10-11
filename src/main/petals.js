const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const petals = [];

class Petal {
    constructor() {
        this.x = Math.random() * canvas.width; // Vị trí ngẫu nhiên trên canvas
        this.y = Math.random() * canvas.height - canvas.height; // Bắt đầu từ trên
        this.size = Math.random() * 15 + 5; // Kích thước ngẫu nhiên
        this.speedY = Math.random() * 1 + 0.5; // Tốc độ rơi
        this.speedX = (Math.random() - 0.5) * 2; // Tốc độ ngang
        this.angle = Math.random() * Math.PI * 2; // Góc quay
    }

    update() {
        this.y += this.speedY; // Cập nhật vị trí y
        this.x += this.speedX; // Cập nhật vị trí x

        // Khi cánh hoa rơi xuống dưới canvas, đưa nó trở về trên
        if (this.y > canvas.height) {
            this.y = -this.size;
            this.x = Math.random() * canvas.width;
        }
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.fillStyle = '#FF69B4'; // Màu cánh hoa
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(-this.size / 2, -this.size / 2, this.size / 2, -this.size / 2, 0, 0);
        ctx.bezierCurveTo(this.size / 2, this.size / 2, -this.size / 2, this.size / 2, 0, 0);
        ctx.fill();
        ctx.restore();
    }
}

function createPetals() {
    for (let i = 0; i < 60; i++) { // Tạo 60 cánh hoa
        petals.push(new Petal());
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Xóa canvas
    petals.forEach(petal => {
        petal.update();
        petal.draw();
    });
    requestAnimationFrame(animate); // Gọi lại hàm animate
}

createPetals(); // Tạo cánh hoa
animate(); // Bắt đầu hoạt động
