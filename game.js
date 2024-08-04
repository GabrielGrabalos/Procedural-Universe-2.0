class Game {
    constructor(width = 800, height = 600) {
        // Create an onscreen canvas
        this.canvas = document.createElement('canvas');
        this.canvas.width = width;
        this.canvas.height = height;
        this.context = this.canvas.getContext('2d');

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

        this.scenes = [];

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
        if (!scene instanceof Scene) {
            scene = this.scenes[scene];

            if (!scene) {
                console.error('Scene not found');
                return;
            }
        }

        // If the scene isn't on the list, add it
        if (!this.scenes.includes(scene)) {
            // Give it an ID:
            scene.id = this.scenes.length;
            this.scenes.push(scene);
        }

        if (this.currentScene) {
            // Add to browser history so when the user clicks the "back" button, they go back to the previous scene
            window.history.pushState({
                previousScene: this.currentScene.id
            }, "previousScene");
        }

        this.currentScene = scene;
        this.currentScene.game = this;
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
        window.addEventListener('click', this.handleInput.bind(this));
        window.addEventListener('wheel', this.handleInput.bind(this));
        window.addEventListener('contextmenu', this.handleInput.bind(this));  // Right-click

        // Touch events
        window.addEventListener('touchstart', this.handleInput.bind(this));
        window.addEventListener('touchend', this.handleInput.bind(this));
        window.addEventListener('touchmove', this.handleInput.bind(this));

        // Resize event
        window.addEventListener('resize', this.handleInput.bind(this));

        window.addEventListener('popstate', (event) => {
            console.log(event.state, event.state.previousScene);
            if (event.state && event.state.previousScene) {
                this.setScene(event.state.previousScene);
            }
        });

        // Start the game loop
        requestAnimationFrame(this.loop);
    }
}
