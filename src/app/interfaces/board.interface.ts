import { Color, Command, Direction, XCoordinate, YCoordinate } from '@ps/enums';

export interface Square {
  x: XCoordinate;
  y: YCoordinate;
  piece?: Piece;
}

export interface PieceInput {
  command: Command;
  x: XCoordinate;
  y: YCoordinate;
  direction: Direction;
  color: Color;
  steps: 1 | 2;
}

export interface Piece extends PieceInput {
  name: 'pawn';
  display: string;
  doublePossible: boolean;
}
