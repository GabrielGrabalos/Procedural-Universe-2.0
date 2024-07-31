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
        const initialTime = Date.now();
        for(let y = 0; y < this.camera.screenDimensions.height /2; y++) {
            for(let x = 0; x < this.camera.screenDimensions.width/2; x++) {
                const seed = (x | y) | (y | x);

                const random = RandomNumberGenerator.XorShift(seed);
                const color = random % 256;
                ctx.fillStyle = `rgb(${color}, ${color}, ${color})`;
                ctx.fillRect(x*2, y*2, 2, 2);
            }
        }

        console.log(`Time taken: ${Date.now() - initialTime}ms`);
    }
}