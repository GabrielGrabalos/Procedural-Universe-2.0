class Star extends CelestialBody {
    static starColors = ["#ffffff", "#ffcc99", "#ffcc66", "#ffcc33", "#ffcc00", "#ff9933", "#ff9900", "#ff6600", "#ff6633", "#ff3300", "#ff1133"];

    constructor(seed, x, y, generateSystem = false) {
        super(x, y);

        this.rng = new RandomNumberGenerator(seed);
        this.seed = seed;

        this.color = Star.starColors[this.rng.nextInt(0, Star.starColors.length)];
        this.radius = this.rng.nextFloat(5, 20);

        this.shiftX = this.rng.nextFloat(-40, 40); // TODO: Change this to multiply the interval
        this.shiftY = this.rng.nextFloat(-40, 40); // TODO: Change this to multiply the interval

        this.isBeingHovered = false;

        this.name = NameGenerator.generateName(this.rng, this.rng.nextInt(2, 4));

        if (!generateSystem) return;

        // Generate planets:
        const planets = this.rng.nextInt(0, 10);

        for (let i = 0; i < planets; i++) {
            const seed = this.rng.nextInt();
            const distanceToParent = this.rng.nextFloat(50, 100) + 100 * i;
            const angle = this.rng.nextFloat(0, Math.PI * 2);

            const x = this.position.x + distanceToParent * Math.cos(angle);
            const y = this.position.y + distanceToParent * Math.sin(angle);

            const planet = new Planet(seed, x, y, this, true);

            this.addChild(planet);
        }

        // // Generate asteroid belts:
        // const asteroidBelts = this.rng.nextInt(0, 2);

        // for (let j = 0; j < asteroidBelts; j++) {
        //     const asteroidBelt = new AsteroidBelt(this.rng.nextInt(), planet.x, planet.y, this.rng.nextFloat(1, 3), this.rng.nextFloat(0.1, 1), this.rng.nextFloat(0.1, 1));

        //     planet.addChild(asteroidBelt);
        // }

        // // Generate dwarf planets:
        // const dwarfPlanets = this.rng.nextInt(0, 2);

        // for (let j = 0; j < dwarfPlanets; j++) {
        //     const dwarfPlanet = new DwarfPlanet(this.rng.nextInt(), planet.x, planet.y, this.rng.nextFloat(1, 3), this.rng.nextFloat(0.1, 1), this.rng.nextFloat(0.1, 1));

        //     planet.addChild(dwarfPlanet);
        // }

        // // Generate comets:
        // const comets = this.rng.nextInt(0, 2);

        // for (let j = 0; j < comets; j++) {
        //     const comet = new Comet(this.rng.nextInt(), planet.x, planet.y, this.rng.nextFloat(1, 3), this.rng.nextFloat(0.1, 1), this.rng.nextFloat(0.1, 1));

        //     planet.addChild(comet);
        // }

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