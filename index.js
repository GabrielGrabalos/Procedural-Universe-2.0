const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d'); // 2d rendering context

// Set the canvas size:
let canvasWidth = canvas.width = window.innerWidth;    // 100% of the browser window's width
let canvasHeight = canvas.height = window.innerHeight; // 100% of the browser window's height

// Dynamically resize the canvas when the window is resized:
window.addEventListener('resize', () => {
    canvasWidth = canvas.width = window.innerWidth;
    canvasHeight = canvas.height = window.innerHeight;
});

function clear() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
}

function draw() {
    clear();
    // Draw stuff here
}

function update() {
    // Update stuff here
}

function loop() {
    update();
    draw();
    //requestAnimationFrame(loop);
}

loop();