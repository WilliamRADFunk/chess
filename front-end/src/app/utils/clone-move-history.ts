export function cloneMoveHistory(moveHistory: { [key: string]: number }): { [key: string]: number } {
    const newMoveHistory = Object.create(null);
    Object.keys(moveHistory).forEach((key) => {
        newMoveHistory[key] = moveHistory[key];
    });
    return newMoveHistory;
}
