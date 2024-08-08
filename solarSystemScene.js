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

    customResize(){
        this.camera.screenDimensions = { width: this.width, height: this.height };
        this.limitWorldDimensions();
    }

    limitWorldDimensions(){
        let lastPlanet = this.star.children[this.star.children.length - 1];
        let lastMoon = lastPlanet.children[lastPlanet.children.length - 1] || { distanceToParent: 0, radius: 0 };

        let maxDistance = lastPlanet.distanceToParent + lastMoon.distanceToParent + lastMoon.radius + 300;

        const screenRatio = this.camera.screenDimensions.width / this.camera.screenDimensions.height;

        this.camera.WorldDimensions = {
            width: maxDistance * 2 * screenRatio,
            height: maxDistance * 2,
        };
    }

    start(){
        this.star = this.star.toSystem();

        this.addObject(this.star);
        
        this.star.generatePlanets();
        
        this.limitWorldDimensions();
        
        this.addObject(new StarBackground({ width: this.camera.WorldDimensions.width, height: this.camera.WorldDimensions.height, seed: this.star.seed }), 0);

    }

    update(input){
        this.requestCursor(this.camera.Dragging? "grabbing" : "grab");
    }
}