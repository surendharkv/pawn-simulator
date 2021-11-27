import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ControlAbstractDirective } from '../control';

@Component({
  selector: 'ps-textarea',
  templateUrl: './textarea.control.html',
  styleUrls: ['./textarea.control.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextareaControl),
      multi: true,
    },
  ],
})
export class TextareaControl
  extends ControlAbstractDirective
  implements OnInit
{
  @Input() minRows = 3;
  @Input() maxRows = 4;
  @Input() autoResize = false;
  @Input() spellCheck = true;

  ngOnInit(): void {
    super.ngOnInit();
  }
}
