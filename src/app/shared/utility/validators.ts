import { AbstractControl, ValidatorFn } from '@angular/forms';
import {
  END_LETTER_NUMBER,
  START_LETTER_NUMBER,
  USERNAME_PATTERN,
} from './constant';

export const UsernameValidators = {
  acceptCharacter: ((control: AbstractControl) => {
    return !USERNAME_PATTERN.test(control?.value ?? '')
      ? { acceptCharacter: true }
      : null;
  }) as ValidatorFn,
  endingCharacter: ((control: AbstractControl) => {
    return !START_LETTER_NUMBER.test(control?.value ?? '')
      ? { endingCharacter: true }
      : null;
  }) as ValidatorFn,
  startCharecter: ((control: AbstractControl) => {
    return !END_LETTER_NUMBER.test(control?.value ?? '')
      ? { startingCharacter: true }
      : null;
  }) as ValidatorFn,
  characterRange:
    (min: number, max: number): ValidatorFn =>
    (control: AbstractControl) => {
      const value = control?.value.toSring() ?? '';
      const invalidRange =
        (value as string).length < min || (value as string).length > max;
      return invalidRange ? { invalidRange } : null;
    },
};
