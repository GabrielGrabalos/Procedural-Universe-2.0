class Planet extends CelestialBody {
    constructor(seed, parent) {
        super();
    }

    generateMoons() {
        const moons = this.rng.nextInt(0, 5);

        for (let i = 0; i < moons; i++) {
            const seed = this.rng.nextInt();

            const radiusRange = [2, 10];
            const distanceToParentRange = [10 + 10 * i, 20 + 10 * i];
            const massRange = [0.1, 1];
            const speedRange = [0.001, 0.01];

            const moon = new Moon(seed, this);

            moon.randomize(radiusRange, distanceToParentRange, massRange, speedRange);

            this.addChild(moon);
        }
    }
}