class SolarSystemScene extends Scene {
    constructor({ width = 800, height = 600, objects, star }) {
        super({ width, height, objects });

        this.star = star;

        // Camera:
        this.setCamera(new Camera({
            screenDimensions: { width, height },
            scale: 4,
        }));

        this.camera.CenterOffset();
    }

    start(){
        this.star.generatePlanets();

        this.addObject(this.star.toSystem());
    }

    update(input){        
        this.requestCursor(this.camera.Dragging? "grabbing" : "grab");
    }
}