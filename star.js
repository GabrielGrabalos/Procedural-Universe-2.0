class Star extends GameObject {
    static starColors = ["#ffffff", "#ffcc99", "#ffcc66", "#ffcc33", "#ffcc00", "#ff9933", "#ff9900", "#ff6600", "#ff6633", "#ff3300", "#ff1133"];

    constructor(seed, x, y) {
        super();
        
        this.rng = new RandomNumberGenerator(seed);
        this.seed = seed;
        this.x = x;
        this.y = y;

        this.color = Star.starColors[this.rng.nextInt(0, Star.starColors.length)];
        this.radius = this.rng.nextFloat(5, 20);

        this.shiftX = this.rng.nextFloat(-30, 30); // TODO: Change this to multiply the interval
        this.shiftY = this.rng.nextFloat(-30, 30); // TODO: Change this to multiply the interval

        this.isBeingHovered = false;
        
        this.name = NameGenerator.generateName(this.rng, this.rng.nextInt(2, 4));
    }

    calculateDistance(other){
        return Math.sqrt((this.x + this.shiftX - other.x) ** 2 + (this.y + this.shiftY - other.y) ** 2);
    }

    update(input){
        // if mouse hovering:
        this.isBeingHovered = this.calculateDistance(input.mouse) <= this.radius;

        if (input.click && this.isBeingHovered){
            // Create and set new Solar System scene:
            const solarSystemScene = new SolarSystemScene({
                width: this.scene.width,
                height: this.scene.height,
                star: this,
                previousScene: this.scene,
            });

            this.scene.game.setScene(solarSystemScene);
        }
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        
        ctx.beginPath();
        ctx.arc(this.x + this.shiftX, this.y + this.shiftY, this.radius, 0, Math.PI * 2);
        ctx.fill();

        if (this.isBeingHovered && !this.scene.camera.drag){
            // Circle around the star
            ctx.strokeStyle = "#ffffff";
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(this.x + this.shiftX, this.y + this.shiftY, this.radius + 5, 0, Math.PI * 2);
            ctx.stroke();
        }
    }
}