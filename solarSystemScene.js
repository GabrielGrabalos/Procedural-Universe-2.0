class SolarSystemScene extends Scene {
    constructor({ width = 800, height = 600, objects, star, previousScene }) {
        super({ width, height, objects });

        // Make copy of the star:
        this.star = new Star(star.seed, 0, 0); // TODO: clone function in GameObject class

        // Star conigurations:
        this.star.x = 0;
        this.star.y = 0;
        this.star.radius *= 10;

        this.addObject(this.star);

        // Camera:
        this.setCamera(new Camera({
            screenDimensions: { width, height },
        }));

        this.camera.CenterOffset();
    }

    returnToPreviousScene() {
        if (this.previousScene) {
            this.game.setScene(this.previousScene);
        }
    }
}