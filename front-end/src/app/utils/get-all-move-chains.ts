import { Board } from '../models/board';
import { convertIdsToCells } from './convert-ids-to-cells';
import { findClickableIds } from './find-clickable';
import { getMoveChains } from './get-move-chains';

export function getAllMoveChains(board: Board, currPlayer: number, startingPieces: number[], depth: number): number[][] {
    const results = [];
    startingPieces.forEach(id => {
        const firstMoves = findClickableIds(currPlayer, board, convertIdsToCells(board, [id]));
        firstMoves.forEach(move => {
            results.push(getMoveChains(board, currPlayer, [id, move], depth));
        });
    });
    const allChains = [];
    results.forEach(chains => {
        chains.forEach(chain => {
            allChains.push(chain);
        });
    });
    return allChains;
}
