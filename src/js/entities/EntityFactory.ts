import { MovingEntity, PlayerEntity, StaticEntity} from "./";
import { Swarm } from "./Swarm";
import { BehaviourType } from "../util/Enums";

export abstract class EntityFactory {

    /**
     * Creates a new Swarm object.
     * 
     * @param {number} xSpawn Spawn location on the x-axis.
     * @param {number} ySpawn Spawn location on the y-axis.
     */
    public static getSwarmEntity(xSpawn: number, ySpawn: number): Swarm {
        let swarm = new Swarm(xSpawn, ySpawn, 30);

        swarm.entities.forEach(e => {
            e.behaviourSet.add(BehaviourType.FLOCK);
        });

        return swarm;
    }

    /**
     * Creates a new MovingEntity object.
     * 
     * @param {number} xSpawn Spawn location on the x-axis.
     * @param {number} ySpawn Spawn location on the y-axis.
     * @description Temporary testing method.
     */
    public static getMovingEntity(xSpawn: number, ySpawn: number): MovingEntity  {
        let movingEntity: MovingEntity = new MovingEntity(xSpawn, ySpawn);

        movingEntity.behaviourSet.add(BehaviourType.PURSUIT);
        movingEntity.behaviourSet.add(BehaviourType.SEPERATION);
       
        return movingEntity;
    }

    /**
     * Creates a new MovingEntity object.
     * 
     * @param {number} xSpawn Spawn location on the x-axis.
     * @param {number} ySpawn Spawn location on the y-axis.
     * @param {number} width StaticEntity width.
     * @param {number} heigth StaticEntity height.
     * @description Temporary testing method.
     */
    public static getStaticEntity(xSpawn: number, ySpawn: number, width: number, height: number): StaticEntity {
        return new StaticEntity(xSpawn, ySpawn, width, height);
    }

    /**
     * @todo not yet implemented
     */
    public static getPlayerEntity(): PlayerEntity {
        return;
    }
}