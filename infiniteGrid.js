class InfiniteGrid {
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

        for (let x = 0; x < ctx.canvas.width; x += interval) {
            this.drawLine(ctx, x, 0, x, ctx.canvas.height, color, 1);
        }

        for (let y = 0; y < ctx.canvas.height; y += interval) {
            this.drawLine(ctx, 0, y, ctx.canvas.width, y, color, 1);
        }
    }
}