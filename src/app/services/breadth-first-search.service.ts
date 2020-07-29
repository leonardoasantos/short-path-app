import { Injectable } from '@angular/core';
import { GridCell, GridState } from '../interfaces/grid-cell.interface';

@Injectable({
  providedIn: 'root'
})
export class BreadthFirstSearchService {

  constructor() { }

  public async search(grid: GridCell[][], start: GridCell, target: GridCell): Promise<void> {
    var queue: GridCell[] = [];

    queue.push(start);
    
    var neighbors: GridCell[];

    while(queue.length > 0) {
      // Pop the first cell from the queue.
      var cell: GridCell = queue.shift();

      // Find all non-visited neighbors
      neighbors = await this.findNeighbors(cell, grid);
      
      // For each neighbor found: check if is the target. otherwise, add to the queue.
      for(var neighbor of neighbors) {
        if (target.equals(neighbor)) {
          return;
        }
        queue.push(neighbor);
      }
    }
  }
  
  private async findNeighbors(cell: GridCell, grid: GridCell[][]): Promise<GridCell[]> {
    var lastValidIndex: number = grid.length - 1;
    var neighbors: GridCell[] = [];    
    
    var minRow: number = cell.getRow() > 0 ? cell.getRow() - 1 : 0;
    var maxRow: number = cell.getRow() == lastValidIndex ? lastValidIndex : cell.getRow() + 1;

    var minCol: number = cell.getCol() > 0 ? cell.getCol() - 1 : 0;
    var maxCol: number = cell.getCol() == lastValidIndex ? lastValidIndex : cell.getCol() + 1;

    for (var row = minRow; row <= maxRow; row++) {
      for (var col = minCol; col <= maxCol; col++) {
        
        var state = grid[row][col].state;

        if(state == GridState.EMPTY || state == GridState.TARGET_POINT) {
          
          if(state != GridState.TARGET_POINT) {
            grid[row][col].setState(GridState.VISITED);
          }
          
          neighbors.push(grid[row][col]);

          await new Promise(r => setTimeout(r, 100));
        }

      }
    }

    return neighbors;
  }
}
