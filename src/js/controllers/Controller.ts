import { Entity } from "../entities"

export interface Controller {
    update(entity: Entity, entities: Entity[]): void;
    render(entity: Entity, otherEntities: Entity[]): void;
}