class GameObject {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.scene = null;
    }
    
    setScene(scene) {
        this.scene = scene;
    }

    removeSelfFromScene() {
        if (this.scene) {
            this.scene.removeObject(this);
        }
    }

    update() {
        // This method should be overridden
    }

    draw(ctx) {
        // This method should be overridden
    }
}