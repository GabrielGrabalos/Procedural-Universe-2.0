class StarBackground extends GameObject {
    /*
    
        This class creates a background of random stars. At each update, the opacity of the stars is updated, creating a twinkling effect.

    */

    constructor({ width = 800, height = 600, starCount = 1000, seed }) {
        super();

        this.width = width;
        this.height = height;

        this.rng = new RandomNumberGenerator(seed);

        this.starCount = starCount;

        this.stars = [];

        for (let i = 0; i < this.starCount; i++) {
            this.stars.push({
                // Claculate x and y knowing that the camera is centered on (0, 0):
                x: this.rng.nextFloat(-this.width / 2, this.width / 2),
                y: this.rng.nextFloat(-this.height / 2, this.height / 2),
                size: this.rng.nextFloat(2, 10),
                opacity: this.rng.nextFloat(0, 1),
            });
        }
    }

    updateDimensions(width, height) {
        // Change star count based on new dimensions and previous density:
        const density = this.starCount / (this.width * this.height);
        this.starCount = Math.floor(density * width * height);

        // Update stars:
        this.stars = [];

        for (let i = 0; i < this.starCount; i++) {
            this.stars.push({
                x: this.rng.nextFloat(0, width),
                y: this.rng.nextFloat(0, height),
                size: this.rng.nextFloat(2, 6),
                opacity: this.rng.nextFloat(0, 1),
            });
        }

        this.width = width;
        this.height = height;
    }

    update() {
        for (let i = 0; i < this.starCount; i++) {
            this.stars[i].opacity += this.rng.nextFloat(-0.08, 0.08);
            this.stars[i].opacity = Math.max(0, Math.min(1, this.stars[i].opacity));
        }
    }

    draw(ctx) {
        for (let i = 0; i < this.starCount; i++) {
            ctx.fillStyle = `rgba(255, 255, 255, ${this.stars[i].opacity})`;
            ctx.fillRect(this.stars[i].x, this.stars[i].y, this.stars[i].size, this.stars[i].size);
        }
    }
}