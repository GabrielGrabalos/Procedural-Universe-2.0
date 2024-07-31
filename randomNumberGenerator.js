class RandomNumberGenerator {
    constructor(seed, camera) {
        this.seed = seed || 14;
        this.camera = camera;
    }

    XorShift() {
        let x = this.seed;
        x ^= x << 13;
        x ^= x >> 17;
        x ^= x << 5;

        this.seed = x;

        return x;
    }

    draw(ctx) {
        for(let y = 0; y < this.camera.screenDimensions.height; y++) {
            for(let x = 0; x < this.camera.screenDimensions.width; x++) {
                const random = this.Alea();
                const color = random % 256;
                ctx.fillStyle = `rgb(${color}, ${color}, ${color})`;
                ctx.fillRect(x, y, 1, 1);
            }
        }
    }
}