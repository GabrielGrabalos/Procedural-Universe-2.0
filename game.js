class Game {
    constructor(width = 800, height = 600) {
        // Create an onscreen canvas
        this.canvas = document.createElement('canvas');
        this.canvas.width = width;
        this.canvas.height = height;
        this.context = this.canvas.getContext('2d', { alpha: false, antialias: false });
        this.context.imageSmoothingEnabled = false;

        // Add the canvas to the document body
        document.body.appendChild(this.canvas);

        // Store the current scene
        this.currentScene = null;

        // Input state
        this.input = {
            mouse: { x: 0, y: 0 }
        };

        // Bind the main loop to the instance
        this.loop = this.loop.bind(this);

        // Start the game loop
        requestAnimationFrame(this.loop);
    }

    setWidth(width) {
        this.canvas.width = width;
    }

    setHeight(height) {
        this.canvas.height = height;
    }

    // Method to switch scenes
    setScene(scene) {
        if (!scene.previousScene && scene.allowPrevious && this.currentScene) {
            scene.previousScene = this.currentScene;
        }

        this.currentScene = scene;
        this.currentScene.game = this;

        this.currentScene.start();
    }

    // Method to handle user input
    handleInput(event) {
        this.input[event.type] = event;

        if (event.type === 'mousemove') {
            this.input.mouse.x = event.clientX - this.canvas.offsetLeft;
            this.input.mouse.y = event.clientY - this.canvas.offsetTop;
        }
    }

    // Main game loop
    loop() {
        if (this.currentScene) {
            this.currentScene.updateScene({ ...this.input });
            this.currentScene.render();
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.context.drawImage(this.currentScene.canvas, 0, 0);

            this.canvas.style.cursor = this.currentScene.canvas.style.cursor;
        }

        // Reset the input
        this.input = {
            mouse: this.input.mouse
        };

        requestAnimationFrame(this.loop);
    }

    // Method to start the game and set up input handling
    start() {
        // Keyboard events
        window.addEventListener('keydown', this.handleInput.bind(this));
        window.addEventListener('keyup', this.handleInput.bind(this));

        // Mouse events
        window.addEventListener('mousedown', this.handleInput.bind(this));
        window.addEventListener('mouseup', this.handleInput.bind(this));
        window.addEventListener('mousemove', this.handleInput.bind(this));
        window.addEventListener('mouseenter', this.handleInput.bind(this));
        window.addEventListener('mouseleave', this.handleInput.bind(this));
        window.addEventListener('click', this.handleInput.bind(this));
        window.addEventListener('wheel', this.handleInput.bind(this));
        window.addEventListener('contextmenu', this.handleInput.bind(this));  // Right-click

        // Touch events
        window.addEventListener('touchstart', this.handleInput.bind(this));
        window.addEventListener('touchend', this.handleInput.bind(this));
        window.addEventListener('touchmove', this.handleInput.bind(this));

        // Resize event
        window.addEventListener('resize', this.handleInput.bind(this));

        // Start the game loop
        requestAnimationFrame(this.loop);
    }
}
