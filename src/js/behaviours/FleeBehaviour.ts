import { SteeringBehaviour } from "./SteeringBehaviour";
import { Vector2D } from "../util/Vector2D";
import { Entity } from "../entities/Entity";
import { MovingEntity } from "../entities/MovingEntity";

export class FleeBehaviour extends SteeringBehaviour {
    public threat: Entity;
    private panicDistance: number;

    constructor(threat: Entity, panicDistance: number = 100 * 100) {
        super();
        this.threat = threat;
        this.panicDistance = panicDistance;
    }
    public act(movingEntity: MovingEntity): Vector2D {
        // console.log(this.panicDistance);
        // console.log(movingEntity.position.lengthSquared());
        let desiredVelocity: Vector2D = movingEntity.position.clone();
        desiredVelocity.sub(this.threat.position);

        if(desiredVelocity.distanceSquared() > this.panicDistance) {
            return new Vector2D(0,0);
        }

        desiredVelocity
            .normalise()
            .multiply(movingEntity.maxSpeed);
        return desiredVelocity.sub(movingEntity.velocity);
    }
}