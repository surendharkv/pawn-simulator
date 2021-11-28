import { PieceInput } from '@ps/interfaces';
import { BoardState } from './board-state';

describe('BoardState', () => {
  let boardState: BoardState;

  beforeAll(() => {
    boardState = new BoardState();
  });

  afterAll(() => {
    boardState = null;
  });

  beforeEach(() => {
    boardState.reset();
  });

  it('should create an instance', () => {
    expect(boardState).toBeTruthy();
  });

  it('should create board info', () => {
    expect(boardState.info.length).toEqual(boardState.rows);
    expect(boardState.info[0].length).toEqual(boardState.columns);
  });

  it('should return true/false based on null values and keys', () => {
    const mockInput: Partial<PieceInput> = {
      x: 0,
      y: 0,
      color: 'white',
      direction: 'north',
    };
    const keys: Array<keyof PieceInput> = ['x', 'y', 'color', 'direction'];
    expect(boardState.isValidValue(keys, mockInput)).toBeTrue();
    delete mockInput.x;
    expect(boardState.isValidValue(keys, mockInput)).toBeFalse();
  });

  it('should return if pawn move is valid', () => {
    expect(boardState.isPawnMoveValid(0, 0)).toBeTrue();
    expect(boardState.isPawnMoveValid(9, 8)).toBeFalse();
  });
});
