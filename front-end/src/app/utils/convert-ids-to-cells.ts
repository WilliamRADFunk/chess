import { Board } from '../models/board';
import { Cell } from '../models/cell';

export function convertIdsToCells(board: Board, moveChainIds: number[]): Cell[] {
    const clonedMoveChainIds = moveChainIds.slice();
    let promotionValue;
    if (moveChainIds.length === 3) {
        promotionValue = clonedMoveChainIds[2];
        clonedMoveChainIds.pop();
    }
    const moveChainCells = [];
    clonedMoveChainIds.forEach(id => {
        const row = Math.floor(id / 10);
        const col = id % 10;
        moveChainCells.push(board.cellStates[row][col]);
    });
    if (moveChainIds.length === 3) {
        moveChainCells.push(promotionValue);
    }
    return moveChainCells;
}
