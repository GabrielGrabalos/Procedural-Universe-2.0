class Universe {
    draw(ctx) {
        const interval = 50;

        const stw0 = this.camera.ScreenToWorld({ x: 0, y: 0 });
        const stw1 = this.camera.ScreenToWorld({ x: this.camera.screenDimensions.width, y: this.camera.screenDimensions.height });

        const initialX = stw0.x - this.camera.offset.x % interval;
        const initialY = stw0.y - this.camera.offset.y % interval;

        for (let i = initialX; i <= stw1.x; i += interval) {
            for (let j = initialY; j <= stw1.y; j += interval) {
                const seed = j << 16 | i;

                if (RandomNumberGenerator.randInt(seed, 0, 20) === 1) {
                    // Star exists.
                }
            }
        }
    }
}