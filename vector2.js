class Vector2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    add(otherVector) {
        return new Vector2(this.x + otherVector.x, this.y + otherVector.y);
    }

    subtract(otherVector) {
        return new Vector2(this.x - otherVector.x, this.y - otherVector.y);
    }

    multiply(scalar) {
        return new Vector2(this.x * scalar, this.y * scalar);
    }

    divide(scalar) {
        return new Vector2(this.x / scalar, this.y / scalar);
    }

    magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    normalize() {
        const magnitude = this.magnitude();
        return new Vector2(this.x / magnitude, this.y / magnitude);
    }

    dot(otherVector) {
        return this.x * otherVector.x + this.y * otherVector.y;
    }
}
