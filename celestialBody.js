class CelestialBody extends GameObject {
    constructor(seed, parent) {
        super();

        this.rng = new RandomNumberGenerator(seed);
        this.seed = seed;

        this.isBeingHovered = false;

        this.parent = null; // Orbital parent.
        this.distanceToParent = 0; // Distance to parent.
    }

    randomize(radiusRange, distanceRange = [0, 0], massRange, speedRange) {
        this.radius = this.rng.nextFloat(radiusRange[0], radiusRange[1]);
        this.distanceToParent = this.rng.nextFloat(distanceRange[0], distanceRange[1]);
        this.mass = this.rng.nextFloat(massRange[0], massRange[1]);
        this.speed = this.rng.nextFloat(speedRange[0], speedRange[1]);

        this.color = `rgb(${this.rng.nextInt(0, 255)}, ${this.rng.nextInt(0, 255)}, ${this.rng.nextInt(0, 255)})`;

        this.angle = this.rng.nextFloat(0, Math.PI * 2);

        this.name = NameGenerator.generateName(this.rng, this.rng.nextInt(2, 4));

        if (this.parent) {
            this.position.x = this.parent.position.x + this.distanceToParent * Math.cos(this.angle);
            this.position.y = this.parent.position.y + this.distanceToParent * Math.sin(this.angle);
        }
    }

    addChild(child) {
        child.parent = this;
        this.scene.addObject(child);
    }

    removeChild(child) {
        const index = this.children.indexOf(child);
        if (index !== -1) {
            this.children.splice(index, 1);
            child.parent = null;
        }
    }

    calculateDistance(other) {
        return Math.sqrt((this.position.x - other.x) ** 2 + (this.position.y - other.y) ** 2);
    }

    click() {
        // Override this method.
    }

    update(input) {
        this.isBeingHovered = this.calculateDistance(input.mouse) <= this.radius;

        if (this.isBeingHovered) {
            this.scene.requestCursor("pointer");

            if (input.click) {
                this.click();
            }
        }

        if (this.parent) {
            // Update the orbit according to the speed.
            this.position.x = this.parent.position.x + this.distanceToParent * Math.cos(this.angle);
            this.position.y = this.parent.position.y + this.distanceToParent * Math.sin(this.angle);

            this.angle += this.speed;
        }
    }

    drawOrbit(ctx) {
        ctx.strokeStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(this.parent.position.x, this.parent.position.y, this.distanceToParent, 0, Math.PI * 2);
    }

    draw(ctx) {
        if (this.parent) {
            this.drawOrbit(ctx);
        }

        ctx.fillStyle = this.color;

        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
        ctx.fill();

        if (this.isBeingHovered && !this.scene.camera.drag) {
            // Circle around the star
            ctx.strokeStyle = "#ffffff";
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(this.position.x, this.position.y, this.radius + 5, 0, Math.PI * 2);
            ctx.stroke();
        }
    }
}