import { Injectable } from '@angular/core';
import { AbstractSearchService} from './abstract-search.service';
import { Grid } from '../interfaces/grid.interface';
import { GridCell, GridState } from '../interfaces/grid-cell.interface';
import { PriorityQueue } from '../data-structures/priority-queue';

@Injectable({
  providedIn: 'root'
})
export class AStarSearchService extends AbstractSearchService {

  private pQueue: PriorityQueue;

  public async search(grid: Grid): Promise<GridCell> {    
    this.pQueue = new PriorityQueue();
    
    var distanceGrid = this.buildDistanceGrid(grid.getSize());

    var startPosition = grid.getStartPoint();
    var targetPosition = grid.getTargetPoint();
    
    this.pQueue.enqueue(startPosition, 0);
    distanceGrid[startPosition.getRow()][startPosition.getCol()] = 0;

    while(!this.pQueue.isEmpty()) {
      
      var currentCell: GridCell = this.pQueue.dequeue();

      if (!currentCell.equals(startPosition)) {
        await this.visitCell(grid, currentCell);
      }

      var neighbors = grid.findNeighbors(currentCell);

      for (var neighbor of neighbors) {
        
        
        if (neighbor.equals(targetPosition)) {
          neighbor.parentCell = currentCell;
          return neighbor;
        }

        var g = this.calcDistance(startPosition, neighbor);
        var h = this.calcDistance(neighbor, targetPosition);
        var totalDistance = g + h;

        if (totalDistance < distanceGrid[neighbor.getRow()][neighbor.getCol()]) {
          distanceGrid[neighbor.getRow()][neighbor.getCol()] = totalDistance;
          neighbor.parentCell = currentCell;
          this.pQueue.enqueue(neighbor, totalDistance);
        }
      }
    }

    return null;
  } 

  private calcDistance(cellA: GridCell, cellB: GridCell): number {
    var xDistance = Math.abs(cellA.getRow() - cellB.getRow());
    var yDistance = Math.abs(cellA.getCol() - cellB.getCol());
    return xDistance + yDistance;
  }

}
