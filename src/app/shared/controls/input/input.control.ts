import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ControlAbstractDirective } from '../control';
import { AutoComplete } from '../control.enum';

@Component({
  selector: 'ps-input',
  templateUrl: './input.control.html',
  styleUrls: ['./input.control.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputControl),
      multi: true,
    },
  ],
})
export class InputControl extends ControlAbstractDirective implements OnInit {
  @Input() autoComplete: AutoComplete = 'off';
  @Input() telCode: string;
  @Input() spellCheck = false;

  hide = false;

  ngOnInit(): void {
    super.ngOnInit();
    this.hide = this.inputType === 'password';
  }
}
