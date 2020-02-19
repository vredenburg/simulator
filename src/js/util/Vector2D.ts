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

    // public length(): number {
    //     return Math.sqrt(this.lengthSquared())
    // }

    // public lengthSquared(): number {
    //     return this.x * this.x + this.y * this.y;
    // }

    public distance(): number {
        return Math.sqrt(this.distanceSquared())
    }

    public distanceSquared(): number {
        return this.x * this.x + this.y * this.y;
    }

    public normalise(): Vector2D {
        let length: number = this.distance();
        if(length != 0) {
            this.x /= length;
            this.y /= length;
        }
        return this;
    }

    public truncate(max: number): Vector2D {
        if(this.distance() > max) {
            this.normalise();
            this.multiply(max);
        }
        return this;
    }

    public clone(): Vector2D {
        return new Vector2D(this.x, this.y);
    }
}