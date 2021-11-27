import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { COLORS, COMMANDS, DIRECTIONS } from '@ps/enums';
import { BoardService } from 'src/app/_services/board.service';

@Component({
  selector: 'app-board-controls',
  templateUrl: './board-controls.component.html',
  styleUrls: ['./board-controls.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardControlsComponent implements OnInit {
  boardControls: FormGroup;
  boardCommands = COMMANDS.map((value) => ({ value }));
  boardDirections = DIRECTIONS.map((value) => ({ value }));
  boardColors = COLORS.map((value) => ({ value }));

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
  }

  submit() {
    this.board.execute(this.boardControls.value);
  }
}
