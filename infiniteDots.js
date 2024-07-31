class InfiniteDots {
    constructor(camera) {
        this.camera = camera;
    }

    drawDot(ctx, x, y, color) {
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, 2 * Math.PI);
        ctx.fillStyle = color;
        ctx.fill();
    }

    draw(ctx) {
        const interval = 50;
        const color = 'black';

        const stw0 = this.camera.ScreenToWorld({ x: 0, y: 0 });
        const stw1 = this.camera.ScreenToWorld({ x: this.camera.screenDimensions.width, y: this.camera.screenDimensions.height });

        for (let i = stw0.x - this.camera.offset.x % interval; i <= stw1.x; i += interval) {
            for (let j = stw0.y - this.camera.offset.y % interval; j <= stw1.y; j += interval) {
                this.drawDot(ctx, i, j, color);
            }
        }
    }
}