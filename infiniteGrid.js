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

        for (let i = stw0.x - this.camera.offset.x % interval; i <= this.camera.screenDimensions.width; i += interval) {
            this.drawLine(ctx, i, 0, i, this.camera.screenDimensions.height, color, 1);
        }
    
        for (let i = stw0.y - this.camera.offset.y % interval; i <= this.camera.screenDimensions.height; i += interval) {
            this.drawLine(ctx, 0, i, this.camera.screenDimensions.width, i, color, 1);
        }
    }
}