import { Board } from '../models/board';
import { Cell } from '../models/cell';
import { checkForCheck } from './check-for-check';

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
            !checkForCheck(cell, potentialCell, boardState) && availableMoves.push(potentialCell);
        }
    });

    if (!cell.dirty) {
        // TODO: find all rooks that aren't dirty.
        // TODO: make sure path to clean rook is unobstructed.
        // TODO: if criteria is met, make available move two spaces toward rook in question.
    }

    return availableMoves;
}
