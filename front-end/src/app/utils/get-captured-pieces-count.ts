import { findPiecesForPlayer } from './find-pieces-for-player';
import { Board } from '../models/board';

export function getCapturedPiecesCount(boardState: Board, playerNumber: number): { [key: string]: number[] } {
    const pieces = findPiecesForPlayer(playerNumber, boardState);
    let pawns = 0;
    let rooks = 0;
    let knights = 0;
    let bishops = 0;
    let queens = 0;

    pieces.forEach(piece => {
        switch(piece.value) {
            case 1: {
                pawns++;
                break;
            }
            case 2: {
                rooks++;
                break;
            }
            case 3: {
                knights++;
                break;
            }
            case 4: {
                bishops++;
                break;
            }
            case 5: {
                queens++;
                break;
            }
            default: { }
        }
    });

    // Extra logic to prevent trade-in pawns from messing with the math.
    return {
        pawns: new Array(8 - (pawns <= 8 ? pawns : 8)),
        rooks: new Array(2 - (rooks <= 2 ? rooks : 2)),
        knights: new Array(2 - (knights <= 2 ? knights : 2)),
        bishops: new Array(2 - (bishops <= 2 ? bishops : 2)),
        queens: queens ? [] : [1]
    };
}
