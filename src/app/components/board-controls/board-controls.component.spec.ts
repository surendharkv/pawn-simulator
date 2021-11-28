import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { BoardService } from 'src/app/_services/board.service';

import { BoardControlsComponent } from './board-controls.component';

describe('BoardControlsComponent', () => {
  let component: BoardControlsComponent;
  let fixture: ComponentFixture<BoardControlsComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [BoardControlsComponent],
        imports: [IonicModule.forRoot({ mode: 'ios' }), SharedModule],
        providers: [BoardService],
      }).compileComponents();

      fixture = TestBed.createComponent(BoardControlsComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }),
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit command', () => {
    const boardService = spyOn<BoardService>(
      component.board,
      'execute' as never,
    );
    component.submit();
    expect(boardService).toHaveBeenCalled();
  });

  it('should reset and disable fields based on selected command', () => {
    component.resetAndDisable('place');
    expect(component.disableMove).toBeTrue();
    component.resetAndDisable('move');
    expect(component.disablePlace).toBeTrue();
    component.resetAndDisable('report');
    expect(component.disablePlace).toBeTrue();
    expect(component.disableMove).toBeTrue();
  });
});
