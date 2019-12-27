export function getPiecePointValue(piece: number): number {
    switch (piece) {
        case 1: {
            return 1;
        }
        case 2: {
            return 5;
        }
        case 3: {
            return 3;
        }
        case 4: {
            return 3;
        }
        case 5: {
            return 9;
        }
        default: {
            return 0;
        }
    }
}
