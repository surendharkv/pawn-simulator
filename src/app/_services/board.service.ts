import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { BoardErrors, CHESSPIECES } from '@ps/enums';
import { Piece, PieceInput, Square } from '@ps/interfaces';
import { Board } from '../_class/board';

@Injectable({
  providedIn: 'root',
})
export class BoardService extends Board {
  constructor(public toast: ToastController) {
    super();
  }

  async execute(inputs: Partial<PieceInput>) {
    try {
      if (inputs.command !== 'place' && !this.lastIndex) {
        if (inputs.command === 'report') {
          throw new Error(BoardErrors.nothing);
        }
        throw new Error(BoardErrors.unplaced);
      }
      const squareInfo = this[inputs.command](inputs) as Square;
      if (squareInfo?.piece) {
        this.history.unshift(squareInfo);
      }
    } catch (error) {
      const toast = await this.toast.create({
        message: error.message,
        duration: 3000,
      });
      await toast?.present();
    }
  }

  private place(inputs: Partial<PieceInput>) {
    if (!this.isValidValue(['x', 'y', 'color', 'direction'], inputs)) {
      throw new Error(BoardErrors.insufficient);
    }
    const { x, y } = inputs;
    if (x >= this.rows || y >= this.columns) {
      throw new Error(BoardErrors.outboud);
    }
    if (this.isGonnaCapture({ x, y })) {
      throw new Error(BoardErrors.placeOnTop);
    }
    return this.addPiece(x, y, inputs);
  }

  private move({ steps, command }: Partial<Piece>) {
    if (!this.isValidValue(['steps'], { steps })) {
      throw new Error(BoardErrors.insufficient);
    }
    const { x, y, piece } = this.history[0];
    if (!piece.doublePossible && +steps === 2) {
      throw new Error(BoardErrors.notfirst);
    }
    const newXPos =
      +x + +this.getSteps(['west', 'east'], piece.direction, steps);
    const newYPos =
      +y + +this.getSteps(['north', 'south'], piece.direction, steps);
    if (this.isPawnMoveValid(newXPos, newYPos)) {
      const newPos = { x: newXPos, y: newYPos };
      return this.updatePiece({ x, y }, newPos, {
        command,
        steps,
        doublePossible: false,
        ...newPos,
      });
    } else {
      throw new Error(BoardErrors.outboud);
    }
  }

  private left({ command }: Partial<Piece>) {
    const { x, y, piece } = this.history[0];
    return this.modifyPiece(x, y, {
      command,
      direction: this.getTurnDirection(piece.direction, 'left'),
    });
  }

  private right({ command }: Partial<Piece>) {
    const { x, y, piece } = this.history[0];
    return this.modifyPiece(x, y, {
      command,
      direction: this.getTurnDirection(piece.direction, 'right'),
    });
  }

  private async report(_: Partial<Piece>) {
    const { x, y } = this.history[0];
    const { piece } = this.getPiece(x, y);
    const toast = await this.toast.create({
      header: 'Report',
      message: this.getMessage(piece),
      duration: 5000,
    });
    await toast?.present();
  }

  private getMessage(piece: Partial<Piece>) {
    return `${CHESSPIECES[piece.name][piece.color]} facing ${
      piece.direction
    } from following xy axis ${piece.x}${piece.y}`;
  }
}
