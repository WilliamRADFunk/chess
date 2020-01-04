import { Component, Input } from '@angular/core';
import {
    trigger,
    state,
    style,
    animate,
    transition
} from '@angular/animations';

import { Cell } from '../models/cell';

@Component({
    selector: 'chess-man',
    templateUrl: './man.component.html',
    styleUrls: ['./man.component.scss'],
    animations: [
        trigger('fadein', [
            state('in', style({opacity: 1})),
            // fade in when created. this could also be written as transition('void => *')
            transition(':enter', [ style({opacity: 0}), animate(500) ]),
            // fade out when destroyed. this could also be written as transition('void => *')
            transition(':leave', animate(500, style({opacity: 0})))
        ])
    ]
})
export class ManComponent {
    @Input() cell: Cell;
    @Input() playerNumber: number;
    @Input() style: number;

    constructor() {}

    public getClassStyling(): { [key: string]: boolean } {
        const value = this.cell.value;
        const classStyle = {
            rotate: this.playerNumber === 2,
            'pawn-1': value === 1 && this.style === 0,
            'pawn-2': value === 1 && this.style === 1,
            'pawn-3': value === 1 && this.style === 2,
            'rook-1': value === 2 && this.style === 0,
            'rook-2': value === 2 && this.style === 1,
            'rook-3': value === 2 && this.style === 2,
            'knight-1': value === 3 && this.style === 0,
            'knight-2': value === 3 && this.style === 1,
            'knight-3': value === 3 && this.style === 2,
            'bishop-1': value === 4 && this.style === 0,
            'bishop-2': value === 4 && this.style === 1,
            'bishop-3': value === 4 && this.style === 2,
            'queen-1': value === 5 && this.style === 0,
            'queen-2': value === 5 && this.style === 1,
            'queen-3': value === 5 && this.style === 2,
            'king-1': value === 6 && this.style === 0,
            'king-2': value === 6 && this.style === 1,
            'king-3': value === 6 && this.style === 2
        };
        if (this.cell.player === 1) {
            classStyle['black-team-color'] = false;
            classStyle['white-team-color'] = true;
            return classStyle;
        } else if (this.cell.player === 2) {
            classStyle['black-team-color'] = true;
            classStyle['white-team-color'] = false;
            return classStyle;
        }
        return Object.create(null);
    }
}
