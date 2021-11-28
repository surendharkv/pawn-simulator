import { ChessBoard, Coordinate, XCoordinate, YCoordinate } from '@ps/enums';
import { PieceInput, Square } from '@ps/interfaces';

export class BoardState {
  rows = 8;
  columns = 8;
  info: ChessBoard = [];
  history: Partial<Square>[] = [];

  get lastIndex() {
    const { x, y } = this.history[0] || { x: null, y: null };
    if (x === null || y === null) {
      return null;
    }
    return this.index(x, y);
  }

  index(x: XCoordinate, y: YCoordinate) {
    return { i: this.columns - 1 - y, j: x };
  }

  // Validators:
  isPawnMoveValid(x: XCoordinate, y: YCoordinate) {
    return 0 <= x && x < this.rows && 0 <= y && y < this.columns;
  }

  isGonnaCapture({ x, y }: Coordinate) {
    const { i, j } = this.index(x, y);
    return !!this.info[i][j].piece;
  }

  isValidValue(keys: Array<keyof PieceInput>, inputs: Partial<PieceInput>) {
    return keys.every((v) => inputs[v] !== null && inputs[v] !== undefined);
  }

  reset() {
    this.info = [...Array(this.rows).keys()]
      .reverse()
      .map((y) =>
        [...Array(this.columns).keys()].map((x): Square => ({ x, y })),
      );
  }
}
