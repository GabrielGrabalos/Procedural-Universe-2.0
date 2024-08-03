class UniverseScene extends Scene {
    constructor(options) {
        super(options);

        this.previousInitialPosition = { x: 0, y: 0 };
    }

    addStars(initalX, initalY, interval = 50) {
        this.objects = [];

        const stw1 = this.camera.ScreenToWorld({ x: this.camera.screenDimensions.width, y: this.camera.screenDimensions.height });

        const finalX = Math.floor(stw1.x / interval + 2) * interval;
        const finalY = Math.floor(stw1.y / interval + 2) * interval;

        for (let y = initalY; y < finalY; y += interval) {
            for (let x = initalX; x < finalX; x += interval) {
                const seed = (y) << 16 | (x & 0xFFFF);

                if (RandomNumberGenerator.randInt(seed, 0, 20) == 1) {
                    const star = new Star(seed, x, y);
                    this.addObject(star);
                }
            }
        }
    }

    update(input) {
        const interval = 50;

        const stw0 = this.camera.ScreenToWorld({ x: 0, y: 0 });

        const initalX = Math.floor(stw0.x / interval - 2) * interval;
        const initalY = Math.floor(stw0.y / interval - 2) * interval;

        if (input.resize || this.objects.length == 0) {
            this.addStars(initalX, initalY, interval);            
            return;
        }

        if (this.previousInitialPosition.x != initalX || this.previousInitialPosition.y != initalY) {
            this.previousInitialPosition = { x: initalX, y: initalY };

            this.addStars(initalX, initalY, interval);
        }

        let isAnyStarBeingHovered = false;

        this.objects.forEach(star => {
            if (star.isBeingHovered){
                isAnyStarBeingHovered = true;
            }
        });

        if (isAnyStarBeingHovered && !this.camera.drag){
            this.setCursor('pointer');
        }

        // Awful, but working, for now.
        if (!isAnyStarBeingHovered && this.canvas.style.cursor === 'pointer'){
            this.setCursor('grab');
        }

        // Update cursor:
        if (input.mousedown){
            this.setCursor('grabbing');
        }
        else if (input.mouseup){
            this.setCursor('grab');
        }
    }
}