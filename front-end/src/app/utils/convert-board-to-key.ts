import { Board } from '../models/board';

export function convertBoardToKey(board: Board, currPlayer: number, depth: number): string {
    let key = `${currPlayer}`;
    board.cellStates.forEach(row => {
        row.forEach(cell => {
            if (!cell.value) {
                key += '--';
            } else {
                key += `${cell.player}${cell.value}`;
            }
        });
    });
    key += '-' + depth;
    return key;
}
