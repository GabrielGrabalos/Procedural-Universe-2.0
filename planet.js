class Planet extends GameObject {
    constructor(seed, x, y, star) {
        super();

        this.rng = new RandomNumberGenerator(seed);
        this.seed = seed;
        this.x = x;
        this.y = y;

        this.radius = this.rng.nextFloat(5, 20);

        this.isBeingHovered = false;

        this.name = NameGenerator.generateName(this.rng, this.rng.nextInt(2, 4));

        this.star = star;
    }

    calculateDistance(other) {
        return Math.sqrt((this.x + this.shiftX - other.x) ** 2 + (this.y + this.shiftY - other.y) ** 2);
    }

    update(input) {
        // if mouse hovering:
        this.isBeingHovered = this.calculateDistance(input.mouse) <= this.radius;

        if (this.isBeingHovered) {
            this.scene.requestCursor("pointer");

            if (input.click) {
                // to implement
            }
        }
    }

    draw(ctx) {
        ctx.fillStyle = this.color;

        ctx.beginPath();
        ctx.arc(this.x + this.shiftX, this.y + this.shiftY, this.radius, 0, Math.PI * 2);
        ctx.fill();

        if (this.isBeingHovered && !this.scene.camera.drag) {
            // Circle around the star
            ctx.strokeStyle = "#ffffff";
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(this.x + this.shiftX, this.y + this.shiftY, this.radius + 5, 0, Math.PI * 2);
            ctx.stroke();
        }
    }
}