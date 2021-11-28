import { TestBed } from '@angular/core/testing';
import { ToastController } from '@ionic/angular';
import { BoardErrors } from '@ps/enums';
import { PieceInput } from '@ps/interfaces';

import { BoardService } from './board.service';

describe('BoardService', () => {
  let service: BoardService;
  let PLACE_INPUT_MOCK: Partial<PieceInput>;
  let MOVE_INPUT_MOCK: Partial<PieceInput>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoardService);
    service.reset();
    PLACE_INPUT_MOCK = {
      x: 0,
      y: 0,
      color: 'white',
      direction: 'north',
      command: 'place',
    };
    MOVE_INPUT_MOCK = { steps: 1, command: 'move' };
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call appropriate methods if no errors', () => {
    const placeSpy = spyOn<BoardService>(service, 'place' as never);
    service.execute(PLACE_INPUT_MOCK);
    expect(placeSpy).toHaveBeenCalled();
  });

  it('should throw error if tried to execute command on unplaced piece', () => {
    const toastSpy = spyOn<ToastController>(service.toast, 'create' as never);
    service.execute({ command: 'left' });
    expect(toastSpy).toHaveBeenCalledWith({
      message: BoardErrors.unplaced,
      duration: 3000,
    });
  });

  describe('Place Function', () => {
    const placeMock = (input: Partial<PieceInput>) => {
      const placeSpy = spyOn<BoardService>(
        service,
        'place' as never,
      ).and.callThrough();
      placeSpy.call(service, input);
    };

    it('should place a piece if no errors', () => {
      service.execute(PLACE_INPUT_MOCK);
      expect(service.history[0].piece).toEqual(
        jasmine.objectContaining(PLACE_INPUT_MOCK),
      );
    });

    it('should error if insufficient values provided', () => {
      delete PLACE_INPUT_MOCK.x;
      expect(() => placeMock(PLACE_INPUT_MOCK)).toThrowError(
        BoardErrors.insufficient,
      );
    });

    it('should error if tried to place piece outsite', () => {
      PLACE_INPUT_MOCK.x = service.rows;
      expect(() => placeMock(PLACE_INPUT_MOCK)).toThrowError(
        BoardErrors.outboud,
      );
    });

    it('should error if tried to place piece on top of another piece', () => {
      service.execute(PLACE_INPUT_MOCK);
      expect(() => placeMock(PLACE_INPUT_MOCK)).toThrowError(
        BoardErrors.placeOnTop,
      );
    });
  });

  describe('Move Function', () => {
    const moveMock = (input: Partial<PieceInput>) => {
      const moveSpy = spyOn<BoardService>(
        service,
        'move' as never,
      ).and.callThrough();
      moveSpy.call(service, input);
    };

    it('should move a piece if no errors', () => {
      service.execute(PLACE_INPUT_MOCK);
      service.execute(MOVE_INPUT_MOCK);
      expect(service.history[0].piece).toEqual(
        jasmine.objectContaining({
          ...PLACE_INPUT_MOCK,
          ...MOVE_INPUT_MOCK,
          y: PLACE_INPUT_MOCK.y + MOVE_INPUT_MOCK.steps,
        }),
      );
    });

    it('should error if insufficient values provided', () => {
      delete MOVE_INPUT_MOCK.steps;
      expect(() => moveMock(PLACE_INPUT_MOCK)).toThrowError(
        BoardErrors.insufficient,
      );
    });

    it('should throw error if double steps not possible', () => {
      service.execute(PLACE_INPUT_MOCK);
      service.execute(MOVE_INPUT_MOCK);
      MOVE_INPUT_MOCK.steps = 2;
      expect(() => moveMock(MOVE_INPUT_MOCK)).toThrowError(
        BoardErrors.notfirst,
      );
    });

    it('should error if tried to move piece outsite', () => {
      service.execute({ ...PLACE_INPUT_MOCK, direction: 'south' });
      expect(() => moveMock(MOVE_INPUT_MOCK)).toThrowError(BoardErrors.outboud);
    });
  });

  describe('Left/Right Function', () => {
    it('should turn the piece left', () => {
      service.execute(PLACE_INPUT_MOCK);
      service.execute({ command: 'left' });
      expect(service.history[0].piece.direction).toEqual('west');
    });
    it('should turn the piece right', () => {
      service.execute(PLACE_INPUT_MOCK);
      service.execute({ command: 'right' });
      expect(service.history[0].piece.direction).toEqual('east');
    });
  });

  describe('Report Function', () => {
    const REPORT_MOCK = {
      x: 0,
      y: 1,
      color: 'white',
      direction: 'east',
      command: 'right',
      name: 'pawn',
      doublePossible: false,
      display: '&#x2659;',
      steps: 1,
    };
    const entireFlow = () => {
      service.execute(PLACE_INPUT_MOCK);
      service.execute(MOVE_INPUT_MOCK);
      service.execute({ command: 'right' });
      service.execute({ command: 'report' });
    };

    it('should pass currect params to get the message', () => {
      const messageSpy = spyOn<BoardService>(service, 'getMessage' as never);
      entireFlow();
      expect(messageSpy).toHaveBeenCalledWith(REPORT_MOCK as never);
    });

    it('should report the currect message as piece info', () => {
      const messageSpy = spyOn<BoardService>(
        service,
        'getMessage' as never,
      ).and.callThrough();
      expect(messageSpy.call(service, REPORT_MOCK)).toEqual(
        '&#x2659; facing east from following xy axis 01',
      );
    });

    it('should throw error if nothing to report', () => {
      const toastSpy = spyOn<ToastController>(service.toast, 'create' as never);
      service.execute({ command: 'report' });
      expect(toastSpy).toHaveBeenCalledWith({
        message: BoardErrors.nothing,
        duration: 3000,
      });
    });
  });
});
