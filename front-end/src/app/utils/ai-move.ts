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
import { cloneMoveHistory } from './clone-move-history';

let numMovesChecked = 0;
let numMovesPruned = 0;
let numMovesMemoized = 0;

export function getNumMovesChecked(): number {
  return numMovesChecked;
}

export function getNumMovesPruned(): number {
  return numMovesPruned;
}

export function getNumMovesMemoized(): number {
  return numMovesMemoized;
}

export function resetCounters(): void {
  numMovesChecked = 0;
  numMovesPruned = 0;
  numMovesMemoized = 0;
}

export function aiMove(
    board: Board,
    aiPlayer: number,
    currPlayer: number,
    depth: number,
    alpha: number,
    beta: number,
    memoizationTable: { [key: string]: number },
    moveHistory: { [key: string]: number }
): number {
    const moveChainCells = convertIdsToCells(board, []);
    const clickableIds = findClickableIds(currPlayer, board, moveChainCells);

    // Checking for no valid moves rule of stalemate.
    let isInCheck;
    if (!clickableIds.length) {
        let randomCell;
        for (const cols of board.cellStates) {
            for (const col of cols) {
                if (col.player === currPlayer) {
                    randomCell = col;
                    break;
                }
            }
            if (randomCell) {
                break;
            }
        }
        isInCheck = checkForCheck(randomCell, randomCell, board);
    }

    // First move of this player's new turn. Check to see if game is already over for this board configuration.
    const gameStatus = checkForEndGame(currPlayer, clickableIds.length, moveHistory, isInCheck);
    if (gameStatus >= 3) {
        // Stalemate is not desireable, but it is better than defeat.
        // currPlayer !== aiPlayer means last move was ai === -50000 (half losing for ai),
        // currPlayer === aiPlayer means last move was opponent === 50000 (half losing for ai's opponent)
        return ((currPlayer !== aiPlayer) ? 50000 : -50000);
    } else if (gameStatus) {
        return ((gameStatus === aiPlayer) ? 100000 : -100000);
    }

    // Avoids exceeding max callstack. Also allows for variable ai difficulty.
    if (depth <= 0) {
      return calculateScore(board, aiPlayer);
    }

    const isMin = currPlayer !== aiPlayer;
    // Pruning the tree
    if (!isMin) {
        let bestScore = -100000;
        const chains = getAllMoveChains(board, currPlayer, clickableIds);
        for (const chain of chains) {
            numMovesChecked++;
            const newBoard = cloneBoard(board);
            const newMoveHistory = cloneMoveHistory(moveHistory);
            makeMoves(newBoard, chain.slice(), convertIdsToCells(newBoard, chain), newMoveHistory, true);
            const bKey = convertBoardToKey(newBoard, currPlayer === 2 ? 1 : 2, depth);

            if (undefined === memoizationTable[bKey]) {
                memoizationTable[bKey] = aiMove(
                  newBoard,
                  aiPlayer,
                  currPlayer === 2 ? 1 : 2,
                  depth - 1,
                  alpha,
                  beta,
                  memoizationTable,
                  newMoveHistory);
            } else {
                numMovesMemoized++;
            }

            bestScore = Math.max(bestScore, memoizationTable[bKey]);
            alpha = Math.max(alpha, bestScore);
            if (beta <= alpha) {
                numMovesPruned++;
                break;
            }
        }
        return bestScore;
    } else {
        let bestScore = 100000;
        const chains = getAllMoveChains(board, currPlayer, clickableIds);
        for (const chain of chains) {
            numMovesChecked++;
            const newBoard = cloneBoard(board);
            const newMoveHistory = cloneMoveHistory(moveHistory);
            makeMoves(newBoard, chain.slice(), convertIdsToCells(newBoard, chain), newMoveHistory, true);
            const bKey = convertBoardToKey(newBoard, currPlayer === 2 ? 1 : 2, depth);

            if (undefined === memoizationTable[bKey]) {
                memoizationTable[bKey] = aiMove(
                  newBoard,
                  aiPlayer,
                  currPlayer === 2 ? 1 : 2,
                  depth - 1,
                  alpha,
                  beta,
                  memoizationTable,
                  newMoveHistory);
            } else {
                numMovesMemoized++;
            }

            bestScore = Math.min(bestScore, memoizationTable[bKey]);
            beta = Math.min(beta, bestScore);
            if (beta <= alpha) {
                numMovesPruned++;
                break;
            }
        }
        return bestScore;
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
                aiPlayerPieceCount += getPiecePointValue(cell.value);
            } else {
                randomHumanCell = cell;
                nonAiPlayerPieceCount -= getPiecePointValue(cell.value);
            }
        });
    });
    // The more pieces ai has, the more points it assigns. The opposite for the more pieces the human player has.
    // Higher preference placed on putting human player in check and having AI stay out of check.
    const checkedAI = checkForCheck(randomAICell, randomAICell, board);
    const checkedHuman = checkForCheck(randomHumanCell, randomHumanCell, board);
    return (aiPlayerPieceCount + nonAiPlayerPieceCount) + (checkedHuman ? 50 : 0) - (checkedAI ? 50 : 0);
}
