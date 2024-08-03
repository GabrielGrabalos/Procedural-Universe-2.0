class SolarSystemScene extends Scene {
    constructor({ width = 800, height = 600, objects, star, previousScene }) {
        super({ width, height, objects });

        this.star = { ...star };

        // Star conigurations:
        this.star.x = 0;
        this.star.y = 0;
        this.star.radius *= 10;

        this.addObject(this.star);

        // Camera:
        this.setCamera(new Camera({
            screenDimensions: { width, height },
            worldDimensions: { width: this.star.radius * 20, height: this.star.radius * 10 },
        }));
    }

    returnToPreviousScene() {
        if (this.previousScene) {
            this.game.setScene(this.previousScene);
        }
    }
}