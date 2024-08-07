class SolarSystemScene extends Scene {
    constructor({ width = 800, height = 600, objects, star }) {
        super({ width, height, objects, shouldCenterOnResize: false });

        this.star = star;

        // Camera:
        this.setCamera(new Camera({
            screenDimensions: { width, height },
            scale: 0.5,
        }));

        this.camera.CenterOffset();
    }

    start(){
        this.star = this.star.toSystem();

        this.addObject(this.star);

        this.star.generatePlanets();
    }

    update(input){
        this.requestCursor(this.camera.Dragging? "grabbing" : "grab");
    }
}