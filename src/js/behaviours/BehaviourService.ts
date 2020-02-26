import { SteeringBehaviour } from "./SteeringBehaviour";
import { Vector2D } from "../util/Vector2D";
import { MovingEntity } from "../entities/MovingEntity";
import { BehaviourType } from "../util/Enums";
import {SeekBehaviour, FleeBehaviour, ArriveBehaviour, FlockBehaviour, FlockAlignmentBehaviour, FlockCohesionBehaviour, FlockSeperationBehaviour} from "./";
import { TargetedBehaviour } from "./TargetedBehaviour";
import { World } from "../world/World";

export class BehaviourService {
    public behaviours: { [id: number]: SteeringBehaviour; } = {};
    public _world: World;

    constructor() {
        this._world = World.Instance;
        this.behaviours[BehaviourType.FLOCK] = new FlockBehaviour();
        this.behaviours[BehaviourType.ALIGNMENT] = new FlockAlignmentBehaviour;
        this.behaviours[BehaviourType.COHESION] = new FlockCohesionBehaviour;
        this.behaviours[BehaviourType.SEPERATION] = new FlockSeperationBehaviour;

        this.behaviours[BehaviourType.SEEK] = new SeekBehaviour;
        this.behaviours[BehaviourType.FLEE] = new FleeBehaviour;
        this.behaviours[BehaviourType.ARRIVE] = new ArriveBehaviour;

        this.behaviours[BehaviourType.FLOCK].isActive = true;
        // this.behaviours[BehaviourType.FLEE].isActive = true;
        // this.behaviours[BehaviourType.ARRIVE].isActive = true;

        // this.behaviours[BehaviourType.ALIGNMENT].isActive = true;
        // this.behaviours[BehaviourType.COHESION].isActive = true;
        // this.behaviours[BehaviourType.SEPERATION].isActive = true;
    }

    public toggleBehaviour(behaviour: BehaviourType) {
        this.behaviours[behaviour].isActive = !this.behaviours[behaviour].isActive;
    }

    public setWeight(behaviour: BehaviourType, weight: number) {
        this.behaviours[behaviour].weight = weight/100;
    }

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

        return steeringForce;
    }
}

