import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import {
  FormControl,
  FormControlDirective,
  ControlValueAccessor,
  ControlContainer,
  AbstractControl,
} from '@angular/forms';
import { Subject, BehaviorSubject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { KeyValue, LibError } from '../common.enum';
import { ControlError, InputType } from './control.enum';

@Directive()
export abstract class ControlAbstractDirective
  implements ControlValueAccessor, OnInit, OnDestroy
{
  @ViewChild(FormControlDirective, { static: true })
  formControlDirective: FormControlDirective;
  @ViewChild('psControl') htmlElementRef: ElementRef;

  @Input() key: string;
  // pass key or formControl
  @Input() formControl: FormControl;

  @Input() value: string | number;
  @Input() placeholder: string;
  @Input() inputType: InputType = 'text';
  @Output() action: EventEmitter<{
    key: string;
    value: string | number;
  }> = new EventEmitter();

  // Optional
  @Input() clearable = false;
  @Input() silent = false;
  @Input() min = 0;
  @Input() max = 10000;
  @Input() silentHint = true;
  @Input() label: boolean | string = true;
  @Input() position: 'fixed' | 'stacked' | 'floating' = 'stacked';
  @Input() prefix: boolean | string = false;
  @Input() suffix: boolean | string = false;
  @Input() disabled = false;
  @Input() hint: string;
  @Input() length: number;
  @Input() errorMessages: KeyValue = ControlError;

  error: string;
  error$: Subscription;
  hasValidators: boolean;
  focused: boolean;
  focused$ = new BehaviorSubject(false);

  private unsubscribe$: Subject<unknown> = new Subject<unknown>();

  get control(): FormControl {
    return (this.formControl ||
      this.controlContainer?.control?.get(this.key)) as FormControl;
  }

  constructor(
    private controlContainer: ControlContainer,
    private renderer: Renderer2,
  ) {}

  addClass(
    className: string,
    element: HTMLElement = this.htmlElementRef?.nativeElement,
  ): void {
    if (element && className.length) {
      this.renderer.addClass(element, className);
    }
  }

  removeClass(
    className: string,
    element: HTMLElement = this.htmlElementRef?.nativeElement,
  ): void {
    if (element && className.length) {
      this.renderer.removeClass(element, className);
    }
  }

  clearInput(): void {
    return this.control
      ? this.control.reset()
      : console.warn(LibError.noControl);
  }

  registerOnTouched(fn: unknown): void {
    this.formControlDirective.valueAccessor.registerOnTouched(fn);
  }

  registerOnChange(fn: unknown): void {
    this.formControlDirective.valueAccessor.registerOnChange(fn);
  }

  writeValue(obj: unknown): void {
    this.formControlDirective.valueAccessor.writeValue(obj);
  }

  setDisabledState(isDisabled: boolean): void {
    this.formControlDirective.valueAccessor.setDisabledState(isDisabled);
  }

  getErrorMessage(control: AbstractControl): string {
    const errorKey = Object.keys(control.errors || {})[0] || 'default';
    return (
      this.errorMessages[errorKey] || ControlError[errorKey] || 'Control Error'
    );
  }

  ngOnInit(): void {
    if (this.label) {
      this.label =
        typeof this.label == 'string'
          ? this.label
          : this.key.replace(/([A-Z])/g, ' $1');
    }
    if (this.control) {
      if (this.value) {
        this.control.setValue(this.value);
      }
      if (this.silent) {
        this.control.clearValidators();
        this.control.clearAsyncValidators();
        this.control.updateValueAndValidity();
      } else {
        this.hasValidators =
          Boolean(this.control.validator?.length) ||
          Boolean(this.control.asyncValidator?.length);
        this.error$ = this.control.statusChanges
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe((v) => {
            if (v === 'INVALID') {
              this.error = this.getErrorMessage(this.control);
            } else {
              this.error = null;
            }
          });
      }
    }
    this.focused$.pipe(takeUntil(this.unsubscribe$)).subscribe((v) => {
      this.focused = v;
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.complete();
  }
}
