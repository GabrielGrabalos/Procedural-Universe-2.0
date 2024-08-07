class UniverseScene extends Scene {
    constructor(options) {
        super(options);

        this.interval = 50;

        this.previousPositions = [
            { x: 0, y: 0 }, // Top left
            { x: 0, y: 0 }  // Bottom right
        ]
    }

    addStars(initialX, initialY, finalX, finalY) {
        this.objects = [];

        for (let x = initialX; x <= finalX; x += this.interval) {
            for (let y = initialY; y <= finalY; y += this.interval) {
                const seed = (y << 16 | (x & 0xFFFF)) & 0x7FFFFFF;

                if (RandomNumberGenerator.randInt(seed, 0, 20) === 1) {
                    const star = new Star(seed, x, y);

                    this.addObject(star);
                }
            }
        }
    }

    update(input) {
        // Update cursor:
        this.requestCursor(this.camera.Dragging ? "grabbing" : "grab");

        // Update stars:
        const screenToWorld0 = this.camera.ScreenToWorld({ x: 0, y: 0 });

        const initialX = Math.floor(screenToWorld0.x / this.interval - 1) * this.interval;
        const initialY = Math.floor(screenToWorld0.y / this.interval - 1) * this.interval;

        const screenToWorldWH = this.camera.ScreenToWorld({ x: this.width, y: this.height });

        const finalX = Math.ceil(screenToWorldWH.x / this.interval + 1) * this.interval;
        const finalY = Math.ceil(screenToWorldWH.y / this.interval + 1) * this.interval;

        if (initialX !== this.previousPositions[0].x || initialY !== this.previousPositions[0].y ||
            finalX !== this.previousPositions[1].x || finalY !== this.previousPositions[1].y) {

            this.previousPositions = [
                { x: initialX, y: initialY },
                { x: finalX, y: finalY }
            ];

            this.addStars(initialX, initialY, finalX, finalY);
        }
    }
}