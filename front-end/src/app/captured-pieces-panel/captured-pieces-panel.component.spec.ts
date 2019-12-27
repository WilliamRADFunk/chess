import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { CapturedPiecesPanelComponent } from './captured-pieces-panel.component';

describe('CapturedPiecesPanelComponent', () => {
  let component: CapturedPiecesPanelComponent;
  let fixture: ComponentFixture<CapturedPiecesPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule
      ],
      declarations: [
        CapturedPiecesPanelComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapturedPiecesPanelComponent);
    component = fixture.componentInstance;
    component.player1Panel = {
        pawns: [],
        rooks: [],
        knights: [],
        bishops: [],
        queens: []
    };
    component.player2Panel = {
        pawns: [],
        rooks: [],
        knights: [],
        bishops: [],
        queens: []
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
