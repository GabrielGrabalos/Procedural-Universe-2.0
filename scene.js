class Scene {
    constructor(width = 800, height = 600) {
        // Create an offscreen canvas
        this.canvas = document.createElement('canvas');
        this.canvas.width = width;
        this.canvas.height = height;
        this.context = this.canvas.getContext('2d');

        // Store the dimensions
        this.width = width;
        this.height = height;

        // Array to keep track of objects in the scene
        this.objects = [];

        this.currentCamera = null;

        this.backgroundColor = '#000000';
    }

    setWidth(width) {
        this.width = this.canvas.width = width;
    }

    setHeight(height) {
        this.height = this.canvas.height = height;
    }

    setCamera(camera) {
        this.currentCamera = camera;
    }

    setBackgroundColor(color) {
        this.backgroundColor = color;
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
    update(input) {
        if (this.currentCamera) {
            this.currentCamera.update(input);

            const mouse = this.currentCamera.ScreenToWorld(input.mouse);
            input.mouse = mouse;
        }        

        this.objects.forEach(object => {
            if (typeof object.update === 'function') {
                object.update(input);
            }
        });
    }

    // Method to render the scene
    render() {
        this.clear();

        if (this.currentCamera) {
            this.context.save();
            this.currentCamera.applyTransform(this.context);
        }

        this.objects.forEach(object => {
            if (typeof object.draw === 'function') {
                object.draw(this.context);
            }
        });

        if (this.currentCamera) {
            this.context.restore();
        }
    }
}
