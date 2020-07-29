import { Component, OnInit } from '@angular/core';
import { GridCell, GridState, GridClass } from './interfaces/grid-cell.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public grid: GridCell[][];

  private gridSize: number;

  ngOnInit() {
    this.gridSize = 10;
    this.initGrid();
  }

  private initGrid(): void {
    this.grid = [];

    for (var i = 0; i < this.gridSize; i++) {
      var row = [];
      for (var j = 0; j < this.gridSize; j++) {
        row.push({state: GridState.EMPTY, class: GridClass.CLASS_EMPTY});
      }
      this.grid.push(row);
    }

    this.setCellState(4, 2, GridState.START_POINT);
    this.setCellState(8, 9, GridState.TARGET_POINT);
  }
 
  private setCellState(row: number, col: number, state: GridState) {
    this.grid[row][col].state = GridState.START_POINT;
    this.grid[row][col].class = this.getClassFromState(state);
  }
  
  

  public addGridObstacle(row: number, col: number): void {
    this.setCellState(row, col, GridState.BLOCKED);
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
