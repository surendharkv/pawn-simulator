import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BoardService } from 'src/app/_services/board.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HistoryComponent {
  constructor(public board: BoardService) {}
}
