export class GraphEdge {
    protected from: number;
    protected to: number;
    protected cost: number;

    constructor(from: number, to: number, cost: number = 1.0) {
        this.from = from;
        this.to = to;
        this.cost = cost;
    }
}