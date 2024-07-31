class Star {
    draw(context) {
        context.beginPath();
        context.arc(50, 50, 10, 0, 2 * Math.PI);
        context.fillStyle = 'black';
        context.fill();
    }
}