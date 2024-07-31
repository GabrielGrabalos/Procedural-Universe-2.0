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
            const wtsix = this.camera.WorldToScreen({ x: i, y: 0 }).x;
            this.drawLine(ctx, wtsix, 0, wtsix, this.camera.screenDimensions.height, color, 1);
        }
    
        for (let i = stw0.y - this.camera.offset.y % interval; i <= this.camera.screenDimensions.height; i += interval) {
            const wtsiy = this.camera.WorldToScreen({ x: 0, y: i }).y;
            this.drawLine(ctx, 0, wtsiy, this.camera.screenDimensions.width, wtsiy, color, 1);
        }
    }
}