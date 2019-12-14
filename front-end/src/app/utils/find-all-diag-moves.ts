import { Board } from '../models/board';
import { Cell } from '../models/cell';
import { checkForCheck } from './check-for-check';

export function findAllDiagMoves(cell: Cell, boardState: Board): Cell[] {
    const cellStates = boardState.cellStates;
    const position = cell.position;

    const availableMoves = [];

    // Up-Left
    let discontinue = false;
    for (let row = position[0] + 1; row < 8; row++) {
        for (let col = position[1] - 1; col >= 0; col--) {
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
    // Up-Right
    discontinue = false;
    for (let row = position[0] + 1; row < 8; row++) {
        for (let col = position[1] + 1; col < 8; col++) {
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
    // Down-left
    discontinue = false;
    for (let row = position[0] - 1; row >= 0; row--) {
        for (let col = position[1] - 1; col >= 0; col--) {
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
    // Down-right
    discontinue = false;
    for (let row = position[0] - 1; row >= 0; row--) {
        for (let col = position[1] + 1; col < 8; col++) {
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

    return availableMoves;
}
