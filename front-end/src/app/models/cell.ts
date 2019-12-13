export interface Cell {
    dirty?: boolean;
    id: number;
    player: number;
    playerColor: string;
    position: [number, number];
    value: number;
}
