import { Board } from '../models/board';

export function makeMove(boardState: Board, row1: number, col1: number, row2: number, col2: number): void {
    const cellStates = boardState.cellStates;
    const cellStateBefore = cellStates[row1][col1];
    const cellStateAfter = cellStates[row2][col2];
    // If piece to be moved is a king, has never moved, and is moving more than one space...assume he's castling.
    if (cellStateBefore.value === 6 && !cellStateBefore.dirty && Math.abs(col2 - col1) === 2) {
        // TODO: Find relevant rook and perform the castling for it.
    }
    // Piece moves no matter if castling of not.
    cellStateAfter.dirty = true;
    cellStateAfter.player = cellStateBefore.player;
    cellStateAfter.value = cellStateBefore.value;
    cellStateAfter.playerColor = cellStateBefore.playerColor;

    cellStateBefore.dirty = true;
    cellStateBefore.player = 0;
    cellStateBefore.value = 0;
    cellStateBefore.playerColor = '';
}
