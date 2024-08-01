class Star {
    static starColors = ["#ffffff", "#ffcc99", "#ffcc66", "#ffcc33", "#ffcc00", "#ff9933", "#ff9900", "#ff6600", "#ff6633", "#ff3300", "#ff1133"];

    constructor(seed, x, y) {
        this.rng = new RandomNumberGenerator(seed);
        this.x = x;
        this.y = y;

        this.color = Star.starColors[this.rng.nextInt(0, Star.starColors.length)];
        this.radius = this.rng.nextFloat(5, 20);

        this.shiftX = this.rng.nextFloat(-30, 30); // TODO: Change this to multiply the interval
        this.shiftY = this.rng.nextFloat(-30, 30); // TODO: Change this to multiply the interval

        this.name = NameGenerator.generateName(this.rng, this.rng.nextInt(1, 3));
    }

    calculateDistance(other){
        return Math.sqrt((this.x + this.shiftX - other.x) ** 2 + (this.y + this.shiftY - other.y) ** 2);
    }

    update(input){
        // if mouse hovering:
        
        if (this.calculateDistance(input.mouse) <= this.radius){
            console.log(this.name);
        }
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        
        ctx.beginPath();
        ctx.arc(this.x + this.shiftX, this.y + this.shiftY, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }
}