export class Vector2D {
    public x: number;
    public y: number;

    // Initialises Vector2D with default values of 0,0 if no parameters are passed.
    constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
    }

    public add(v: Vector2D): Vector2D {
        this.x += v.x;
        this.y += v.y;

        return this;
    }

    public sub(v: Vector2D): Vector2D {
        this.x -= v.x;
        this.y -= v.y;
        
        return this;
    }

    public multiply(value: number): Vector2D {
        this.x *= value;
        this.y *= value;
        return this;
    }

    public divide(value: number): Vector2D {
        return this.multiply(1.0 / value);
    }

    public distance(): number {
        return Math.sqrt(this.distanceSquared())
    }

    public distanceSquared(): number {
        return this.x * this.x + this.y * this.y;
    }

    public normalise(length: number = this.distance()): Vector2D {
        if(length != 0) {
            this.x /= length;
            this.y /= length;
        }
        return this;
    }

    public truncate(min: number, max: number): Vector2D {
        let distance: number = this.distance();
        if(distance > max) {
            this.normalise(distance);
            this.multiply(max);
        }
        if(distance < min) {
            this.normalise(distance);
            this.multiply(min);
        }
        return this;
    }

    public clone(): Vector2D {
        return new Vector2D(this.x, this.y);
    }

    public isNot(other: Vector2D): boolean {
        return (this.x != other.x && this.y != other.y);
    }
}