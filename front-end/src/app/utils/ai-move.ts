import { checkForEndGame } from './check-for-endgame';
import { cloneBoard } from './clone-board';
import { convertBoardToKey } from './convert-board-to-key';
import { convertIdsToCells } from './convert-ids-to-cells';
import { findClickableIds } from './find-clickable';
import { getAllMoveChains } from './get-all-move-chains';
import { makeMoves } from './make-moves';
import { Board } from '../models/board';
import { getPiecePointValue } from './get-piece-point-value';

export function aiMove(
    board: Board,
    aiPlayer: number,
    currPlayer: number,
    depth: number,
    memoizationTable: { [key: string]: number }
): number {
    const moveChainCells = convertIdsToCells(board, []);
    const clickableIds = findClickableIds(currPlayer, board, moveChainCells);
    // First move of this player's new turn. Check to see if game is already over for this board configuration.
    if (!clickableIds.length) {
        const gameStatus = checkForEndGame(currPlayer, clickableIds.length);
        const score = ((gameStatus === aiPlayer) ? Infinity : -Infinity) - depth;
        return score;
    }

    // Avoids exceeding max callstack. Also allows for variable ai difficulty.
    if (aiPlayer === currPlayer && depth <= 0) {
        let aiPlayerPieceCount = 0;
        let nonAiPlayerPieceCount = 0;

        board.cellStates.forEach(row => {
            row.forEach(cell => {
                if (!cell.player) {
                    return;
                }
                if (cell.player === aiPlayer) {
                    aiPlayerPieceCount += getPiecePointValue(cell.value);
                } else {
                    nonAiPlayerPieceCount -= getPiecePointValue(cell.value);
                }
            });
        });
        const score = aiPlayerPieceCount + nonAiPlayerPieceCount;
        return score;
    }

    const scores = [];
    getAllMoveChains(board, currPlayer, clickableIds, depth).forEach(chain => {
        const newBoard = cloneBoard(board);
        makeMoves(newBoard, chain.slice(), convertIdsToCells(newBoard, chain));
        const bKey = convertBoardToKey(newBoard, currPlayer === 2 ? 1 : 2);
        if (undefined !== memoizationTable[bKey]) {
            scores.push(memoizationTable[bKey]);
        } else {
            memoizationTable[bKey] = aiMove(newBoard, aiPlayer, currPlayer === 2 ? 1 : 2, depth - 1, memoizationTable);
            scores.push(memoizationTable[bKey]);
        }

        // Pruning the tree. If non-ai player, if minimum is already found stop looking.
        // If ai-player and max is already found, stop looking.
        if (memoizationTable[bKey] === -Infinity && currPlayer !== aiPlayer) {
            console.log('aiMove bail early for min', memoizationTable[bKey]);
            return memoizationTable[bKey];
        } else if (memoizationTable[bKey] === Infinity && currPlayer === aiPlayer) {
            console.log('aiMove bail early for max', memoizationTable[bKey]);
            return memoizationTable[bKey];
        }
    });
    if (currPlayer === aiPlayer) {
        return Math.max(...scores);
    } else {
        return Math.min(...scores);
    }
}
