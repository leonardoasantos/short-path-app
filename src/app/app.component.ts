import { Component, OnInit } from '@angular/core';
import { Grid } from './interfaces/grid.interface';
import { GridCell, GridState } from './interfaces/grid-cell.interface';
import { UserSelectionState } from './interfaces/user-selection-state.interface';
import { BreadthFirstSearchService } from './services/breadth-first-search.service';
import { AStarSearchService } from './services/a-star-search.service';
import SampleGridBlocks from '../assets/grids/sample-blocks.json'
import Grid30Hidden from '../assets/grids/grid-30-hidden.json'
import Grid50Hidden from '../assets/grids/grid-50-hidden.json'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public grid: Grid;
  
  public userState: UserSelectionState;

  public gridSamples = [SampleGridBlocks, Grid30Hidden, Grid50Hidden];

  public instructions = ["Do you want to select a pre-defined grid?", 
                          "#1: Choose your start position", 
                          "#2: Choose your target position", 
                          "#3: Click on grid to add any obstacle.", 
                          "#4: Select the short path method:"];

  public searchDescription: string;

  public searchResultMessage: string;
  
  private gridSize: number;
  
  readonly gridMaxSize: number = 50;

  public constructor(private bfs: BreadthFirstSearchService, private aStar: AStarSearchService){};

  ngOnInit() {
    this.gridSize = this.calcGridMaxSize();
    this.resetGrid();        
  }

  public resetGrid(): void {
    this.grid = new Grid(this.gridSize);
    this.userState = UserSelectionState.CHOOSE_SAMPLE_GRID;
    this.searchResultMessage = null;
    this.searchDescription = null;
  }

  public loadGridSample(bGrid: boolean[][]): void {
    if (bGrid) {
      this.grid.loadGrid(bGrid);  
    }
    this.userState = UserSelectionState.SELECT_START_POINT;
  }

  public onGridClick(row: number, col: number) {
    
    switch (this.userState) {
      
      case UserSelectionState.CHOOSE_SAMPLE_GRID:
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
    this.searchDescription = this.bfs.getDescription();
    var targetCell: GridCell = await this.bfs.search(this.grid);
    this.showSearchResult(targetCell);
  }

  public async aStarSearch(): Promise<void> {
    this.userState = UserSelectionState.SEARCH_RUNNING;
    this.searchDescription = this.aStar.getDescription();
    var targetCell: GridCell = await this.aStar.search(this.grid);
    this.showSearchResult(targetCell);
  }

  private showSearchResult(cell: GridCell): void {
    if (!cell) {
      this.searchResultMessage = "Target Not found!";
    } else {
      this.searchResultMessage = "Target was found!";
      
      var routeCell: GridCell = cell;

      while(routeCell) {
        this.grid.addToPathRoute(routeCell);
        routeCell = routeCell.parentCell;
      }
      
    }


    this.userState = UserSelectionState.IDLE;
  }

  private calcGridMaxSize(): number {
    const gridCellSize = 20;
    const paddingSize = 30;
    const windowSize = window.innerWidth * 0.92;
    const bootsrapMdSize = 768;

    if (windowSize <= bootsrapMdSize) {
      return windowSize / gridCellSize;
    }

    const domColSize = 8;
    const domMaxSize = 12;

    var gridSize = (domColSize / domMaxSize) * windowSize / gridCellSize;

    return gridSize > this.gridSize ? this.gridSize : gridSize;
  }
}
