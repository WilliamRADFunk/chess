import { Board } from '../models/board';
import { Cell } from '../models/cell';
import { findPiecesForPlayer } from './find-pieces-for-player';
import { findAvailableMoves } from './find-available-moves';
import { checkForCheck } from './check-for-check';

export function findClickableCells(direction: number, boardState: Board, moveChainCells: Cell[]): Cell[] {
    const chainLength = moveChainCells.length;
    // TODO:
    // If player has been checked, find only the pieces that can do anything to break out of it.
    // if (checked) {
    //     return findPiecesToBreakFromCheck();
    // }
    // If no moves have been made yet, find all player's moveable pieces and return their ids.
    let clickableCells = [];
    if (!chainLength) {
        clickableCells = findPiecesForPlayer(direction, boardState);
        clickableCells = clickableCells.filter(cell => {
            // If a piece, check to make sure it has any moves available to it.
            // If none, don't let it be clickable.
            return findAvailableMoves(cell, boardState)
                .filter(cellEnd => !checkForCheck(cell, cellEnd, boardState)).length;
        });
    } else {
        clickableCells = findAvailableMoves(moveChainCells[0], boardState)
            .filter(cellEnd => !checkForCheck(moveChainCells[0], cellEnd, boardState));
    }
    return clickableCells;
}


export function findClickableIds(direction: number, boardState: Board, moveChainCells: Cell[]): number[] {
    const chainLength = moveChainCells.length;
    // TODO:
    // If player has been checked, find only the pieces that can do anything to break out of it.
    // if (checked) {
    //     return findPiecesToBreakFromCheck();
    // }
    // If no moves have been made yet, find all player's moveable pieces and return their ids.
    let clickableCells = findClickableCells(direction, boardState, moveChainCells);
    const clickableIds = [];
    clickableCells.forEach(cell => {
        clickableIds.push(cell.id);
    });
    return clickableIds;
}
