import { Component, OnInit } from '@angular/core';
import { Grid } from './interfaces/grid.interface';
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

  private gridSize: number;

  public constructor(private bfs: BreadthFirstSearchService){};

  ngOnInit() {
    this.gridSize = 50;
    this.userState = UserSelectionState.SELECT_START_POINT;
    this.grid = new Grid(this.gridSize);
  }
  
  public resetGrid(): void {
    this.grid = new Grid(this.gridSize);
    this.userState = UserSelectionState.SELECT_START_POINT;
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
  
  public async breadthFirstSearch(): Promise<void> {
    this.userState = UserSelectionState.SEARCH_RUNNING;
    await this.bfs.search(this.grid);
    this.userState = UserSelectionState.IDLE;
  }

  private selectStartPoint(row: number, col: number): void {
    this.grid.setStartPoint(row, col);
  }

  private selectTargetPoint(row: number, col: number): void {
    this.grid.setTargetPoint(row, col);
  }

}
