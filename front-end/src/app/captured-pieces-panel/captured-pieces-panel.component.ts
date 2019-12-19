import { Component, Input, OnInit } from '@angular/core';
import {
    trigger,
    state,
    style,
    animate,
    transition
} from '@angular/animations';

@Component({
  selector: 'chess-captured-pieces-panel',
  templateUrl: './captured-pieces-panel.component.html',
  styleUrls: ['./captured-pieces-panel.component.scss'],
  animations: [
      trigger('fadein', [
          state('in', style({opacity: 1})),
          // fade in when created. this could also be written as transition('void => *')
          transition(':enter', [ style({opacity: 0}), animate(1000) ]),
          // fade out when destroyed. this could also be written as transition('void => *')
          transition(':leave', animate(1000, style({opacity: 0})))
      ])
  ]
})
export class CapturedPiecesPanelComponent implements OnInit {
    @Input() player1Panel: { [key: string]: number[] };
    @Input() player2Panel: { [key: string]: number[] };
    @Input() playerNumber: number;
    @Input() style: number;

  constructor() { }

  ngOnInit() { }

    public getClassStyling(value: number, top: boolean, index: number): { [key: string]: boolean } {
        const panel = top && this.playerNumber === 1 ? this.player2Panel : this.player1Panel;
        const classStyle = {
            'pawn-1': value === 1 && this.style === 0 && index <= panel.pawns.length - 1,
            'pawn-1-outline': value === 1 && this.style === 0 && index > panel.pawns.length - 1,
            'pawn-2': value === 1 && this.style === 1 && index <= panel.pawns.length - 1,
            'pawn-2-outline': value === 1 && this.style === 1 && index > panel.pawns.length - 1,
            'pawn-3': value === 1 && this.style === 2 && index <= panel.pawns.length - 1,
            'pawn-3-outline': value === 1 && this.style === 2 && index > panel.pawns.length - 1,
            'rook-1': value === 2 && this.style === 0 && index <= panel.rooks.length - 1,
            'rook-1-outline': value === 2 && this.style === 0 && index > panel.rooks.length - 1,
            'rook-2': value === 2 && this.style === 1 && index <= panel.rooks.length - 1,
            'rook-2-outline': value === 2 && this.style === 1 && index > panel.rooks.length - 1,
            'rook-3': value === 2 && this.style === 2 && index <= panel.rooks.length - 1,
            'rook-3-outline': value === 2 && this.style === 2 && index > panel.rooks.length - 1,
            'knight-1': value === 3 && this.style === 0 && index <= panel.knights.length - 1,
            'knight-1-outline': value === 3 && this.style === 0 && index > panel.knights.length - 1,
            'knight-2': value === 3 && this.style === 1 && index <= panel.knights.length - 1,
            'knight-2-outline': value === 3 && this.style === 1 && index > panel.knights.length - 1,
            'knight-3': value === 3 && this.style === 2 && index <= panel.knights.length - 1,
            'knight-3-outline': value === 3 && this.style === 2 && index > panel.knights.length - 1,
            'bishop-1': value === 4 && this.style === 0 && index <= panel.bishops.length - 1,
            'bishop-1-outline': value === 4 && this.style === 0 && index > panel.bishops.length - 1,
            'bishop-2': value === 4 && this.style === 1 && index <= panel.bishops.length - 1,
            'bishop-2-outline': value === 4 && this.style === 1 && index > panel.bishops.length - 1,
            'bishop-3': value === 4 && this.style === 2 && index <= panel.bishops.length - 1,
            'bishop-3-outline': value === 4 && this.style === 2 && index > panel.bishops.length - 1,
            'queen-1': value === 5 && this.style === 0 && index <= panel.queens.length - 1,
            'queen-1-outline': value === 5 && this.style === 0 && index > panel.queens.length - 1,
            'queen-2': value === 5 && this.style === 1 && index <= panel.queens.length - 1,
            'queen-2-outline': value === 5 && this.style === 1 && index > panel.queens.length - 1,
            'queen-3': value === 5 && this.style === 2 && index <= panel.queens.length - 1,
            'queen-3-outline': value === 5 && this.style === 2 && index > panel.queens.length - 1
        };
        if (this.playerNumber === 2 && top) {
            classStyle['black-team-color'] = true;
            classStyle['white-team-color'] = false;
        } else if (this.playerNumber === 2 && !top) {
            classStyle['black-team-color'] = false;
            classStyle['white-team-color'] = true;
        } else if (this.playerNumber === 1 && top) {
            classStyle['black-team-color'] = false;
            classStyle['white-team-color'] = true;
        } else {
            classStyle['black-team-color'] = true;
            classStyle['white-team-color'] = false;
        }
        return classStyle;
    }
}
