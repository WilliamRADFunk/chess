export function resetBoard() {
    const board = { cellStates: [] };
    for (let row = 0; row < 8; row++) {
        board.cellStates[row] = [];
        for (let col = 0; col < 8; col++) {
            const cell = {
                dirty: false,
                id: Number(`${row}${col}`),
                player: 0,
                playerColor: '',
                position: [row, col],
                value: 0
            };
            if (row < 2) {
                cell.player = 2;
                cell.playerColor = 'black';
                if (row === 1) {
                    cell.value = 1;
                } else if (!col || col === 7) {
                    cell.value = 2;
                } else if (col === 1 || col === 6) {
                    cell.value = 3;
                } else if (col === 2 || col === 5) {
                    cell.value = 4;
                } else if (col === 3) {
                    cell.value = 6;
                } else if (col === 4) {
                    cell.value = 5;
                }
            } else if (row > 5) {
                cell.player = 1;
                cell.playerColor = 'white';
                if (row === 6) {
                    cell.value = 1;
                } else if (!col || col === 7) {
                    cell.value = 2;
                } else if (col === 1 || col === 6) {
                    cell.value = 3;
                } else if (col === 2 || col === 5) {
                    cell.value = 4;
                } else if (col === 3) {
                    cell.value = 5;
                } else if (col === 4) {
                    cell.value = 6;
                }
            }
            board.cellStates[row][col] = cell;
        }
    }
    return board;
}
