export enum Circle {
    SIZE = 5,
    START_ANGLE = 0,
    END_ANGLE = 2 * Math.PI
}

export enum Deceleration {
    SLOW = 3,
    NORMAL = 2,
    FAST = 1
}

export enum BehaviourType {
    SEEK = 0,
    FLEE = 1,
    ARRIVE = 2,
    FLOCK = 3
}