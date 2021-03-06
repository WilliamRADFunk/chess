import { TestBed, async } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import { AppComponent } from './app.component';
import { GameBoardComponent } from './game-board/game-board.component';
import { CellComponent } from './cell/cell.component';
import { StartMenuComponent } from './start-menu/start-menu.component';
import { HelpScreenComponent } from './help-screen/help-screen.component';
import { ManComponent } from './man/man.component';
import { CapturedPiecesPanelComponent } from './captured-pieces-panel/captured-pieces-panel.component';

const config: SocketIoConfig = { url: 'http://localhost:4444', options: {} };

describe('AppComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                NgbModule,
                ReactiveFormsModule,
                NoopAnimationsModule,
                SocketIoModule.forRoot(config)
            ],
            declarations: [
                AppComponent,
                GameBoardComponent,
                CellComponent,
                StartMenuComponent,
                HelpScreenComponent,
                ManComponent,
                CapturedPiecesPanelComponent
            ],
        }).compileComponents();
    }));

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    });
});
