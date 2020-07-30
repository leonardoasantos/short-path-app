export class GridCell {
    private row: number;
    private col: number;
    parentCell: GridCell;
    state: GridState;
    class: GridClass;

    public constructor(row: number, col: number, state: GridState) {
        this.row = row;
        this.col = col;
        this.parentCell = null;
        this.setState(state);
    }

    public getRow(): number {
        return this.row;
    }

    public getCol(): number {
        return this.col;
    }

    public setState(state: GridState): void {
        this.state = state;
        this.class = this.getClassFromState(state);
    }

    public equals(other: GridCell): boolean {
        return (this.getRow() == other.getRow() && this.getCol() == other.getCol());
    }

    private getClassFromState(state: GridState): GridClass {
        var returnClass: GridClass;

        switch (state) {
            case GridState.START_POINT:
            returnClass = GridClass.CLASS_START_POINT;
            break;
            case GridState.TARGET_POINT:
            returnClass = GridClass.CLASS_TARGET_POINT;
            break;
            case GridState.BLOCKED:
            returnClass = GridClass.CLASS_BLOCKED;
            break;
            case GridState.VISITED:
            returnClass = GridClass.CLASS_VISITED;
            break;
            default:
            returnClass = GridClass.CLASS_EMPTY;
            break;
        }

        return returnClass;
    }
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