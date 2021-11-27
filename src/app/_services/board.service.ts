import { Injectable } from '@angular/core';
import { ChessBoard } from '@ps/enums';
import { Square } from '@ps/interfaces';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  params = { rows: 8, columns: 8 };
  info: ChessBoard = [];

  constructor() {}

  reset() {
    this.info = [...Array(this.params.rows).keys()]
      .reverse()
      .map((x) =>
        [...Array(this.params.columns).keys()].map((y): Square => ({ x, y })),
      );
  }
}
