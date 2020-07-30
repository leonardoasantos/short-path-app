import { Injectable } from '@angular/core';
import { AbstractSearchService} from './abstract-search.service';
import { Grid } from '../interfaces/grid.interface';
import { GridCell, GridState } from '../interfaces/grid-cell.interface';

@Injectable({
  providedIn: 'root'
})
export class BreadthFirstSearchService extends AbstractSearchService {

  public async search(grid: Grid): Promise<GridCell> {
    var queue: GridCell[] = [];
    var isAddedToQueue: boolean[][] = this.buildBooleanGrid(grid.getSize());

    var startPoint = grid.getStartPoint();
    var targetPoint = grid.getTargetPoint();

    queue.push(startPoint);
    isAddedToQueue[startPoint.getRow()][startPoint.getCol()] = true;

    var neighbors: GridCell[];

    while(queue.length > 0) {
      
      // Visit first cell from the queue.
      var currentCell: GridCell = queue.shift();

      if (!currentCell.equals(startPoint)) {
        await this.visitCell(grid, currentCell);
      }
      
      // Check if Target was found.
      if (currentCell.equals(targetPoint)) {
        return currentCell;
      }

      // Find all non-visited neighbors
      neighbors = grid.findNeighbors(currentCell);
      
      // Add each neighbor to the queue.
      for(var neighbor of neighbors) {
        
        if (!isAddedToQueue[neighbor.getRow()][neighbor.getCol()]) {  
          isAddedToQueue[neighbor.getRow()][neighbor.getCol()] = true;
          neighbor.parentCell = currentCell;
          queue.push(neighbor);
        }

      }
    }

    return null;
  }    
}
