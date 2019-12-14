import { Board } from '../models/board';
import { Cell } from '../models/cell';
import { checkForCheck } from './check-for-check';
import { findAllStraightMoves } from './find-all-straight-moves';
import { findAllKnightMoves } from './find-all-knight-moves';
import { findAllPawnMoves } from './find-all-pawn-moves';
import { findAllDiagMoves } from './find-all-diag-moves';

export function findAvailableMoves(cell: Cell, boardState: Board): Cell[] {
    const cellStates = boardState.cellStates;
    const position = cell.position;
    const pieceType = cell.value;
    // 1 === player 1 aka "up", -1 === player 2 aka "down"
    const direction = cell.player === 1 ? 1 : -1;

    const availableMoves: Cell[] = [];

    switch (pieceType) {
        // Pawn
        case 1: {
            availableMoves.push(...findAllPawnMoves(cell, boardState, direction));
            break;
        }
        // Rook
        case 1: {
            availableMoves.push(...findAllStraightMoves(cell, boardState));
            break;
        }
        // Knight
        case 1: {
            availableMoves.push(...findAllKnightMoves(cell, boardState));
            break;
        }
        // Bishop
        case 1: {
            availableMoves.push(...findAllDiagMoves(cell, boardState));
            break;
        }
        // Queen
        case 1: {
            availableMoves.push(...findAllStraightMoves(cell, boardState));
            availableMoves.push(...findAllDiagMoves(cell, boardState));
            break;
        }
        // King
        case 1: {
            break;
        }
    }

    return availableMoves;
}
