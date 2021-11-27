import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BoardService } from 'src/app/_services/board.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardComponent {
  constructor(public board: BoardService) {}
}
