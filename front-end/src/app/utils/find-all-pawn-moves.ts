import { Board } from '../models/board';
import { Cell } from '../models/cell';
import { checkForCheck } from './check-for-check';

export function findAllPawnMoves(cell: Cell, boardState: Board, direction: number): Cell[] {
    const cellStates = boardState.cellStates;
    const position = cell.position;

    const availableMoves = [];

    // Dirty or not, pawns can move up at least one space.
    let potentialRow = position[0] + direction;
    let moveCell = cellStates[potentialRow][position[1]];
    const attackCells = [
        position[1] - 1 >= 0 ? cellStates[potentialRow][position[1] - 1] : null,
        position[1] + 1 < 8 ? cellStates[potentialRow][position[1] + 1] : null
    ];
    // Attack diagonally to the left.
    if (attackCells[0] && attackCells[0].value && attackCells[0].player !== cell.player) {
        !checkForCheck(cell, attackCells[0], boardState) && availableMoves.push(attackCells[0]);
    }
    // Attack diagonally to the right.
    if (attackCells[1] && attackCells[1].value && attackCells[1].player !== cell.player) {
        !checkForCheck(cell, attackCells[1], boardState) && availableMoves.push(attackCells[1]);
    }
    // Move vertically one space
    if (!moveCell.value) {
        !checkForCheck(cell, moveCell, boardState) && availableMoves.push(moveCell);
    }
    // Move vertically two spaces
    if (!cell.dirty) {
        potentialRow = position[0] + (direction * 2);
        moveCell = (0 <= potentialRow && potentialRow < 8) ? cellStates[potentialRow][position[1]] : null;
        if (moveCell && !moveCell.value) {
            !checkForCheck(cell, moveCell, boardState) && availableMoves.push(moveCell);
        }
    }

    return availableMoves;
}
