import {Entity, MovingEntity, PlayerEntity, StaticEntity} from "./";
import { wtf } from "../util/WhyCantJSDoThisProperly";

export class EntityFactory {

    public getNewMovingEntities(amount: number, worldWidth: number, worldHeight: number): MovingEntity[] {
        let entities: MovingEntity[];

        for(let i = 0; i < amount; i++) {
            entities.push(new MovingEntity(wtf.random(worldWidth),wtf.random(worldHeight)));
        }
        return entities;
    }

    public addPlayerEntity(): void {
        // this.movingEntities.push(new PlayerEntity(300,300));
        return
    }
}