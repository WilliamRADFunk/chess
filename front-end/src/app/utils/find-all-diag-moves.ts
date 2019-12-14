import { Board } from '../models/board';
import { Cell } from '../models/cell';
import { checkForCheck } from './check-for-check';

export function findAllDiagMoves(cell: Cell, boardState: Board): Cell[] {
    const cellStates = boardState.cellStates;
    const position = cell.position;
    const availableMoves = [];

    // Down-Left
    for (let row = position[0] + 1, col = position[1] - 1; row < 8 && col >= 0; col--, row++) {
        // Out of bounds
        if (7 < row || row < 0 || 0 > col || col > 7) {
            break;
        }
        const potentialCell = cellStates[row][col];
        // Blocked by own piece.
        if (potentialCell.player === cell.player) {
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
    // Down-Right
    for (let row = position[0] + 1, col = position[1] + 1; row < 8 && col < 8; col++, row++) {
        // Out of bounds
        if (7 < row || row < 0 || 0 > col || col > 7) {
            break;
        }
        const potentialCell = cellStates[row][col];
        // Blocked by own piece.
        if (potentialCell.player === cell.player) {
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
    // Up-left
    for (let row = position[0] - 1, col = position[1] - 1; col >= 0 && row >= 0; col--, row--) {
        // Out of bounds
        if (7 < row || row < 0 || 0 > col || col > 7) {
            break;
        }
        const potentialCell = cellStates[row][col];
        // Blocked by own piece.
        if (potentialCell.player === cell.player) {
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
    // Up-right
    for (let row = position[0] - 1, col = position[1] + 1; row >= 0 && col < 8; col++, row--) {
        // Out of bounds
        if (7 < row || row < 0 || 0 > col || col > 7) {
            console.log('Diag-check', 'Up-right', row, col, 'Out of bounds');
            break;
        }
        const potentialCell = cellStates[row][col];
        // Blocked by own piece.
        if (potentialCell.player === cell.player) {
            console.log('Diag-check', 'Up-right', row, col, 'Blocked by own piece');
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

    return availableMoves;
}
