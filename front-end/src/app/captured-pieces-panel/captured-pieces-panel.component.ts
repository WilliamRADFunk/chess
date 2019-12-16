import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'chess-captured-pieces-panel',
  templateUrl: './captured-pieces-panel.component.html',
  styleUrls: ['./captured-pieces-panel.component.scss']
})
export class CapturedPiecesPanelComponent implements OnInit {
    @Input() player1Panel: { [key: string]: number[] };
    @Input() player2Panel: { [key: string]: number[] };

  constructor() { }

  ngOnInit() { }

}
