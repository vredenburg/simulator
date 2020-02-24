export abstract class wtf {
    static mod(x: number, m: number): number {
        return (x%m + m)%m;
    }

    static random(max: number) {
        return Math.floor(Math.random() * Math.floor(max));
    }
}

