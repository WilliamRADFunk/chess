import { checkForEndGame } from './check-for-endgame';
import { cloneBoard } from './clone-board';
import { convertBoardToKey } from './convert-board-to-key';
import { convertIdsToCells } from './convert-ids-to-cells';
import { findClickableIds } from './find-clickable';
import { getAllMoveChains } from './get-all-move-chains';
import { makeMoves } from './make-moves';
import { Board } from '../models/board';
import { getPiecePointValue } from './get-piece-point-value';
import { checkForCheck } from './check-for-check';
import { getInversePosition } from './get-inverse-position';

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
    const gameStatus = checkForEndGame(currPlayer, clickableIds.length);
    if (gameStatus) {
        return ((gameStatus === aiPlayer) ? Infinity : -Infinity);
    }

    // Calculate score at this level.
    const score = calculateScore(board, aiPlayer);

    // Avoids exceeding max callstack. Also allows for variable ai difficulty.
    if (depth <= 0 && currPlayer === aiPlayer) {
      return score;
    }

    let scores = [];
    for (const chain of getAllMoveChains(board, currPlayer, clickableIds)) {
        const newBoard = cloneBoard(board);
        makeMoves(newBoard, chain.slice(), convertIdsToCells(newBoard, chain));
        const bKey = convertBoardToKey(newBoard, currPlayer === 2 ? 1 : 2);
        if (undefined !== memoizationTable[bKey]) {
            scores.push(memoizationTable[bKey]);
        } else {
            memoizationTable[bKey] = aiMove(
              newBoard,
              aiPlayer,
              currPlayer === 2 ? 1 : 2,
              depth - 1,
              memoizationTable);
            scores.push(memoizationTable[bKey]);
        }

        // Pruning the tree. If non-ai player, if minimum is already found stop looking.
        // If ai-player and max is already found, stop looking.
        if (memoizationTable[bKey] === -Infinity && currPlayer !== aiPlayer) {
            console.log('aiMove bail early for min', memoizationTable[bKey]);
            scores = [memoizationTable[bKey]];
            break;
        } else if (memoizationTable[bKey] === Infinity && currPlayer === aiPlayer) {
            console.log('aiMove bail early for max', memoizationTable[bKey]);
            scores = [memoizationTable[bKey]];
            break;
        }
    }
    if (currPlayer === aiPlayer) {
        return Math.max(...scores);
    } else {
        return Math.min(...scores);
    }
}

function calculateScore(board: Board, aiPlayer: number): number {
    let aiPlayerPieceCount = 0;
    let nonAiPlayerPieceCount = 0;
    let randomAICell;
    let randomHumanCell;

    board.cellStates.forEach(row => {
        row.forEach(cell => {
            if (!cell.player) {
                return;
            }
            if (cell.player === aiPlayer) {
                randomAICell = cell;
                aiPlayerPieceCount += getPiecePointValue(cell.value, cell.position);
            } else {
                randomHumanCell = cell;
                nonAiPlayerPieceCount -= getPiecePointValue(cell.value, getInversePosition(cell.position));
            }
        });
    });
    // The more pieces ai has, the more points it assigns. The opposite for the more pieces the human player has.
    // Higher preference placed on putting human player in check and having AI stay out of check.
    const checkedAI = checkForCheck(randomAICell, randomAICell, board);
    const checkedHuman = checkForCheck(randomHumanCell, randomHumanCell, board);
    return (aiPlayerPieceCount + nonAiPlayerPieceCount) + (checkedHuman ? 50 : 0) - (checkedAI ? 50 : 0);
}
