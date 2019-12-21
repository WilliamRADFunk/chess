import { Board } from '../models/board';
import { Cell } from '../models/cell';

export function findAllKnightMoves(cell: Cell, boardState: Board): Cell[] {
    const cellStates = boardState.cellStates;
    const position = cell.position;
    const availableMoves = [];

    const theEightMovePositions = [
        // Vertical         Horizonal
        [position[0] + 2, position[1] - 1], // 2 x Down - 1 x Left
        [position[0] + 2, position[1] + 1], // 2 x Down - 1 x Right
        [position[0] + 1, position[1] + 2], // 2 x Right - 1 x Down
        [position[0] - 1, position[1] + 2], // 2 x Right - 1 x Up
        [position[0] - 2, position[1] - 1], // 2 x Up - 1 x Left
        [position[0] - 2, position[1] + 1], // 2 x Up - 1 x Right
        [position[0] + 1, position[1] - 2], // 2 x Left - 1 x Down
        [position[0] - 1, position[1] - 2], // 2 x Left - 1 x Up
    ];
    theEightMovePositions.forEach(move => {
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

    return availableMoves;
}
