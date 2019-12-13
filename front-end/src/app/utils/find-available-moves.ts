import { Board } from '../models/board';
import { Cell } from '../models/cell';

export function findAvailableMoves(cell: Cell, boardState: Board) {
    const cellStates = boardState.cellStates;
    const position = cell.position;
    const pieceType = cell.value;
    // 1 === player 1 aka "up", -1 === player 2 aka "down"
    const direction = cell.player === 1 ? 1 : -1;

    const availableMoves: Cell[] = [];

    switch (pieceType) {
        // Pawn
        case 1: {
            if (cell.dirty) { // Only one space forward allowed
                const potentialRow = position[0] + direction;
                const potentialColsForAttack = [position[1] - 1, position[1] + 1];
                const potentialColForMove = position[1];

            } else { // Has option to move two spaces forward

            }
            break;
        }
        // Rook
        case 1: {
            break;
        }
        // Knight
        case 1: {
            break;
        }
        // Bishop
        case 1: {
            break;
        }
        // Queen
        case 1: {
            break;
        }
        // King
        case 1: {
            break;
        }
    }
}
