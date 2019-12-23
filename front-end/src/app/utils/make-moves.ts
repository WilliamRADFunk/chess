import { makeMove } from './make-move';
import { Board } from '../models/board';
import { Cell } from '../models/cell';

export function makeMoves(boardState: Board, moveChainIds: number[], moveChainCells: Cell[]): void {
    makeMove(boardState,
        moveChainCells[0].position[0],
        moveChainCells[0].position[1],
        moveChainCells[1].position[0],
        moveChainCells[1].position[1]);
    if (moveChainIds.length === 3) {
        const row = moveChainCells[1].position[0];
        const col = moveChainCells[1].position[1];
        boardState.cellStates[row][col].value = moveChainIds[2];
    }
    moveChainCells.length = 0;
    moveChainIds.length = 0;
}
