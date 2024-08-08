class Star extends CelestialBody {
    static starColors = ["#ffffff", "#ffcc99", "#ffcc66", "#ffcc33", "#ffcc00", "#ff9933", "#ff9900", "#ff6600", "#ff6633", "#ff3300", "#ff1133"];

    constructor(seed, x, y) {
        super(seed);

        this.position = new Vector2(x, y);

        this.color = Star.starColors[this.rng.nextInt(0, Star.starColors.length)];
        this.radius = this.rng.nextFloat(5, 20);

        const shiftRange = this.scene?.interval ? this.scene.interval * 0.8 : 40; // Not working, scene is null.

        this.shiftX = this.rng.nextFloat(-shiftRange, shiftRange);
        this.shiftY = this.rng.nextFloat(-shiftRange, shiftRange);

        this.isBeingHovered = false;

        this.name = NameGenerator.generateName(this.rng, this.rng.nextInt(2, 4));
    }

    // TODO: update hyperparameters
    generatePlanets() {
        const planets = this.rng.nextInt(0, 10);

        for (let i = 0; i < planets; i++) {
            const seed = this.rng.next();

            const radiusRange = [5, 20];
            const distanceToParentRange = [700 + 350 * i, 900 + 350 * i];
            const massRange = [1, 10];
            const speedRange = [0.1, 1];

            const planet = new Planet(seed, this);

            this.addChild(planet);
            
            planet.randomize(radiusRange, distanceToParentRange, massRange, speedRange);

            planet.generateMoons();
        }
    }

    calculateDistance(other) {
        return Math.sqrt((this.position.x + this.shiftX - other.x) ** 2 + (this.position.y + this.shiftY - other.y) ** 2);
    }

    click() {
        // Create and set new Solar System scene:
        const solarSystemScene = new SolarSystemScene({
            width: this.scene.width,
            height: this.scene.height,
            star: this,
            previousScene: this.scene,
        });

        this.scene.game.setScene(solarSystemScene);
    }

    copy() {
        return new Star(this.seed, this.position.x, this.position.y);
    }

    toSystem() {
        const star = this.copy();

        star.position.x = 0;
        star.position.y = 0;
        star.shiftX = 0;
        star.shiftY = 0;
        star.radius *= 30;

        star.click = () => {
            // Nothing for now.
        };

        return star;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;

        ctx.beginPath();
        ctx.arc(this.position.x + this.shiftX, this.position.y + this.shiftY, this.radius, 0, Math.PI * 2);
        ctx.fill();

        if (this.isBeingHovered && !this.scene.camera.drag) {
            // Circle around the star
            ctx.strokeStyle = "#ffffff";
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(this.position.x + this.shiftX, this.position.y + this.shiftY, this.radius + 5, 0, Math.PI * 2);
            ctx.stroke();
        }
    }
}