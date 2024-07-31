class InfiniteGrid {
    constructor(camera) {
        this.camera = camera;
    }

    drawLine(ctx, x1, y1, x2, y2, color, lineWidth) {
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
        ctx.stroke();
    }

    draw(ctx){
        const interval = 50;
        const color = 'black';

        const stw0 = this.camera.ScreenToWorld({ x: 0, y: 0 });
        const stw1 = this.camera.ScreenToWorld({ x: this.camera.screenDimensions.width, y: this.camera.screenDimensions.height });

        for (let i = stw0.x - this.camera.offset.x % interval; i <= stw1.x; i += interval) {
            this.drawLine(ctx, i, stw0.y, i, stw1.y, color, 1);
        }
    
        for (let i = stw0.y - this.camera.offset.y % interval; i <= stw1.y; i += interval) {
            this.drawLine(ctx, stw0.x, i, stw1.x, i, color, 1);
        }
    }
}