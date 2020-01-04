import { Board } from '../models/board';

export function makeMove(boardState: Board, row1: number, col1: number, row2: number, col2: number): void {
    const cellStates = boardState.cellStates;
    const cellStateBefore = cellStates[row1][col1];
    const cellStateAfter = cellStates[row2][col2];
    // If piece to be moved is a king, has never moved, and is moving more than one space...assume he's castling.
    if (cellStateBefore.value === 6 && !cellStateBefore.dirty && Math.abs(col2 - col1) === 2) {
        let rookAfter;
        let rookBefore;
        // Rook-castling specific movement.
        if (cellStateAfter.position[1] - cellStateBefore.position[1] > 0 && cellStates[row1][7].value === 2 && !cellStates[row1][7].dirty) {
            rookAfter = cellStates[row1][5];
            rookBefore = cellStates[row1][7];

            const newRookAfterCell = {
                id: rookAfter.id,
                dirty: true,
                player: rookBefore.player,
                playerColor: rookBefore.playerColor,
                position: rookAfter.position,
                value: rookBefore.value
            };
            const newRookBeforeCell = {
                id: rookBefore.id,
                dirty: true,
                player: 0,
                playerColor: '',
                position: rookBefore.position,
                value: 0
            };
            cellStates[row1][5] = newRookAfterCell
            cellStates[row1][7] = newRookBeforeCell;
        } else if (cellStates[row1][0].value === 2 && !cellStates[row1][0].dirty) {
            rookAfter = cellStates[row1][3];
            rookBefore = cellStates[row1][0];

            const newRookAfterCell = {
                id: rookAfter.id,
                dirty: true,
                player: rookBefore.player,
                playerColor: rookBefore.playerColor,
                position: rookAfter.position,
                value: rookBefore.value
            };
            const newRookBeforeCell = {
                id: rookBefore.id,
                dirty: true,
                player: 0,
                playerColor: '',
                position: rookBefore.position,
                value: 0
            };
            cellStates[row1][3] = newRookAfterCell
            cellStates[row1][0] = newRookBeforeCell;
        }

        if (rookBefore && rookAfter) {
            // King-castling specific movement.
            const newAfterCell = {
                id: cellStateAfter.id,
                dirty: true,
                player: cellStateBefore.player,
                playerColor: cellStateBefore.playerColor,
                position: cellStateAfter.position,
                value: cellStateBefore.value
            };
            const newBeforeCell = {
                id: cellStateBefore.id,
                dirty: true,
                player: 0,
                playerColor: '',
                position: cellStateBefore.position,
                value: 0
            };
            cellStates[row2][col2] = newAfterCell
            cellStates[row1][col1] = newBeforeCell;
        }
    } else {
        const newAfterCell = {
            id: cellStateAfter.id,
            dirty: true,
            player: cellStateBefore.player,
            playerColor: cellStateBefore.playerColor,
            position: cellStateAfter.position,
            value: cellStateBefore.value
        };
        const newBeforeCell = {
            id: cellStateBefore.id,
            dirty: true,
            player: 0,
            playerColor: '',
            position: cellStateBefore.position,
            value: 0
        };
        // Piece just moves if not castling.
        cellStates[row2][col2] = newAfterCell
        cellStates[row1][col1] = newBeforeCell;
    }
}
