import { Color, Command, Direction, XCoordinate, YCoordinate } from '@ps/enums';

export interface Square {
  x: XCoordinate;
  y: YCoordinate;
  piece?: Partial<Piece>;
}

export interface PieceInput {
  command: Command;
  x: XCoordinate;
  y: YCoordinate;
  direction: Direction;
  color: Color;
  steps: number;
}

export interface Piece extends PieceInput {
  name: string;
  display: string;
  doublePossible: boolean;
}
