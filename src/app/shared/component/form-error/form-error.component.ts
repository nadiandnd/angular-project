import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'form-error',
  templateUrl: './form-error.component.html',
  styleUrls: ['./form-error.component.scss'],
})
export class FormErrorComponent {
  @Input() ctrl: AbstractControl | null = null;

  @Input() errorMessages!: { [key: string]: () => string };

  get errorMessagesList(): string[] {
    if (!this.ctrl || !this.ctrl.errors) {
      return [];
    }
    return Object.keys(this.ctrl.errors)
      .map((key) => {
        return this.errorMessages[key] ? this.errorMessages[key]() : null;
      })
      .filter((message) => message !== null);
  }

  get isShowErrors(): boolean {
    return (
      !!this.ctrl &&
      !!this.ctrl.errors &&
      (this.ctrl.dirty || this.ctrl.touched)
    );
  }
}
