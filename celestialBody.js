class CelestialBody extends GameObject {
    constructor(x, y, radius, color, mass) {
        super(x, y);
        this.radius = radius;
        this.color = color;
        this.mass = mass;

        this.parent = null; // Orbital parent.
        this.children = []; // Orbital children.
    }

    addChild(child) {
        this.children.push(child);
        child.parent = this;
    }

    removeChild(child) {
        const index = this.children.indexOf(child);
        if (index !== -1) {
            this.children.splice(index, 1);
            child.parent = null;
        }
    }

    update() {
        // This method should be overridden
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }
}