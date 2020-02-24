import { SteeringBehaviour } from "./SteeringBehaviour";
import { Vector2D } from "../util/Vector2D";
import { MovingEntity } from "../entities/MovingEntity";
import { Entity } from "../entities/Entity";

export class FlockCohesionBehaviour extends SteeringBehaviour {

    private total: number = 0;

    constructor() {
        super();
    }

    // experimental
    private findNearbyEntities(thisEntity: MovingEntity, otherEntities: MovingEntity[]): MovingEntity[] {
        let nearbyEntities: Array<MovingEntity> = new Array<MovingEntity>();
        
        for(let other of otherEntities) {
            let d: number = thisEntity.position
                .clone()
                .sub(other.position)
                .distanceSquared();
            
            
            if(thisEntity.position.isNot(other.position) && d < thisEntity.perceptionRadius) {
                nearbyEntities.push(thisEntity);
                this.total++;
            }
        }
        return nearbyEntities;
    }

    private cohesion(thisEntity: MovingEntity, otherEntities: MovingEntity[], avg: Vector2D): Vector2D {
        for(let other of otherEntities) {
            let d: number = thisEntity.position
                .clone()
                .sub(other.position)
                .distanceSquared();
            
            if(thisEntity.position.isNot(other.position) && d < thisEntity.perceptionRadius) {
                avg.add(other.position);
                this.total++;
            }
        }
        if(this.total > 0) {
            avg
            .sub(thisEntity.position)
            .divide(this.total);
        }
        return avg;
    }
    
    public act(thisEntity: MovingEntity, otherEntities: MovingEntity[]): Vector2D {
        // let nearbyEntities: Array<MovingEntity> = this.findNearbyEntities(thisEntity,otherEntities);
        let avg: Vector2D = new Vector2D(0,0);
        // console.log(avg);
        // if(this.total > 0) {
        //     avg = this.align(thisEntity, nearbyEntities, avg);
        // }
        
        avg.add(this.cohesion(thisEntity, otherEntities, avg)); 
        // avg.sub(thisEntity.velocity);
        
        this.total = 0;
        // console.log(avg);    
        return avg;
    }
}