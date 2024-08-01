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

        const initialX = stw0.x - this.camera.offset.x % interval;
        const initialY = stw0.y - this.camera.offset.y % interval;

        for (let i = initialX; i <= stw1.x; i += interval) {
            for (let j = initialY; j <= stw1.y; j += interval) {
                const seed = (i & 0xFFFF) << 16 | (j & 0xFFFF);

                if (RandomNumberGenerator.randInt(seed, 0, 20) === 1) {
                    const star = new Star(i, j);
                    star.draw(ctx);
                }
            }
        }
    }
}