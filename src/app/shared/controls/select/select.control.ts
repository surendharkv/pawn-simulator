import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ControlAbstractDirective } from '../control';
import { SelectOption } from '../control.interface';

@Component({
  selector: 'ps-select',
  templateUrl: './select.control.html',
  styleUrls: ['./select.control.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectControl),
      multi: true,
    },
  ],
})
export class SelectControl extends ControlAbstractDirective implements OnInit {
  @Input() options: SelectOption[];

  ngOnInit(): void {
    super.ngOnInit();
  }
}
