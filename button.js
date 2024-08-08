class Button extends GameObject {
    constructor(x, y, width, height, text, onClick) {
        super(x, y, width, height);
        this.text = text;
        this.onClick = onClick;
    }

    update(input) {
        if (this.isBeingHovered(input.mouse)) {
            this.scene.cursorRequest = "pointer";
        }
    }

    click() {
        if (this.onClick) {
            this.onClick();
        }
    }

    draw(ctx) {
        ctx.fillStyle = this.isBeingHovered(this.scene.input.mouse) ? "rgba(255, 255, 255, 0.8)" : "rgba(255, 255, 255, 0.5)";
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);

        ctx.fillStyle = "black";
        ctx.font = "20px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(this.text, this.position.x + this.width / 2, this.position.y + this.height / 2);
    }
}