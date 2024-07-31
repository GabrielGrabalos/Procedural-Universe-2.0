class RandomNumberGenerator {
    constructor(camera){
        this.camera = camera;
    }

    static XorShift(x = 1) {
        x ^= x << 13;
        x ^= x >> 17;
        x ^= x << 5;

        return x;
    }

    draw(ctx) {
        let random = 1;
        for(let y = 0; y < this.camera.screenDimensions.height; y++) {
            for(let x = 0; x < this.camera.screenDimensions.width; x++) {
                random = RandomNumberGenerator.XorShift(random);
                const color = random % 256;
                ctx.fillStyle = `rgb(${color}, ${color}, ${color})`;
                ctx.fillRect(x, y, 1, 1);
            }
        }
    }
}