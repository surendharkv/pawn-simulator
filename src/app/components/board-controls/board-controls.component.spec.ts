import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/shared/shared.module';

import { BoardControlsComponent } from './board-controls.component';

describe('BoardControlsComponent', () => {
  let component: BoardControlsComponent;
  let fixture: ComponentFixture<BoardControlsComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [BoardControlsComponent],
        imports: [IonicModule.forRoot(), SharedModule],
      }).compileComponents();

      fixture = TestBed.createComponent(BoardControlsComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }),
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
