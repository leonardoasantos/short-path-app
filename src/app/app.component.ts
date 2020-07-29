import { Component, OnInit } from '@angular/core';
import { GridCell, GridState, GridClass } from './interfaces/grid-cell.interface';
import { BreadthFirstSearchService } from './services/breadth-first-search.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public grid: GridCell[][];

  private gridSize: number;
  private startPoint: GridCell;
  private targetPoint: GridCell;

  public constructor(private bfs: BreadthFirstSearchService){};

  ngOnInit() {
    this.gridSize = 50;
    this.initGrid();
  }

  private initGrid(): void {
    this.grid = [];

    for (var row = 0; row < this.gridSize; row++) {
      var rowArray = [];
      for (var col = 0; col < this.gridSize; col++) {
        rowArray.push(new GridCell(row, col, GridState.EMPTY));
      }
      this.grid.push(rowArray);
    }

    this.grid[4][2].setState(GridState.START_POINT);
    this.startPoint = this.grid[4][2];

    this.grid[30][19].setState(GridState.TARGET_POINT);
    this.targetPoint = this.grid[30][19];
  }
 
  public addGridObstacle(row: number, col: number): void {
    this.grid[row][col].setState(GridState.BLOCKED);
  }

  public breadthFirstSearch(): void {
    this.bfs.search(this.grid, this.startPoint, this.targetPoint);
  }
}
