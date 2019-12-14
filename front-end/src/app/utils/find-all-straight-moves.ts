import { Board } from '../models/board';
import { Cell } from '../models/cell';
import { checkForCheck } from './check-for-check';

export function findAllStraightMoves(cell: Cell, boardState: Board): Cell[] {
    const cellStates = boardState.cellStates;
    const position = cell.position;
    const movesDown = position[0] - 0;
    const movesLeft = position[1] - 0;
    const movesRight = 7 - position[1];
    const movesUp = 7 - position[0];

    const availableMoves = [];
    // Down
    let start = position[0];
    for (let i = 1; i <= movesDown; i++) {
        const potentialCell = cellStates[start - i][position[1]];
        // An empty space.
        if (!potentialCell.value) {
            !checkForCheck(cell, potentialCell, boardState) && availableMoves.push(potentialCell);
        // Blocked by own piece.
        } else if (cell.player === potentialCell.player) {
            break;
        // Capture enemy piece.
        } else if (cell.player !== potentialCell.player) {
            !checkForCheck(cell, potentialCell, boardState) && availableMoves.push(potentialCell);
            break;
        }
    }
    // Up
    for (let i = 1; i <= movesUp; i++) {
        const potentialCell = cellStates[start + i][position[1]];
        // An empty space.
        if (!potentialCell.value) {
            !checkForCheck(cell, potentialCell, boardState) && availableMoves.push(potentialCell);
        // Blocked by own piece.
        } else if (cell.player === potentialCell.player) {
            break;
        // Capture enemy piece.
        } else if (cell.player !== potentialCell.player) {
            !checkForCheck(cell, potentialCell, boardState) && availableMoves.push(potentialCell);
            break;
        }
    }
    // Down
    start = position[1];
    for (let i = 1; i <= movesLeft; i++) {
        const potentialCell = cellStates[position[0]][start - i];
        // An empty space.
        if (!potentialCell.value) {
            !checkForCheck(cell, potentialCell, boardState) && availableMoves.push(potentialCell);
        // Blocked by own piece.
        } else if (cell.player === potentialCell.player) {
            break;
        // Capture enemy piece.
        } else if (cell.player !== potentialCell.player) {
            !checkForCheck(cell, potentialCell, boardState) && availableMoves.push(potentialCell);
            break;
        }
    }
    // Right
    for (let i = 1; i <= movesRight; i++) {
        const potentialCell = cellStates[position[0]][start + i];
        // An empty space.
        if (!potentialCell.value) {
            !checkForCheck(cell, potentialCell, boardState) && availableMoves.push(potentialCell);
        // Blocked by own piece.
        } else if (cell.player === potentialCell.player) {
            break;
        // Capture enemy piece.
        } else if (cell.player !== potentialCell.player) {
            !checkForCheck(cell, potentialCell, boardState) && availableMoves.push(potentialCell);
            break;
        }
    }

    return availableMoves;
}
