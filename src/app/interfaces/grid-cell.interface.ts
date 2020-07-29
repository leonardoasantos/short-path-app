export interface GridCell {
    state: GridState;
    class: GridClass;
}

export enum GridState {
    START_POINT,
    TARGET_POINT,
    EMPTY,
    VISITED,
    BLOCKED   
}

export enum GridClass {
    CLASS_START_POINT = "grid-cell-start-point",
    CLASS_TARGET_POINT = "grid-cell-target-point",
    CLASS_EMPTY = "grid-cell-empty",
    CLASS_VISITED = "grid-cell-visited",
    CLASS_BLOCKED = "grid-cell-blocked"
}