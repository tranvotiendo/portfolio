// --- BACKGROUND ANIMATION (Floating Syntax) ---
// (Giữ nguyên đoạn code Background cũ của bạn ở đây)
const canvas = document.getElementById('canvas-bg');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const symbols = ['{ }', '<div>', '/>', '&&', '||', '!=', 'const', 'let', 'var', 'if', 'return', '()', '=>', ';', '$', '#', '[]', 'print'];
let particlesArray;
let mouse = { x: null, y: null, radius: 150 }
window.addEventListener('mousemove', (event) => { mouse.x = event.x; mouse.y = event.y; });
class Particle {
    constructor(x, y, size, color, text) {
        this.x = x; this.y = y; this.size = size; this.color = color; this.text = text;
        this.directionX = (Math.random() * 1) - 0.5; this.directionY = (Math.random() * 1) - 0.5;
        this.angle = Math.random() * 360; this.spin = Math.random() < 0.5 ? 1 : -1;
    }
    draw() {
        ctx.save(); ctx.translate(this.x, this.y); ctx.rotate(this.angle * Math.PI / 180);
        ctx.font = this.size + 'px monospace'; ctx.fillStyle = this.color;
        ctx.fillText(this.text, -this.size/2, this.size/2); ctx.restore();
    }
    update() {
        if (this.x > canvas.width || this.x < 0) this.directionX = -this.directionX;
        if (this.y > canvas.height || this.y < 0) this.directionY = -this.directionY;
        let dx = mouse.x - this.x; let dy = mouse.y - this.y; let distance = Math.sqrt(dx*dx + dy*dy);
        if (distance < mouse.radius) { this.x -= (dx/distance) * 2; this.y -= (dy/distance) * 2; } 
        else { this.x += this.directionX; this.y += this.directionY; }
        this.angle += this.spin * 0.5; this.draw();
    }
}
function init() {
    particlesArray = []; let numberOfParticles = (canvas.height * canvas.width) / 15000;
    for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 15) + 10; let x = (Math.random() * innerWidth); let y = (Math.random() * innerHeight);
        let text = symbols[Math.floor(Math.random() * symbols.length)];
        let color = 'rgba(56, 189, 248, ' + (Math.random() * 0.5 + 0.1) + ')';
        particlesArray.push(new Particle(x, y, size, color, text));
    }
}
function animate() { requestAnimationFrame(animate); ctx.clearRect(0, 0, innerWidth, innerHeight); for (let i = 0; i < particlesArray.length; i++) { particlesArray[i].update(); } }
window.addEventListener('resize', () => { canvas.width = innerWidth; canvas.height = innerHeight; init(); });
init(); animate();


// --- TAB SWITCHING LOGIC ---
const navBtns = document.querySelectorAll('.nav-btn');
const tabSections = document.querySelectorAll('.tab-section');

// Hàm chuyển tab
function switchTab(targetId) {
    // Xóa active cũ
    navBtns.forEach(b => b.classList.remove('active'));
    tabSections.forEach(section => section.classList.remove('active'));

    // Active mới
    document.querySelector(`[data-target="${targetId}"]`).classList.add('active');
    document.getElementById(targetId).classList.add('active');
}

navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-target');
        switchTab(targetId);
    });
});

// Logic cho nút "Contact Me" ở Sidebar trái
const contactBtnSide = document.getElementById('btn-contact-me');
if(contactBtnSide) {
    contactBtnSide.addEventListener('click', () => {
        switchTab('contact');
    });
}