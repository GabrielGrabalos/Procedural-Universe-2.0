const game = new Game(window.innerWidth, window.innerHeight);

const universe = new UniverseScene({
    width: window.innerWidth,
    height: window.innerHeight
});

window.onresize = () => {
    game.setWidth(window.innerWidth);
    game.setHeight(window.innerHeight);
};

const camera = new Camera({
    screenDimensions: { width: window.innerWidth, height: window.innerHeight }
});

universe.setCamera(camera);

universe.setCursor('grab');

game.setScene(universe);

// Start the game
game.start();