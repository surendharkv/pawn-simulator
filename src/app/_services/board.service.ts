import { Injectable } from '@angular/core';
import { ChessBoard, XCoordinate, YCoordinate } from '@ps/enums';
import { Piece, PieceInput, Square } from '@ps/interfaces';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  rows = 8;
  columns = 8;
  info: ChessBoard = [];
  history: Partial<PieceInput>[] = [];

  reset() {
    this.info = [...Array(this.rows).keys()]
      .reverse()
      .map((y) =>
        [...Array(this.columns).keys()].map((x): Square => ({ x, y })),
      );
  }

  getSquareInfo(x: XCoordinate, y: YCoordinate) {
    const { i, j } = this.index(x, y);
    return this.info[i]?.[j];
  }

  index(x: XCoordinate, y: YCoordinate) {
    return { i: this.columns - 1 - y, j: x };
  }

  execute(inputs: Partial<PieceInput>) {
    try {
      return this[inputs.command]({ ...inputs, pieceName: 'pawn' });
    } catch (error) {
      console.log(error);
    }
  }

  private place(inputs: Partial<Piece>) {
    console.log('place', this.getSquareInfo(inputs.x, inputs.y));
  }

  private move(inputs: Partial<Piece>) {
    console.log('move', inputs);
  }

  private left(inputs: Partial<Piece>) {
    console.log('left', inputs);
  }

  private right(inputs: Partial<Piece>) {
    console.log('right', inputs);
  }

  private report(inputs: Partial<Piece>) {
    console.log('report', inputs);
  }
}
