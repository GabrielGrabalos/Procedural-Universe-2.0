class Moon extends CelestialBody {
    constructor(seed, x, y, radius, mass, distance) {
        super(x, y, radius, "#aaaaaa", mass);

        this.rng = new RandomNumberGenerator(seed);
        this.seed = seed;

        this.distance = distance;
        this.angle = this.rng.nextFloat(0, Math.PI * 2);
        this.angularSpeed = this.rng.nextFloat(0.001, 0.01);
    }
}