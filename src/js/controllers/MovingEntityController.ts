import { Controller } from "./Controller"
import { Entity, MovingEntity } from "../entities";
import { World } from "../world/World";
import { BehaviourService } from "../behaviours";
import { Vector2D } from "../util/Vector2D"
import { wtf } from "../util/WhyCantJSDoThisProperly";
import { BehaviourType } from "../util/Enums";

export class MovingEntityController implements Controller {
    
    private _world: World;
    private _behaviourService: BehaviourService;

    public movingEntities: Array<MovingEntity>;

    private seperationSlider: HTMLInputElement;
    private alignmentSlider: HTMLInputElement;
    private cohesionSlider: HTMLInputElement;

    constructor() {
        this._world = World.Instance;
        this._behaviourService = new BehaviourService();

        this.alignmentSlider = <HTMLInputElement> document.getElementById("alignmentWeight");
        this.alignmentSlider.oninput = this.alignmentChanged;
        this.seperationSlider = <HTMLInputElement> document.getElementById("seperationWeight");
        this.seperationSlider.oninput = this.seperationChanged;
        this.cohesionSlider = <HTMLInputElement> document.getElementById("cohesionWeight");
        this.cohesionSlider.oninput = this.cohesionChanged;
    }
    
    public update(entity: MovingEntity, entities: MovingEntity[]): Vector2D {

        let steeringForce: Vector2D = new Vector2D();

        steeringForce = this._behaviourService.act(entity, entities);
        let acceleration: Vector2D = steeringForce.divide(entity.mass);

        entity.velocity
        .add(acceleration.multiply(this._world.gameSpeed))
        .truncate(entity.minSpeed, entity.maxSpeed)
        .multiply((this._world.gameSpeed));

        entity.position.add(entity.velocity);

        return this.wrapAround(entity.position);
    }

    public render(entity: Entity, otherEntities: Entity[]): void {

    }

    public wrapAround(entityPosition: Vector2D): Vector2D {
        // a custom modulo function is used here because apparantly JS' implementation of % can't deal with negative numbers
        return new Vector2D(wtf.mod(entityPosition.x,  this._world.canvas.width), wtf.mod(entityPosition.y, this._world.canvas.height));
    }

    public seperationChanged = (e: Event): void => {
        console.log(this.seperationSlider.value);
        this._behaviourService.setWeight(BehaviourType.SEPERATION, +this.seperationSlider.value);
    }
    public alignmentChanged = (e: Event): void => {
        console.log(this.alignmentSlider.value);
        this._behaviourService.setWeight(BehaviourType.ALIGNMENT, +this.seperationSlider.value);
    }
    public cohesionChanged = (e: Event): void => {
        console.log(this.cohesionSlider.value);
        this._behaviourService.setWeight(BehaviourType.COHESION, +this.seperationSlider.value);
    }

    public toggleBehaviour = (e: Event): void => {
        
    }
}