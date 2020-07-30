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

  // private findNeighbors(cell: GridCell, grid: Grid): GridCell[] {
  //   var lastValidIndex: number = grid.getSize() - 1;
  //   var neighbors: GridCell[] = [];    
    
  //   var cellRow = cell.getRow();
  //   var cellCol = cell.getCol();

  //   if (cellRow > 0) {
  //     neighbors.push(grid.get(cellRow - 1, cellCol));
  //   }

  //   if (cellRow < lastValidIndex) {
  //     neighbors.push(grid.get(cellRow + 1, cellCol));
  //   }

  //   if (cellCol > 0) {
  //     neighbors.push(grid.get(cellRow, cellCol - 1));
  //   }

  //   if (cellCol < lastValidIndex) {
  //     neighbors.push(grid.get(cellRow, cellCol + 1));
  //   }

  //   // var minRow: number = cell.getRow() > 0 ? cell.getRow() - 1 : 0;
  //   // var maxRow: number = cell.getRow() == lastValidIndex ? lastValidIndex : cell.getRow() + 1;

  //   // var minCol: number = cell.getCol() > 0 ? cell.getCol() - 1 : 0;
  //   // var maxCol: number = cell.getCol() == lastValidIndex ? lastValidIndex : cell.getCol() + 1;

  //   // for (var row = minRow; row <= maxRow; row++) {
  //   //   for (var col = minCol; col <= maxCol; col++) {
  //   //       if (grid.get(row, col).state != GridState.BLOCKED) {
  //   //         neighbors.push(grid.get(row,col));
  //   //       }
  //   //   }
  //   // }

  //   return neighbors;
  // }

  

}
