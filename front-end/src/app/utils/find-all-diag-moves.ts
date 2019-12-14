import { Board } from '../models/board';
import { Cell } from '../models/cell';
import { checkForCheck } from './check-for-check';

export function findAllDiagMoves(cell: Cell, boardState: Board): Cell[] {
    const cellStates = boardState.cellStates;
    const position = cell.position;
    const availableMoves = [];

    // Down-Left
    let discontinue = false;
    for (let row = position[0] + 1; row < 8;) {
        for (let col = position[1] - 1; col >= 0; col--, row++) {
            // Out of bounds
            if (7 < row || row < 0 || 0 > col || col > 7) {
                discontinue = true;
                break;
            }
            const potentialCell = cellStates[row][col];
            // Blocked by own piece.
            if (potentialCell.player === cell.player) {
                discontinue = true;
                break;
            }
            // An empty space.
            if (!potentialCell.value) {
                !checkForCheck(cell, potentialCell, boardState) && availableMoves.push(potentialCell);
                continue;
            }
            // Capture enemy piece.
            if (potentialCell.player !== cell.player) {
                !checkForCheck(cell, potentialCell, boardState) && availableMoves.push(potentialCell);
                break;
            }
        }
        if (discontinue) {
            break;
        }
    }
    // Down-Right
    discontinue = false;
    for (let row = position[0] + 1; row < 8;) {
        for (let col = position[1] + 1; col < 8; col++, row++) {
            // Out of bounds
            if (7 < row || row < 0 || 0 > col || col > 7) {
                discontinue = true;
                break;
            }
            const potentialCell = cellStates[row][col];
            // Blocked by own piece.
            if (potentialCell.player === cell.player) {
                discontinue = true;
                break;
            }
            // An empty space.
            if (!potentialCell.value) {
                !checkForCheck(cell, potentialCell, boardState) && availableMoves.push(potentialCell);
                continue;
            }
            // Capture enemy piece.
            if (potentialCell.player !== cell.player) {
                !checkForCheck(cell, potentialCell, boardState) && availableMoves.push(potentialCell);
                break;
            }
        }
        if (discontinue) {
            break;
        }
    }
    // Up-left
    discontinue = false;
    for (let row = position[0] - 1; row >= 0;) {
        for (let col = position[1] - 1; col >= 0; col--, row--) {
            // Out of bounds
            if (7 < row || row < 0 || 0 > col || col > 7) {
                discontinue = true;
                break;
            }
            const potentialCell = cellStates[row][col];
            // Blocked by own piece.
            if (potentialCell.player === cell.player) {
                discontinue = true;
                break;
            }
            // An empty space.
            if (!potentialCell.value) {
                !checkForCheck(cell, potentialCell, boardState) && availableMoves.push(potentialCell);
                continue;
            }
            // Capture enemy piece.
            if (potentialCell.player !== cell.player) {
                !checkForCheck(cell, potentialCell, boardState) && availableMoves.push(potentialCell);
                break;
            }
        }
        if (discontinue) {
            break;
        }
    }
    // Up-right
    discontinue = false;
    for (let row = position[0] - 1; row >= 0;) {
        for (let col = position[1] + 1; col < 8; col++, row--) {
            // Out of bounds
            if (7 < row || row < 0 || 0 > col || col > 7) {
                console.log('Diag-check', 'Up-right', row, col, 'Out of bounds');
                discontinue = true;
                break;
            }
            const potentialCell = cellStates[row][col];
            // Blocked by own piece.
            if (potentialCell.player === cell.player) {
                console.log('Diag-check', 'Up-right', row, col, 'Blocked by own piece');
                discontinue = true;
                break;
            }
            // An empty space.
            if (!potentialCell.value) {
                console.log('Diag-check', 'Up-right', row, col, 'An empty space');
                !checkForCheck(cell, potentialCell, boardState) && availableMoves.push(potentialCell);
                continue;
            }
            // Capture enemy piece.
            if (potentialCell.player !== cell.player) {
                console.log('Diag-check', 'Up-right', row, col, 'Capture enemy piece');
                !checkForCheck(cell, potentialCell, boardState) && availableMoves.push(potentialCell);
                break;
            }
        }
        if (discontinue) {
            console.log('Diag-check', 'Up-right', row, 'Discontinue');
            break;
        }
    }

    return availableMoves;
}
