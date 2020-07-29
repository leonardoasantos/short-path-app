import { Injectable } from '@angular/core';
import { AbstractSearchService} from './abstract-search.service';
import { Grid } from '../interfaces/grid.interface';
import { GridCell, GridState } from '../interfaces/grid-cell.interface';

@Injectable({
  providedIn: 'root'
})
export class BreadthFirstSearchService extends AbstractSearchService {

  public async search(grid: Grid): Promise<void> {
    var queue: GridCell[] = [];
    var isAddedToQueue: boolean[][] = this.buildBooleanGrid(grid.getSize());

    var startPoint = grid.getStartPoint();
    var targetPoint = grid.getTargetPoint();

    queue.push(startPoint);
    isAddedToQueue[startPoint.getRow()][startPoint.getCol()];

    var neighbors: GridCell[];

    while(queue.length > 0) {
      
      // Visit first cell from the queue.
      var currentCell: GridCell = queue.shift();
      await this.visitCell(grid, currentCell);
      
      if (currentCell.equals(targetPoint)) {
        console.log("Target found!")
        return;
      }

      // Find all non-visited neighbors
      neighbors = this.findNeighbors(currentCell, grid);
      
      // Add each neighbor to the queue.
      for(var neighbor of neighbors) {
        if (!isAddedToQueue[neighbor.getRow()][neighbor.getCol()]) {  
          isAddedToQueue[neighbor.getRow()][neighbor.getCol()] = true;
          queue.push(neighbor);
        }
      }

    }
  }    

  private findNeighbors(cell: GridCell, grid: Grid): GridCell[] {
    var lastValidIndex: number = grid.getSize() - 1;
    var neighbors: GridCell[] = [];    
    
    var minRow: number = cell.getRow() > 0 ? cell.getRow() - 1 : 0;
    var maxRow: number = cell.getRow() == lastValidIndex ? lastValidIndex : cell.getRow() + 1;

    var minCol: number = cell.getCol() > 0 ? cell.getCol() - 1 : 0;
    var maxCol: number = cell.getCol() == lastValidIndex ? lastValidIndex : cell.getCol() + 1;

    for (var row = minRow; row <= maxRow; row++) {
      for (var col = minCol; col <= maxCol; col++) {
          if (grid.get(row, col).state != GridState.BLOCKED) {
            neighbors.push(grid.get(row,col));
          }
      }
    }

    return neighbors;
  }

  

}
