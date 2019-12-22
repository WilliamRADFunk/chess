import { Board } from '../models/board';

export function promotePiece(boardState: Board): { player: number; position: number[][]; } {
    const cellStates = boardState.cellStates;
    let promotion = null;
    cellStates[0].forEach(cell => {
        if (cell.player === 1 && cell.value === 1) {
            promotion = { player: cell.player, position: cell.position };
        }
    });
    cellStates[7].forEach(cell => {
        if (cell.player === 2 && cell.value === 1) {
            promotion = { player: cell.player, position: cell.position };
        }
    });
    return promotion;
}
