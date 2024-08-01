class Star {
    static starColors = ["#ffffff", "#ffcc99", "#ffcc66", "#ffcc33", "#ffcc00", "#ff9933", "#ff9900", "#ff6600", "#ff6633", "#ff3300", "#ff1133"];

    constructor(x, y) {
        this.seed = y << 16 | x;
        this.x = x;
        this.y = y;
    }

    draw(ctx) {
        ctx.fillStyle = Star.starColors[RandomNumberGenerator.randInt(this.seed, 0, Star.starColors.length)];
        ctx.fillRect(this.x, this.y, 30, 30);
    }
}