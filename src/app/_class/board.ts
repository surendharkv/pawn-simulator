import {
  Coordinate,
  DIRECTIONAXIS,
  Direction,
  CHESSPIECES,
  DIRECTIONS,
  BoardErrors,
  XCoordinate,
  YCoordinate,
} from '@ps/enums';
import { Piece, PieceInput } from '@ps/interfaces';
import { BoardState } from './board-state';

export class Board extends BoardState {
  getPiece(x: XCoordinate, y: YCoordinate) {
    const { i, j } = this.index(x, y);
    const square = this.info[i][j];
    if (!square?.piece) {
      throw new Error(BoardErrors.noPiece);
    }
    return square;
  }

  addPiece(
    x: XCoordinate,
    y: YCoordinate,
    inputs: Partial<PieceInput>,
    isMove = false,
  ) {
    const { i, j } = this.index(x, y);
    const { color } = inputs;
    const name = 'pawn';
    const newPiece = {
      ...this.info[i][j],
      piece: isMove
        ? inputs
        : {
            ...inputs,
            name,
            doublePossible: true,
            display: CHESSPIECES[name][color],
          },
    };
    this.info[i][j] = newPiece;
    return newPiece;
  }

  updatePiece(oldPos: Coordinate, newPos: Coordinate, inputs: Partial<Piece>) {
    if (this.isGonnaCapture(newPos)) {
      throw new Error(BoardErrors.capture);
    }
    const piece = this.removePiece(oldPos.x, oldPos.y);
    return this.addPiece(newPos.x, newPos.y, { ...piece, ...inputs }, true);
  }

  modifyPiece(x: XCoordinate, y: YCoordinate, inputs: Partial<Piece>) {
    const { i, j } = this.index(x, y);
    const { piece } = this.info[i][j];
    if (!piece) {
      throw new Error(BoardErrors.noPiece);
    }
    const modifiedPiece = {
      ...this.info[i][j],
      piece: { ...piece, ...inputs },
    };
    this.info[i][j] = modifiedPiece;
    return modifiedPiece;
  }

  removePiece(x: XCoordinate, y: YCoordinate) {
    const { i, j } = this.index(x, y);
    const { piece, ...rest } = this.info[i][j];
    this.info[i][j] = rest;
    return piece;
  }

  getSteps(
    directions: Direction[],
    currentDirection: Direction,
    steps: number,
  ) {
    return directions.includes(currentDirection)
      ? steps * DIRECTIONAXIS[currentDirection]
      : steps * 0;
  }

  getTurnDirection(currentDirection: Direction, turn: 'left' | 'right') {
    const directionRef = [...DIRECTIONS, ...DIRECTIONS];
    const index = directionRef.findIndex(
      (v, i) => i !== 0 && v === currentDirection,
    );
    return directionRef[turn === 'left' ? index - 1 : index + 1];
  }
}
