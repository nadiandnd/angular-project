import { Component, input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'form-error',
  imports: [],
  templateUrl: './form-error.component.html',
  styleUrl: './form-error.component.scss',
})
export class FormErrorComponent {
  ctrl = input<AbstractControl>();
  errorMessages = input<{ [key: string]: () => string }>();

  get errorMessagesList(): string[] {
    const errorMessagesValue = this.errorMessages();
    if (
      this.ctrl &&
      this.ctrl instanceof AbstractControl &&
      this.ctrl.errors &&
      errorMessagesValue
    ) {
      return Object.keys(this.ctrl.errors)
        .map((key) =>
          errorMessagesValue[key] ? errorMessagesValue[key]() : null
        )
        .filter((error) => error !== null);
    }
    return [];
  }
}

// import { Component, Input } from '@angular/core';
// import { AbstractControl } from '@angular/forms';

// @Component({
//   selector: 'form-error',
//   templateUrl: './form-error.component.html',
//   styleUrls: ['./form-error.component.scss'],
// })
// export class FormErrorComponent {
//   // The parent component will pass an AbstractControl to `ctrl` as an input
//   @Input() ctrl!: AbstractControl;

//   // The parent component will pass an object with error message functions to `errorMessages`
//   @Input() errorMessages!: { [key: string]: () => string };

//   get errorMessagesList(): string[] {
//     // Check if the `ctrl` is defined and it's an AbstractControl with errors
//     if (this.ctrl && this.ctrl.errors) {
//       return Object.keys(this.ctrl.errors)
//         .map((key) => {
//           // Check if `errorMessages` has a function for the key
//           return this.errorMessages[key] ? this.errorMessages[key]() : null;
//         })
//         .filter((message) => message !== null); // Filter out null values
//     }
//     return [];
//   }
// }
