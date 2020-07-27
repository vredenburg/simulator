import { SteeringBehaviour } from "../SteeringBehaviour";
import { Vector2D } from "../../util/Vector2D";
import { MovingEntity } from "../../entities/MovingEntity";

// deprecated
export class FlockBehaviour extends SteeringBehaviour {
    private total: number = 0;

    // experimental
    private findNearbyEntities(thisEntity: MovingEntity, otherEntities: MovingEntity[]): MovingEntity[] {
        let nearbyEntities: Array<MovingEntity> = new Array<MovingEntity>();
        
        for(let other of otherEntities) {
            let d: number = thisEntity.position
                .clone()
                .sub(other.position)
                .lengthSquared();
            
            
            if(thisEntity.position.isNot(other.position) && d < thisEntity.perceptionRadius) {
                nearbyEntities.push(thisEntity);
                this.total++;
            }
        }
        return nearbyEntities;
    }

    private seperate(thisEntity: MovingEntity, otherEntities: MovingEntity[], avg: Vector2D): Vector2D {
        for(let other of otherEntities) {
            let d: number = thisEntity.position
                .clone()
                .sub(other.position)
                .lengthSquared();
            
            if(thisEntity.position.isNot(other.position) && d < thisEntity.perceptionRadius && d < thisEntity.presence) {
                let diff: Vector2D = thisEntity.position
                    .clone()
                    .sub(other.position)
                    .multiply(d);
                avg.add(diff);
                this.total++;
            }
        }
        if(this.total > 0) {
            avg
            .divide(this.total);
        }
        return avg;
    }  
    
    private align(thisEntity: MovingEntity, otherEntities: MovingEntity[], avg: Vector2D): Vector2D {
        for(let other of otherEntities) {
            let d: number = thisEntity.position
                .clone()
                .sub(other.position)
                .lengthSquared();
            
            if(thisEntity.position.isNot(other.position) && d < thisEntity.perceptionRadius) {
                avg.add(other.velocity);
                this.total++;
            }
        }
        if(this.total > 0) {
            avg.divide(this.total);
        }
        return avg;
    }

    private cohesion(thisEntity: MovingEntity, otherEntities: MovingEntity[], avg: Vector2D): Vector2D {
        for(let other of otherEntities) {
            let d: number = thisEntity.position
                .clone()
                .sub(other.position)
                .lengthSquared();
            
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
        let avg: Vector2D = new Vector2D(0,0);

        avg.add(this.cohesion(thisEntity, otherEntities, avg)); 
        avg.add(this.align(thisEntity, otherEntities, avg));
        avg.add(this.seperate(thisEntity, otherEntities, avg));
        
        this.total = 0;
   
        return avg;
    }
}