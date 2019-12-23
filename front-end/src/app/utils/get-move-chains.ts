import { Board } from '../models/board';
import { cloneBoard } from './clone-board';
import { convertIdsToCells } from './convert-ids-to-cells';

export function getMoveChains(board: Board, previousChain: number[], depth: number): number[][] {
    const clonedBoard = cloneBoard(board);
    const cells = convertIdsToCells(clonedBoard, previousChain);
    if (cells.length === 2 && cells[0].value === 1 && (cells[1].position[0] === 0 || cells[1].position[0] === 7)) {
        console.log('PROMOTION', previousChain, depth);
        return [
            [...previousChain, 5],
            [...previousChain, 4],
            [...previousChain, 3],
            [...previousChain, 2],
        ];
    }
    return [previousChain];
}
