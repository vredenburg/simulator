import { SteeringBehaviour } from "./SteeringBehaviour";
import { Entity } from "../entities";

export abstract class TargetedBehaviour extends SteeringBehaviour {
    target: Entity;
}