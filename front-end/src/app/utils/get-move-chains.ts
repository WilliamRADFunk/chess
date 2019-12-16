import { Board } from '../models/board';
import { convertIdsToCells } from './convert-ids-to-cells';
import { findClickableIds } from './find-clickable';

export function getMoveChains(board: Board, currPlayer: number, previousChain: number[], depth: number): number[][] {
    const newMoves = findClickableIds(currPlayer, board, convertIdsToCells(board, previousChain));
    // Base case: No moves left to make along this path.
    if (!newMoves.length) {
        return [previousChain];
    }
    // Still some moves on this path available. See where they take us.
    const results = [];
    newMoves.forEach(move => {
        const prospectiveChain = [...previousChain, move];
        console.log('prospectiveChain', prospectiveChain);
        getMoveChains(board, currPlayer, [...previousChain, move], depth).forEach(chain => {
            results.push(chain);
        });
    });
    return [previousChain, ...results];
}
