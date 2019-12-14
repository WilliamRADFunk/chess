import { makeMove } from './make-move';
import { Board } from '../models/board';
import { Cell } from '../models/cell';

export function makeMoves(boardState: Board, moveChainIds: number[], moveChainCells: Cell[]): void {
    if (moveChainIds.length === 2) {
        makeMove(boardState,
            moveChainCells[0].position[0],
            moveChainCells[0].position[1],
            moveChainCells[1].position[0],
            moveChainCells[1].position[1]);
        moveChainCells.length = 0;
        moveChainIds.length = 0;
    }
}
