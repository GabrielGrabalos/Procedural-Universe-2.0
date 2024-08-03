const game = new Game(window.innerWidth, window.innerHeight);

const scene = new Scene({
    width: window.innerWidth,
    height: window.innerHeight
});

window.onresize = () => {
    game.setWidth(window.innerWidth);
    game.setHeight(window.innerHeight);

    scene.setWidth(window.innerWidth);
    scene.setHeight(window.innerHeight);
};

const camera = new Camera({
    screenDimensions: { width: window.innerWidth, height: window.innerHeight }
});

scene.setCamera(camera);

const universe = new Universe(camera);

scene.addObject(universe);

scene.setCursor('grab');

game.setScene(scene);

// Start the game
game.start();