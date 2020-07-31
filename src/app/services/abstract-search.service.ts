import { Injectable } from '@angular/core';
import { GridCell, GridState } from '../interfaces/grid-cell.interface';
import { Grid } from '../interfaces/grid.interface';

@Injectable({
  providedIn: 'root'
})
export abstract class AbstractSearchService {

    protected async visitCell(grid: Grid, cell: GridCell) {
        grid.visitCell(cell);
        await new Promise(r => setTimeout(r, 10)); 
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

    protected buildDistanceGrid(size: number): number[][] {
        var grid: number[][] = [];

        for(var row = 0; row < size; row++) {
            var distRow: number[] = [];
            for (var col = 0; col < size; col++) {
                distRow.push(Number.MAX_VALUE);
            }
            grid.push(distRow);
        }

        return grid;
    }
}