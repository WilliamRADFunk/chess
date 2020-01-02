import { aiMove, getNumMovesChecked, resetCounter } from './ai-move';
import { cloneBoard } from './clone-board';
import { convertBoardToKey } from './convert-board-to-key';
import { convertIdsToCells } from './convert-ids-to-cells';
import { getAllMoveChains } from './get-all-move-chains';
import { makeMoves } from './make-moves';
import { AIChoiceTrack } from '../models/ai-choice-track';
import { Board } from '../models/board';

export function aiDecider(
    board: Board,
    aiPlayer: number,
    currPlayer: number,
    startingPieces: number[],
    aiDifficulty: number,
    memoizationTable: { [key: string]: number }
): AIChoiceTrack {
    let bestScore;
    for (const chain of getAllMoveChains(board, aiPlayer, startingPieces)) {
        const newBoard = cloneBoard(board);
        makeMoves(newBoard, chain.slice(), convertIdsToCells(newBoard, chain));
        const bKey = convertBoardToKey(newBoard, currPlayer === 2 ? 1 : 2);
        if (undefined === memoizationTable[bKey]) {
            memoizationTable[bKey] = aiMove(
                newBoard,
                aiPlayer,
                currPlayer === 2 ? 1 : 2,
                aiDifficulty,
                -100000,
                100000,
                memoizationTable);
        }
        if (!bestScore || memoizationTable[bKey] > bestScore.score) {
            bestScore = { moveChainIds: chain, score: memoizationTable[bKey] };
        }
        console.log('Root chain calculated: ', chain, memoizationTable[bKey]);
    }
    // TODO: GUI component that shows number of configurations the AI has investigated for their move.
    console.log('Number of configurations checked: ', getNumMovesChecked());
    resetCounter();
    return bestScore;
}
