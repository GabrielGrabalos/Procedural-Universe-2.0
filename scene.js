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
    }

    setWidth(width) {
        this.width = this.canvas.width = width;
    }

    setHeight(height) {
        this.height = this.canvas.height = height;
    }

    // Method to add an object to the scene
    addObject(object) {
        this.objects.push(object);
    }

    // Method to remove an object from the scene
    removeObject(object) {
        this.objects = this.objects.filter(obj => obj !== object);
    }

    // Method to clear the canvas
    clear() {
        this.context.clearRect(0, 0, this.width, this.height);
    }

    // Method to update the state of the scene
    update(input) {
        this.objects.forEach(object => {
            if (typeof object.update === 'function') {
                object.update(input);
            }
        });
    }

    // Method to render the scene
    render() {
        this.clear();
        this.objects.forEach(object => {
            if (typeof object.draw === 'function') {
                object.draw(this.context);
            }
        });
    }
}
