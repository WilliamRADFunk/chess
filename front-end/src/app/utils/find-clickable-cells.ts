import { Board } from '../models/board';
import { Cell } from '../models/cell';
import { downwardPathValidCheck } from './downward-path-valid-check';
import { downwardPathValidOptions } from './downward-path-valid-options';
import { findPiecesForPlayer } from './find-pieces-for-player';
import { upwardPathValidCheck } from './upward-path-valid-check';
import { upwardPathValidOptions } from './upward-path-valid-options';

export function findClickableCells(direction: number, boardState: Board, moveChainCells: Cell[]): number[] {
    const cellStates = boardState.cellStates;
    const chainLength = moveChainCells.length;
    // If player has been checked, find only the pieces that can do anything to break out of it.
    // if (checked) {
    //     return findPiecesToBreakFromCheck();
    // }
    // If no moves have been made yet, find all player's moveable pieces and return their ids.
    if (!chainLength) {
        let playerPieces = findPiecesForPlayer(direction, boardState);
        playerPieces = playerPieces.filter(cell => {
            // If a piece, check to make sure it has any moves available to it. If none, don't let it be clickable.
            if (cell.value) {
                // return !!checkForAvailableMoves(cell, boardState);
                return true;
            }
            return false;
        });
        const ids = [];
        playerPieces.forEach(cell => {
            ids.push(cell.id);
        });
        return ids;
    }
    // return findPossibleMovesForPiece(moveChainCells[0], boardState);
    return [];
}
