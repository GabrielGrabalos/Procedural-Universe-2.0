class RandomNumberGenerator {
    constructor(camera) {
        this.state = 0xdeadbeef;
        this.camera = camera;
    }

    randInt(min, max) {
        return min + (this.random() % (max - min + 1))
    }

    randFloat(min, max) {
        return min + (this.random()) / 0xFFFFFFFF * (max - min)
    }

    random() {
        this.state ^= (this.state << 13)
        this.state ^= (this.state >> 17)
        this.state ^= (this.state << 5)
        return this.state & 0xFFFFFFFF
    }

    // Static methods:
    static random(seed) {
        seed ^= (seed << 13)
        seed ^= (seed >> 17)
        seed ^= (seed << 5)
        return seed & 0xFFFFFFFF / 0xFFFFFFFF
    }

    static randInt(seed, min, max) {
        return min + ((RandomNumberGenerator.random(seed) * max) % (max - min + 1))
    }

    static randFloat(seed, min, max) {
        return min + RandomNumberGenerator.random(seed) * (max - min)
    }


    draw(ctx) {
        const initialTime = Date.now();
        for (let y = 0; y < this.camera.screenDimensions.height / 2; y++) {
            for (let x = 0; x < this.camera.screenDimensions.width / 2; x++) {
                this.state = y << 16 | x;
                const random = this.random();
                const color = random % 256;
                ctx.fillStyle = `rgb(${color}, ${color}, ${color})`;
                ctx.fillRect(x * 2, y * 2, 2, 2);
            }
        }

        console.log(`Time taken: ${Date.now() - initialTime}ms`);
    }
}