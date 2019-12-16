import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CapturedPiecesPanelComponent } from './captured-pieces-panel.component';

describe('CapturedPiecesPanelComponent', () => {
  let component: CapturedPiecesPanelComponent;
  let fixture: ComponentFixture<CapturedPiecesPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CapturedPiecesPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapturedPiecesPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
