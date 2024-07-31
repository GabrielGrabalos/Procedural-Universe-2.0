const game = new Game(window.innerWidth, window.innerHeight);

// Create a new scene
const scene = new Scene(window.innerWidth, window.innerHeight);

window.onresize = () => {
    game.setWidth(window.innerWidth);
    game.setHeight(window.innerHeight);

    scene.setWidth(window.innerWidth);
    scene.setHeight(window.innerHeight);
};

// Create a new camera
const camera = new Camera();

// Set the scene's camera
scene.currentCamera = camera;

// Add the scene to the game
game.setScene(scene);

// Create a new object
const infiniteGrid = new InfiniteGrid();

// Add the object to the scene
scene.addObject(infiniteGrid);

// Start the game
game.start();