export class GraphEdge {
    public from: number;
    public to: number;
    public cost: number;

    constructor(from: number = -1, to: number = -1, cost: number = 1.0) {
        this.from = from;
        this.to = to;
        this.cost = cost;
    }

    public setFrom(newIndex: number): void {
        this.from = newIndex;
    }

    public setTo(newIndex: number): void {
        this.to = newIndex;
    }

    public setCost(newCost: number): void {
        this.cost = newCost;
    }
}