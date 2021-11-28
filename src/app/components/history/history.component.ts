import { Component } from '@angular/core';
import { CHESSPIECES } from '@ps/enums';
import { BoardService } from 'src/app/_services/board.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent {
  pieces = CHESSPIECES;
  constructor(public board: BoardService) {}
}
