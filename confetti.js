const canvas = document.getElementById("confettiCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let confettiPieces = [];
let confettiActive = false;

function createConfetti() {
    confettiPieces = [];
    for (let i = 0; i < 50; i++) {
        confettiPieces.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            r: Math.random() * 4 + 2,
            d: Math.random() * 100 + 50,
            color: `hsl(${Math.random() * 360}, 80%, 60%)`,
            tilt: Math.random() * 10 - 10,
            tiltAngleIncrement: Math.random() * 0.05 + 0.02
        });
    }
}

function drawConfetti() {
    if (!confettiActive) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confettiPieces.forEach(p => {
        ctx.beginPath();
        ctx.lineWidth = p.r / 2;
        ctx.strokeStyle = p.color;
        ctx.moveTo(p.x + p.tilt + p.r / 4, p.y);
        ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 4);
        ctx.stroke();

        p.tilt += p.tiltAngleIncrement;
        p.y += (Math.cos(p.d) + 3 + p.r / 2) / 2;
        if (p.y > canvas.height) {
            p.y = -10;
            p.x = Math.random() * canvas.width;
        }
    });
    requestAnimationFrame(drawConfetti);
}

function startConfetti() {
    if (confettiActive) return;
    confettiActive = true;
    createConfetti();
    drawConfetti();
    setTimeout(() => confettiActive = false, 1200);
}

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});