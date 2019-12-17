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
    @Input() style: number;

  constructor() { }

  ngOnInit() { }

    public getClassStyling(value: number, playerNumber: number, index: number): { [key: string]: boolean } {
        const classStyle = {
            'pawn-1': value === 1 && this.style === 0 && index === this.player1Panel['pawns'].length - 1,
            'pawn-1-outline': value === 1 && this.style === 0 && !this.player1Panel['pawns'][index],
            'pawn-2': value === 1 && this.style === 1 && !!this.player1Panel['pawns'][index],
            'pawn-2-outline': value === 1 && this.style === 1 && !this.player1Panel['pawns'][index],
            'pawn-3': value === 1 && this.style === 2 && !!this.player1Panel['pawns'][index],
            'pawn-3-outline': value === 1 && this.style === 2 && !this.player1Panel['pawns'][index],
            'rook-1': value === 2 && this.style === 0 && !!this.player1Panel['rooks'][index],
            'rook-1-outline': value === 2 && this.style === 0 && !this.player1Panel['rooks'][index],
            'rook-2': value === 2 && this.style === 1 && !!this.player1Panel['rooks'][index],
            'rook-2-outline': value === 2 && this.style === 1 && !this.player1Panel['rooks'][index],
            'rook-3': value === 2 && this.style === 2 && !!this.player1Panel['rooks'][index],
            'rook-3-outline': value === 2 && this.style === 2 && !this.player1Panel['rooks'][index],
            'knight-1': value === 3 && this.style === 0 && !!this.player1Panel['knights'][index],
            'knight-1-outline': value === 3 && this.style === 0 && !this.player1Panel['knights'][index],
            'knight-2': value === 3 && this.style === 1 && !!this.player1Panel['knights'][index],
            'knight-2-outline': value === 3 && this.style === 1 && !this.player1Panel['knights'][index],
            'knight-3': value === 3 && this.style === 2 && !!this.player1Panel['knights'][index],
            'knight-3-outline': value === 3 && this.style === 2 && !this.player1Panel['knights'][index],
            'bishop-1': value === 4 && this.style === 0 && !!this.player1Panel['bishops'][index],
            'bishop-1-outline': value === 4 && this.style === 0 && !this.player1Panel['bishops'][index],
            'bishop-2': value === 4 && this.style === 1 && !!this.player1Panel['bishops'][index],
            'bishop-2-outline': value === 4 && this.style === 1 && !this.player1Panel['bishops'][index],
            'bishop-3': value === 4 && this.style === 2 && !!this.player1Panel['bishops'][index],
            'bishop-3-outline': value === 4 && this.style === 2 && !this.player1Panel['bishops'][index],
            'queen-1': value === 5 && this.style === 0 && !!this.player1Panel['queens'][index],
            'queen-1-outline': value === 5 && this.style === 0 && !this.player1Panel['queens'][index],
            'queen-2': value === 5 && this.style === 1 && !!this.player1Panel['queens'][index],
            'queen-2-outline': value === 5 && this.style === 1 && !this.player1Panel['queens'][index],
            'queen-3': value === 5 && this.style === 2 && !!this.player1Panel['queens'][index],
            'queen-3-outline': value === 5 && this.style === 2 && !this.player1Panel['queens'][index]
        };
        if (playerNumber === 1) {
            classStyle['black-team-color'] = false;
            classStyle['white-team-color'] = true;
            return classStyle;
        } else if (playerNumber === 2) {
            classStyle['black-team-color'] = true;
            classStyle['white-team-color'] = false;
            return classStyle;
        }
        return {};
    }

}
