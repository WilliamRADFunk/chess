export function getPiecePointValue(piece: number): number {
    switch (piece) {
        case 1: { // Pawn
            return 10;
        }
        case 2: { // Rook
            return 50;
        }
        case 3: { // Knight
            return 30;
        }
        case 4: { // Bishop
            return 30;
        }
        case 5: { // Queen
            return 90;
        }
        case 6: { // King
            return 900;
        }
        default: {
            return 0;
        }
    }
}
