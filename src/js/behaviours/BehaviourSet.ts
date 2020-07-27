import { SteeringBehaviour } from "./basic/SteeringBehaviour";
import { Vector2D } from "../util/Vector2D";
import { MovingEntity } from "../entities/MovingEntity";
import { BehaviourType } from "../util/Enums";
import { PursuitBehaviour, FleeBehaviour, ArriveBehaviour, 
        FlockAlignmentBehaviour, FlockCohesionBehaviour, 
        FlockSeperationBehaviour
    } from "./";
import { TargetedBehaviour } from "./basic/TargetedBehaviour";
import { World } from "../world/World";

export class BehaviourSet {
    public behaviours: { [id: number]: SteeringBehaviour; } = {};
    private _world: World;

    constructor() {
        this._world = World.Instance;
    }

    /**
     * Adds behaviour object(s) corresponding to given BehaviourType.
     * 
     * @param {BehaviourType} type Enum with behaviour types.
     */
    public add(type: BehaviourType): void {
        if(type == BehaviourType.PURSUIT) {
            this.behaviours[BehaviourType.PURSUIT] = new PursuitBehaviour();
            this.behaviours[BehaviourType.PURSUIT].isActive = true;
        }
        if(type == BehaviourType.FLEE) {
            this.behaviours[BehaviourType.FLEE] = new FleeBehaviour();
            this.behaviours[BehaviourType.FLEE].isActive = true;
        }
        if(type == BehaviourType.ARRIVE) {
            this.behaviours[BehaviourType.ARRIVE] = new ArriveBehaviour();
            this.behaviours[BehaviourType.ARRIVE].isActive = true;
        }
        if(type == BehaviourType.FLOCK) {
            this.behaviours[BehaviourType.ALIGNMENT] = new FlockAlignmentBehaviour();
            this.behaviours[BehaviourType.COHESION] = new FlockCohesionBehaviour();
            this.behaviours[BehaviourType.SEPERATION] = new FlockSeperationBehaviour();
            this.behaviours[BehaviourType.ALIGNMENT].isActive = true;
            this.behaviours[BehaviourType.COHESION].isActive = true;
            this.behaviours[BehaviourType.SEPERATION].isActive = true;
        }
    }

    /**
     * Disables behaviour corresponding to given BehaviourType.
     * 
     * @param {BehaviourType} behaviour 
     */
    public toggleBehaviour(behaviour: BehaviourType) {
        this.behaviours[behaviour].isActive = !this.behaviours[behaviour].isActive;
    }

    /**
     * Sets behaviour weight corresponding to given BehaviourType.
     * 
     * @param {BehaviourType} behaviour 
     * @param {number} weight 
     */
    public setWeight(behaviour: BehaviourType, weight: number) {
        this.behaviours[behaviour].weight = weight/100.0;
    }

    /**
     * Calculates steering force based on all active behaviours.
     * 
     * @param {MovingEntity} entity 
     * @param {MovingEntity[]} otherEntities 
     * @returns {Vector2D}
     */
    public act(entity: MovingEntity, otherEntities: MovingEntity[]): Vector2D {
        let steeringForce: Vector2D = new Vector2D();

        for(let key in this.behaviours) {
            if(this.behaviours[key].isActive) {
                if(this.behaviours[key] instanceof TargetedBehaviour) {
                    steeringForce.add(this.behaviours[key].act(entity, this._world.target))
                } else {
                    steeringForce.add(this.behaviours[key].act(entity, otherEntities))
                }
            }
        }

        return steeringForce.capSpeed(entity.minSpeed, entity.maxSpeed);
    }
}

