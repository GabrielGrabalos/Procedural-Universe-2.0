class Universe {
    constructor(camera) {
        this.camera = camera;
    }

    draw(ctx) {
        const interval = 50;

        const stw0 = this.camera.ScreenToWorld({ x: 0, y: 0 });
        const stw1 = this.camera.ScreenToWorld({ x: this.camera.screenDimensions.width, y: this.camera.screenDimensions.height });

        ctx.fillStyle = '#000000';
        ctx.fillRect(stw0.x, stw0.y, stw1.x - stw0.x, stw1.y - stw0.y);

        const initalX = Math.floor(stw0.x / interval) * interval;
        const initalY = Math.floor(stw0.y / interval) * interval;

        for (let y = initalY; y < stw1.y; y += interval) {
            for (let x = initalX; x < stw1.x; x += interval) {
                const seed = y**2 << 16 | x**2;

                if (RandomNumberGenerator.randInt(seed, 0, 20) == 1) {
                    const star = new Star(x, y);
                    star.draw(ctx);
                }
            }
        }
    }
}