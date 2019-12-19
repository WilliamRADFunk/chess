export function checkForEndGame(activePlayer: number, clickableCellIdsLength: number): number {
    // Player not only has pieces, but available moves too.
    if (clickableCellIdsLength) {
        return 0;
    // Player has(n't) pieces left, but none that can move.
    } else {
        return activePlayer === 2 ? 1 : 2; // Opposite of new player is winner.
    }
}
