class Planet extends CelestialBody {
    constructor(seed, x, y, parent, generateSystem = false) {
        super(x, y);

        this.seed = seed;
        this.parent = parent;
        this.rng = new RandomNumberGenerator(seed);

        this.radius = this.rng.nextFloat(5, 20);

        this.name = NameGenerator.generateName(this.rng, this.rng.nextInt(2, 4));

        if (!generateSystem) return;

        // Generate moons:
        const moons = this.rng.nextInt(0, 5);

        for (let i = 0; i < moons; i++) {
            const seed = this.rng.nextInt();
            const distanceToParent = this.rng.nextFloat(5, 20) + 20 * i;
            const angle = this.rng.nextFloat(0, Math.PI * 2);

            const x = this.position.x + distanceToParent * Math.cos(angle);
            const y = this.position.y + distanceToParent * Math.sin(angle);

            const moon = new Moon(seed, x, y, this, true);

            this.addChild(moon);
        }
    }
}