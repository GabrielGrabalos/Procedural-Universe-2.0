class GameObject {
    constructor(x, y, width = 0, height = 0) {
        this.position = new Vector2(x, y);
        this.scene  = null;
        this.width  = width;
        this.height = height;
    }
    
    setScene(scene) {
        this.scene = scene;
    }

    removeSelfFromScene() {
        if (this.scene) {
            this.scene.removeObject(this);
        }
    }

    isBeingHovered(mouse) {
        if (width <= 0 || height <= 0)
            return false;

        return (mouse.x >= this.position.x && mouse.x <= this.position.x + this.width &&
                mouse.y >= this.position.y && mouse.y <= this.position.y + this.height);
    }

    update() {
        // This method should be overridden
    }

    draw(ctx) {
        // This method should be overridden
    }
}