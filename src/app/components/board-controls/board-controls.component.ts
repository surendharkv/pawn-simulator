import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { COLORS, Command, COMMANDS, DIRECTIONS } from '@ps/enums';
import { Subscription } from 'rxjs';
import { distinctUntilChanged, filter } from 'rxjs/operators';
import { BoardService } from 'src/app/_services/board.service';

@Component({
  selector: 'app-board-controls',
  templateUrl: './board-controls.component.html',
  styleUrls: ['./board-controls.component.scss'],
})
export class BoardControlsComponent implements OnInit, OnDestroy {
  boardControls: FormGroup;
  boardCommands = COMMANDS.map((value) => ({ value }));
  boardDirections = DIRECTIONS.map((value) => ({ value }));
  boardColors = COLORS.map((value) => ({ value }));
  command$: Subscription;
  disablePlace = false;
  disableMove = true;

  constructor(private fb: FormBuilder, public board: BoardService) {}

  ngOnInit(): void {
    this.board.reset();
    this.boardControls = this.fb.group({
      command: ['', Validators.required],
      x: [null, [Validators.min(0), Validators.max(this.board.rows - 1)]],
      y: [null, [Validators.min(0), Validators.max(this.board.columns - 1)]],
      steps: [null, [Validators.min(1), Validators.max(2)]],
      direction: null,
      color: null,
    });
    this.command$ = this.boardControls.controls.command.valueChanges
      .pipe(
        filter((v: Command) => !!v),
        distinctUntilChanged(),
      )
      .subscribe(this.resetAndDisable.bind(this));
  }

  resetAndDisable(command: Command) {
    this.boardControls.reset();
    this.boardControls.controls.command.patchValue(command);
    if (command === 'place') {
      this.disablePlace = false;
      this.disableMove = true;
      return;
    }
    if (command === 'move') {
      this.disablePlace = true;
      this.disableMove = false;
      return;
    }
    this.disablePlace = true;
    this.disableMove = true;
  }

  ngOnDestroy(): void {
    this.command$.unsubscribe();
  }

  async submit() {
    await this.board.execute(this.boardControls.value);
  }
}
