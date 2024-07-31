const game = new Game(window.innerWidth, window.innerHeight);

window.onresize = () => {
    game.setWidth(window.innerWidth);
    game.setHeight(window.innerHeight);
};

// Create a new scene
const scene = new Scene(window.innerWidth, window.innerHeight);

// Create a new camera
const camera = new Camera();

// Set the scene's camera
scene.currentCamera = camera;

// Add the scene to the game
game.setScene(scene);

// Create a new object
const star = new Star();

// Add the object to the scene
scene.addObject(star);

// Start the game
game.start();