import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { BoardControlsComponent } from 'src/app/components/board-controls/board-controls.component';
import { BoardComponent } from 'src/app/components/board/board.component';
import { HistoryComponent } from 'src/app/components/history/history.component';
import { SharedModule } from 'src/app/shared/shared.module';

import { HomePage } from './home.page';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [
          HomePage,
          BoardComponent,
          BoardControlsComponent,
          HistoryComponent,
        ],
        imports: [IonicModule.forRoot(), SharedModule],
      }).compileComponents();

      fixture = TestBed.createComponent(HomePage);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }),
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
