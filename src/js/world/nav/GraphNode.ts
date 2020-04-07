export abstract class GraphNode {
    public index: number;

    constructor(index: number = -1) {
        this.index = index;
    }

    public abstract render(ctx: CanvasRenderingContext2D): void;

    // const Inde(): number  {
    //     return this.index;
    // }

    // public setIndex(newIndex: number): void {
    //     this.index = newIndex;
    // }
}