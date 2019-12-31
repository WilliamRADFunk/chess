import { findAllDiagMoves } from './find-all-diag-moves';
import { findAllKingMoves } from './find-all-king-moves';
import { findAllKnightMoves } from './find-all-knight-moves';
import { findAllPawnMoves } from './find-all-pawn-moves';
import { findAllStraightMoves } from './find-all-straight-moves';
import { Board } from '../models/board';
import { Cell } from '../models/cell';

export function findAvailableMoves(cell: Cell, boardState: Board): Cell[] {
    const availableMoves: Cell[] = [];

    switch (cell.value) {
        // Pawn
        case 1: {
            // Direction -->  -1 === player 1 aka "up", 1 === player 2 aka "down"
            availableMoves.push(...findAllPawnMoves(cell, boardState, cell.player === 1 ? -1 : 1));
            break;
        }
        // Rook
        case 2: {
            availableMoves.push(...findAllStraightMoves(cell, boardState));
            break;
        }
        // Knight
        case 3: {
            availableMoves.push(...findAllKnightMoves(cell, boardState));
            break;
        }
        // Bishop
        case 4: {
            availableMoves.push(...findAllDiagMoves(cell, boardState));
            break;
        }
        // Queen
        case 5: {
            availableMoves.push(...findAllStraightMoves(cell, boardState));
            availableMoves.push(...findAllDiagMoves(cell, boardState));
            break;
        }
        // King
        case 6: {
            availableMoves.push(...findAllKingMoves(cell, boardState));
            break;
        }
    }

    return availableMoves.filter(move => !!move);
}
