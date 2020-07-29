import { Component, OnInit } from '@angular/core';
import { Grid } from './interfaces/grid.interface';
import { BreadthFirstSearchService } from './services/breadth-first-search.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public grid: Grid;
  
  private gridSize: number;

  public constructor(private bfs: BreadthFirstSearchService){};

  ngOnInit() {
    this.gridSize = 50;
    this.grid = new Grid(this.gridSize);
    this.grid.setStartPoint(10, 10);
    this.grid.setTargetPoint(32, 31);
  }

  public addGridObstacle(row: number, col: number): void {
    this.grid.addObstacle(row, col);
  }

  public breadthFirstSearch(): void {
    this.bfs.search(this.grid);
  }
}
