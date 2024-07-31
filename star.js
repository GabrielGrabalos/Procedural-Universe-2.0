class Star {
    static starColors = ["#ffffff", "#ffcc99", "#ffcc66", "#ffcc33", "#ffcc00", "#ff9933", "#ff9900", "#ff6600", "#ff6633", "#ff3300", "#ff1133"];

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    draw(context) {
        context.beginPath();
        context.arc(50, 50, 10, 0, 2 * Math.PI);
        context.fillStyle = 'black';
        context.fill();
    }
}