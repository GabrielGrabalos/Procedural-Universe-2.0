class SolarSystemScene extends Scene {
    constructor({ width = 800, height = 600, objects, star, previousScene }) {
        super({ width, height, objects });

        // Make copy of the star:
        this.star = new Star(star.seed, 0, 0, true); // TODO: clone function in GameObject class

        // Star conigurations (remake all this because it is currently very bad):
        this.star.x = 0;
        this.star.y = 0;
        this.star.shiftX = 0;
        this.star.shiftY = 0;
        this.star.radius *= 40;

        this.addObject(this.star);

        // Camera:
        this.setCamera(new Camera({
            screenDimensions: { width, height },
            scale: 0.5,
        }));

        this.camera.CenterOffset();
    }

    update(input){        
        this.requestCursor(this.camera.Dragging? "grabbing" : "grab");
    }
}