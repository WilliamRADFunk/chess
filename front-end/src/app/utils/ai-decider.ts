import { aiMove, getNumMovesChecked, getNumMovesPruned, getNumMovesMemoized, resetCounters } from './ai-move';
import { cloneBoard } from './clone-board';
import { convertBoardToKey } from './convert-board-to-key';
import { convertIdsToCells } from './convert-ids-to-cells';
import { getAllMoveChains } from './get-all-move-chains';
import { makeMoves } from './make-moves';
import { Board } from '../models/board';
import { AIThinkPacket } from '../models/ai-think-packet';
import { cloneMoveHistory } from './clone-move-history';

export function aiDecider(
    board: Board,
    aiPlayer: number,
    currPlayer: number,
    startingPieces: number[],
    aiDifficulty: number,
    memoizationTable: { [key: string]: number },
    moveHistory: { [key: string]: number }
): AIThinkPacket {
    resetCounters();
    let numMovesChecked = 0;
    let numMovesMemoized = 0;
    let bestScore;
    const startTime = new Date();
    for (const chain of getAllMoveChains(board, aiPlayer, startingPieces)) {
        console.log('Chain under investigation: ', chain, 'depth: ', aiDifficulty);
        numMovesChecked++;
        const newBoard = cloneBoard(board);
        const newMoveHistory = cloneMoveHistory(moveHistory);
        makeMoves(newBoard, chain.slice(), convertIdsToCells(newBoard, chain), newMoveHistory, true);
        const bKey = convertBoardToKey(newBoard, currPlayer === 2 ? 1 : 2, aiDifficulty);
        if (undefined === memoizationTable[bKey]) {
            memoizationTable[bKey] = aiMove(
                newBoard,
                aiPlayer,
                currPlayer === 2 ? 1 : 2,
                aiDifficulty - 1,
                -100000,
                100000,
                memoizationTable,
                newMoveHistory);
        } else {
            numMovesMemoized++;
        }
        if (!bestScore || memoizationTable[bKey] >= bestScore.score) {
            bestScore = { moveChainIds: chain, score: memoizationTable[bKey] };
        }
        console.log('Root chain calculated: ', chain, memoizationTable[bKey]);
    }
    console.log('Winning Score: ', bestScore.score, bestScore.moveChainIds);
    return {
        configsChecked: getNumMovesChecked() + numMovesChecked,
        configsMemoized: getNumMovesMemoized() + numMovesMemoized,
        configsPruned: getNumMovesPruned(),
        score: bestScore,
        time: ((new Date()).getTime() - startTime.getTime()) / 1000
    };
}
