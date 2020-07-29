import { Injectable } from '@angular/core';
import { GridCell, GridState } from '../interfaces/grid-cell.interface';

@Injectable({
  providedIn: 'root'
})
export abstract class AbstractSearchService {

    protected async visiteNode(grid: GridCell[][], cell: GridCell) {
        grid[cell.getRow()][cell.getCol()].setState(GridState.VISITED);
        await new Promise(r => setTimeout(r, 500)); 
    }

    protected buildBooleanGrid(size: number): boolean[][] {
        var grid: boolean[][] = [];

        for(var row = 0; row < size; row++) {
            var booleanRow: boolean[] = [];
            for (var col = 0; col < size; col++) {
            booleanRow.push(false);
            }
            grid.push(booleanRow);
        }

        return grid;
    }
}