import { GridCell, GridState } from './grid-cell.interface';

export class Grid {
    private grid: GridCell[][];
    private size: number;
    private startPoint: GridCell;
    private targetPoint: GridCell;

    public constructor(size: number) {
        this.size = size;
        this.grid = this.buildGrid(size);
    }
    
    public get(row: number, col: number): GridCell {
        return this.grid[row][col];
    }

    public getSize(): number {
        return this.size;
    }

    public getStartPoint(): GridCell {
        return this.startPoint;
    }

    public setStartPoint(row: number, col: number) {
        this.startPoint = this.grid[row][col];
        this.grid[row][col].setState(GridState.START_POINT);
    }

    public getTargetPoint(): GridCell {
        return this.targetPoint;
    }

    public setTargetPoint(row: number, col: number) {
        this.targetPoint = this.grid[row][col];
        this.grid[row][col].setState(GridState.TARGET_POINT);
    }

    public visitCell(cell: GridCell) {
        this.grid[cell.getRow()][cell.getCol()].setState(GridState.VISITED);
    }

    public addObstacle(row: number, col: number) {
        this.grid[row][col].setState(GridState.BLOCKED);
    }

    public getGrid(): GridCell[][] {
        return this.grid;
    }

    private buildGrid(size: number): GridCell[][] {
        var grid = [];
        for (var row = 0; row < size; row++) {
            var rowArray = [];
            for (var col = 0; col < size; col++) {
                rowArray.push(new GridCell(row, col, GridState.EMPTY));
            }
            grid.push(rowArray);
        }
        return grid;
    }
}