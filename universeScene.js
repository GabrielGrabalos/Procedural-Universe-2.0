class UniverseScene extends Scene {
    constructor(options) {
        super(options);

        this.interval = 50;

        this.previousInitialPosition = { x: -1, y: 0 };
    }

    addStars() {
        const screenToWorld0 = this.camera.ScreenToWorld({ x: 0, y: 0 });

        const initialX = Math.floor(screenToWorld0.x / this.interval - 1) * this.interval;
        const initialY = Math.floor(screenToWorld0.y / this.interval - 1) * this.interval;

        if (this.previousInitialPosition.x === initialX && this.previousInitialPosition.y === initialY) {
            return;
        }

        this.previousInitialPosition = { x: initialX, y: initialY };

        this.objects = [];

        const screenToWorldWH = this.camera.ScreenToWorld({ x: this.width, y: this.height });

        const finalX = Math.ceil(screenToWorldWH.x / this.interval + 1) * this.interval;
        const finalY = Math.ceil(screenToWorldWH.y / this.interval + 1) * this.interval;

        // Rectangle object for coordinates for debugging:
        this.addObject(new Rectangle(initialX, initialY, 30, 30, "#ffffff"));
        this.addObject(new Rectangle(finalX - 30, finalY - 30, 30, 30, "#ffffff"));

        for (let x = initialX; x <= finalX; x += this.interval) {
            for (let y = initialY; y <= finalY; y += this.interval) {
                const seed = (y << 16 | (x & 0xFFFF)) & 0x7FFFFFF;

                
                if (RandomNumberGenerator.randInt(seed, 0, 20) === 1) {
                    const star = new Star(seed, x, y, this.interval);

                    this.addObject(star);
                }
            }
        }
    }

    update(input) {
        // Update cursor:
        this.requestCursor(this.camera.Dragging ? "grabbing" : "grab");

        this.addStars();
    }
}