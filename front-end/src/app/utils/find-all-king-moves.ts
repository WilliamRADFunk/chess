import { Board } from '../models/board';
import { Cell } from '../models/cell';

export function findAllKingMoves(cell: Cell, boardState: Board): Cell[] {
    const cellStates = boardState.cellStates;
    const position = cell.position;
    const availableMoves = [];

    const potentialMoves = [
        [position[0] + 1, position[1]],     // Down
        [position[0] - 1, position[1]],     // Up
        [position[0], position[1] + 1],     // Right
        [position[0], position[1] - 1],     // Left
        [position[0] + 1, position[1] + 1], // Down-Right
        [position[0] + 1, position[1] - 1], // Down-Left
        [position[0] - 1, position[1] + 1], // Up-Right
        [position[0] - 1, position[1] - 1]  // Up-Left
    ];
    potentialMoves.forEach(move => {
        const row = move[0];
        const col = move[1];
        // Out of bounds
        if (7 < row || row < 0 || 0 > col || col > 7) {
            return;
        }
        const potentialCell = cellStates[row][col];
        // An empty space, or capture enemy piece.
        if (!potentialCell.value || potentialCell.player !== cell.player) {
            availableMoves.push(potentialCell);
        }
    });

    if (!cell.dirty) {
        let rookLeft;
        let rookRight;
        const movesLeft = position[1];
        const movesRight = 7 - position[1];
        // Left
        const start = position[1];
        for (let i = 1; i <= movesLeft; i++) {
            const possibleCell = cellStates[position[0]][start - i];
            // An empty space.
            if (!possibleCell.value) {
                continue;
            // Clean rook in farthest spot.
            } else if (start - i === 0 && possibleCell.value === 2 && !possibleCell.dirty) {
                rookLeft = possibleCell;
                break;
            // Another piece.
            } else if (possibleCell.value) {
                break;
            }
        }
        // Right
        for (let i = 1; i <= movesRight; i++) {
            const possibleCell = cellStates[position[0]][start + i];
            // An empty space.
            if (!possibleCell.value) {
                continue;
            // Clean rook in farthest spot.
            } else if (start + i === 7 && possibleCell.value === 2 && !possibleCell.dirty) {
                rookRight = possibleCell;
                break;
            // Another piece.
            } else if (possibleCell.value) {
                break;
            }
        }
        let potentialCell;
        let newCellPosition;
        if (rookLeft) {
            newCellPosition = getRookNewPosition(rookLeft, position);
            potentialCell = cellStates[newCellPosition[0]][newCellPosition[1]];
            availableMoves.push(potentialCell);
        }
        if (rookRight) {
            newCellPosition = getRookNewPosition(rookRight, position);
            potentialCell = cellStates[newCellPosition[0]][newCellPosition[1]];
            availableMoves.push(potentialCell);
        }
    }

    return availableMoves;
}

function getRookNewPosition(origRookCell: Cell, newKingPosition: number[]): number[] {
    if (newKingPosition[1] === 6) {
        return [origRookCell.position[0], 5];
    } else {
        return [origRookCell.position[0], 3];
    }
}
