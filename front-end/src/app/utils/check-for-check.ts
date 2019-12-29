import { Board } from '../models/board';
import { Cell } from '../models/cell';
import { cloneBoard } from './clone-board';
import { findPiecesForPlayer } from './find-pieces-for-player';
import { findAvailableMoves } from './find-available-moves';

export function checkForCheck(cellStart: Cell, cellEnd: Cell, boardState: Board): boolean {
    const clonedBoard = cloneBoard(boardState);
    const clonedCellEnd = clonedBoard.cellStates[cellEnd.position[0]][cellEnd.position[1]];
    const clonedCellStart = clonedBoard.cellStates[cellStart.position[0]][cellStart.position[1]];

    // The player whose move will be next after this prospective move.
    const potentiallyCheckingPlayer = cellStart.player === 1 ? 2 : 1;

    if (!(clonedCellStart.position[0] === clonedCellEnd.position[0] && clonedCellStart.position[1] === clonedCellEnd.position[1])) {
        clonedCellEnd.dirty = true;
        clonedCellEnd.player = cellStart.player;
        clonedCellEnd.playerColor = cellStart.playerColor;
        clonedCellEnd.value = cellStart.value;

        clonedCellStart.dirty = true;
        clonedCellStart.player = 0;
        clonedCellStart.playerColor = '';
        clonedCellStart.value = 0;
    }

    // Find the moving player's king.
    let king;
    for (const cols of clonedBoard.cellStates) {
        for (const cell of cols) {
            if (cell.value === 6 && cell.player === clonedCellEnd.player) {
                king = cell;
                break;
            }
        }
        if (king) {
            break;
        }
    }

    
    if (!king) {
        console.log("Found no king", clonedBoard, clonedCellEnd.player);
    }

    /*
     * If any of the avilable moves of the next player can attack the cell in which the king resides,
     * then the player having moved will be in check.
     * (Note: if cellStart and cellEnd are the same it checks if player is already in check).
     */
    const pieces = findPiecesForPlayer(potentiallyCheckingPlayer, clonedBoard);
    for (const piece of pieces) {
        const moves = findAvailableMoves(piece, clonedBoard);
        for (const move of moves) {
            if (move.position[0] === king.position[0]
                && move.position[1] === king.position[1]) {
                return true;
            }
        }
    }
    return false;
}
