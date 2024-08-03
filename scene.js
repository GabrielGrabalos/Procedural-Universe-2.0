class Scene {
    constructor({ width = 800, height = 600, objects }) {
        // Create an offscreen canvas
        this.canvas = document.createElement('canvas');
        this.canvas.width = width;
        this.canvas.height = height;
        this.context = this.canvas.getContext('2d');

        // Store the dimensions
        this.width = this.canvas.width;
        this.height = this.canvas.height;

        // Array to keep track of objects in the scene
        this.objects = [];

        if (objects) {
            objects.forEach(object => this.addObject(object));
        }

        this.camera = null;

        this.backgroundColor = '#000000';

        this.game = null;
    }

    setWidth(width) {
        this.width = this.canvas.width = width;
    }

    setHeight(height) {
        this.height = this.canvas.height = height;
    }

    setCamera(camera) {
        this.camera = camera;
    }

    setBackgroundColor(color) {
        this.backgroundColor = color;
    }

    setCursor(cursor) {
        this.canvas.style.cursor = cursor;
    }

    // Method to add an object to the scene
    addObject(object) {
        if (typeof object.setScene === 'function') {
            object.setScene(this);
        }

        this.objects.push(object);
    }

    // Method to remove an object from the scene
    removeObject(object) {
        this.objects = this.objects.filter(obj => obj !== object);
    }

    // Method to clear the canvas
    clear() {
        this.context.fillStyle = this.backgroundColor;
        this.context.fillRect(0, 0, this.width, this.height);
    }

    // Method to update the state of the scene
    updateScene(input) {
        if (this.camera) {
            this.camera.update(input);
            
            const mouse = this.camera.ScreenToWorld(input.mouse);
            input.mouse = mouse;

            if (input.click){
                input.click = this.camera.click;
            }
        }

        this.update(input);

        this.objects.forEach(object => {
            if (typeof object.update === 'function') {                
                object.update(input);
            }
        });
    }

    update(input) {
        // Should be implemented by the subclass
    }

    // Method to render the scene
    render() {
        this.clear();

        if (this.camera) {
            this.context.save();
            this.camera.applyTransform(this.context);
        }

        this.objects.forEach(object => {
            if (typeof object.draw === 'function') {
                object.draw(this.context);
            }
        });

        if (this.camera) {
            this.context.restore();
        }
    }
}
