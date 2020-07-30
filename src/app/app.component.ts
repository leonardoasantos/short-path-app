import { Component, OnInit } from '@angular/core';
import { Grid } from './interfaces/grid.interface';
import { GridCell } from './interfaces/grid-cell.interface';
import { UserSelectionState } from './interfaces/user-selection-state.interface';
import { BreadthFirstSearchService } from './services/breadth-first-search.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public grid: Grid;
  
  public userState: UserSelectionState;

  public searchResultMessage: string

  private gridSize: number;

  public constructor(private bfs: BreadthFirstSearchService){};

  ngOnInit() {
    this.gridSize = 50;
    this.resetGrid();
  }
  
  public resetGrid(): void {
    this.grid = new Grid(this.gridSize);
    this.userState = UserSelectionState.SELECT_START_POINT;
    this.searchResultMessage = null;
  }

  public onGridClick(row: number, col: number) {
    
    switch (this.userState) {
      
      case UserSelectionState.SEARCH_RUNNING:
        break;

      case UserSelectionState.SELECT_START_POINT:
        this.selectStartPoint(row, col);
        this.userState = UserSelectionState.SELECT_TARGET_POINT;
        break;

      case UserSelectionState.SELECT_TARGET_POINT:
        this.selectTargetPoint(row, col);
        this.userState = UserSelectionState.ADD_OBSTACLES;
        break;

      case UserSelectionState.ADD_OBSTACLES:
        this.addGridObstacle(row, col);  
        break;
    }

  }

  public addGridObstacle(row: number, col: number): void {
    if (this.userState != UserSelectionState.ADD_OBSTACLES) {
      return;
    }

    this.grid.addObstacle(row, col);
    this.userState = UserSelectionState.ADDING_MULTIPLE_OBSTACLE;
  }

  public mouseOver(row: number, col: number): void {
    if (this.userState != UserSelectionState.ADDING_MULTIPLE_OBSTACLE) {
      return;
    }

    this.grid.addObstacle(row, col);
  }

  public mouseUp(): void {
    if (this.userState != UserSelectionState.ADDING_MULTIPLE_OBSTACLE) {
      return;
    }
    
    this.userState = UserSelectionState.ADD_OBSTACLES;
  }
  
  private selectStartPoint(row: number, col: number): void {
    this.grid.setStartPoint(row, col);
  }

  private selectTargetPoint(row: number, col: number): void {
    this.grid.setTargetPoint(row, col);
  }

  public async breadthFirstSearch(): Promise<void> {
    this.userState = UserSelectionState.SEARCH_RUNNING;
    var targetCell: GridCell = await this.bfs.search(this.grid);

    if (!targetCell) {
      this.searchResultMessage = "Target Not found!";
    } else {
      this.searchResultMessage = "Target was found!";
      
      var cell: GridCell = targetCell;

      while(cell) {
        this.grid.addToPathRoute(cell);
        cell = cell.parentCell;
      }
      
    }


    this.userState = UserSelectionState.IDLE;
  }

}
