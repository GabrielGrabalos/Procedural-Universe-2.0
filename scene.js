class Scene {
    constructor({ width = 800, height = 600, objects, autoResize = true, alpha = false, antialias = false, imageSmoothingEnabled = false, shouldCenterOnResize = false }) {
        // Create an offscreen canvas
        this.canvas = document.createElement('canvas');
        this.canvas.width = width;
        this.canvas.height = height;
        this.context = this.canvas.getContext('2d', { alpha: alpha, antialias: antialias });
        this.context.imageSmoothingEnabled = imageSmoothingEnabled;

        // Store the dimensions
        this.width = this.canvas.width;
        this.height = this.canvas.height;

        // If autoResize is true, resize the canvas when the window is resized
        if (autoResize) {
            window.addEventListener('resize', this.resize.bind(this));
        }

        this.shouldCenterOnResize = shouldCenterOnResize;

        // Array to keep track of objects in the scene
        this.objects = [];

        if (objects) {
            objects.forEach(object => this.addObject(object));
        }

        this.allowPrevious = true;

        this.camera = null;

        this.backgroundColor = '#000000';

        this.game = null;

        this.cursorRequest = "default";
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

    requestCursor(cursor) {
        this.cursorRequest = cursor;
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

    returnToPreviousScene() {
        if (this.previousScene) {
            this.game.setScene(this.previousScene);
        }
    }

    resize() {
        this.setWidth(window.innerWidth);
        this.setHeight(window.innerHeight);

        if (this.camera) {
            this.camera.screenDimensions = { width: this.width, height: this.height };

            if (this.shouldCenterOnResize) this.camera.CenterOffset();
        }
    }

    start() {
        // Should be implemented by the subclass
    }

    // Method to update the state of the scene
    updateScene(input) {
        this.cursorRequest = "default";

        if (this.camera) {
            this.camera.update(input);

            const mouse = this.camera.ScreenToWorld(input.mouse);
            input.mouse = mouse;

            if (input.mouseleave) {
                input.mouse = { x: -Infinity, y: -Infinity };
            }

            if (input.click) {
                input.click = this.camera.click;
            }
        }

        this.update(input);

        this.objects.forEach(object => {
            if (typeof object.update === 'function') {
                object.update(input);
            }
        });

        this.setCursor(this.cursorRequest);


        if (input.keydown && input.keydown.key == "Escape") {
            this.returnToPreviousScene();
        }
    }

    update(input) {
        // Should be implemented by the subclass
    }

    // Method to clear the canvas
    clear() {
        this.context.fillStyle = this.backgroundColor;
        this.context.fillRect(0, 0, this.width, this.height);
    }

    // Method to render the scene
    render() {
        this.clear();

        if (this.camera) {
            this.context.save(); // Save the current context state: scale, rotation, etc.
            this.camera.applyTransform(this.context); // Apply the camera transform.
        }

        this.objects.forEach(object => {
            if (typeof object.draw === 'function') {
                object.draw(this.context);
            }
        });

        if (this.camera) {
            this.context.restore(); // Restore the context to the state before the camera transform.
        }
    }
}
