export function checkForEndGame(
    activePlayer: number,
    clickableCellIdsLength: number,
    moveHistory: { [key: string]: number }
): number {
    // Threefold repetition rule (three repeated board positions) === stalemate
    if (Object.keys(moveHistory).some(key => moveHistory[key] >= 3)) {
        return 3;
    // Player not only has pieces, but available moves too.
    } else if (clickableCellIdsLength) {
        return 0;
    // Player has(n't) pieces left, but none that can move.
    } else {
        return activePlayer === 2 ? 1 : 2; // Opposite of new player is winner.
    }
}
