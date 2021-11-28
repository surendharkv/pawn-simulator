import { BoardErrors } from '@ps/enums';
import { Board } from './board';

describe('Board', () => {
  let board: Board;

  beforeAll(() => {
    board = new Board();
  });

  beforeEach(() => {
    board.reset();
  });

  it('should create an instance', () => {
    expect(new Board()).toBeTruthy();
  });

  it('should throw error if no piece is found', () => {
    expect(() => board.getPiece(0, 0)).toThrowError(BoardErrors.noPiece);
    expect(() => board.modifyPiece(0, 0, {})).toThrowError(BoardErrors.noPiece);
  });

  it('should throw error if one piece captures other', () => {
    board.info[board.rows - 1][0] = { x: 0, y: 0, piece: { name: 'pawn' } };
    expect(() =>
      board.updatePiece({ x: 0, y: 0 }, { x: 0, y: 0 }, {}),
    ).toThrowError(BoardErrors.capture);
  });
});
