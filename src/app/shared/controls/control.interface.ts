import { Value } from '../common.enum';

export interface SelectOption {
  value: Value;
  displayValue?: Value;
  disabled?: boolean;
  selected?: boolean;
}
