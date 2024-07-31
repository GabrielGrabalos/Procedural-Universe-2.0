const game = new Game(window.innerWidth, window.innerHeight);

// Create a new scene
const scene = new Scene(window.innerWidth, window.innerHeight);

window.onresize = () => {
    game.setWidth(window.innerWidth);
    game.setHeight(window.innerHeight);

    scene.setWidth(window.innerWidth);
    scene.setHeight(window.innerHeight);
    
    camera.screenDimensions = { width: window.innerWidth, height: window.innerHeight };
};

// Create a new camera
const camera = new Camera();

// Set the camera's world dimensions
camera.screenDimensions = { width: window.innerWidth, height: window.innerHeight };

// Set the scene's camera
//scene.currentCamera = camera;

// Add the scene to the game
game.setScene(scene);

// Create a new object
const infiniteGrid = new InfiniteDots(camera);
const randomNumberGenerator = new RandomNumberGenerator(14, camera);

// Add the object to the scene
scene.addObject(randomNumberGenerator);

// Start the game
game.start();