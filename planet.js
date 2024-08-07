class Planet extends CelestialBody {
    constructor(seed, parent) {
        super(seed, parent);
    }

    generateMoons() {
        const moons = this.rng.nextInt(0, 5);

        for (let i = 0; i < moons; i++) {
            const seed = this.rng.next();

            const radiusRange = [2, 10];
            const distanceToParentRange = [30 + 30 * i, 50 + 30 * i];
            const massRange = [0.1, 1];
            const speedRange = [0.1, 1];

            const moon = new Moon(seed, this);

            moon.randomize(radiusRange, distanceToParentRange, massRange, speedRange);

            this.addChild(moon);
        }
    }
}