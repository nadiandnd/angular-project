import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UsernameValidators } from '../../shared/utility/validators';
import { FormErrorComponent } from '../../shared/component/form-error/form-error.component';

@Component({
  selector: 'app-login',
  imports: [FormErrorComponent, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  public USERNAME_ERROR_MESSAGES = {
    required: () => 'username is required',
    invalidRange: () => 'username must between 8-10 characters',
    acceptCharacter: () => 'invalid characters',
    startingCharacter: () => 'must start with number or letter',
    endingCharacter: () => 'must end with number or letter',
  };
  public loginForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: [
        '',
        [
          Validators.required,
          UsernameValidators.acceptCharacter,
          UsernameValidators.endingCharacter,
          UsernameValidators.startCharecter,
          UsernameValidators.characterRange(8, 16),
        ],
      ],
      password: ['', Validators.required],
    });
  }

  login() {
    localStorage.setItem('Bearer Token', 'token123');
    if (this.loginForm.valid) {
    }
  }

  logout() {
    localStorage.removeItem('Bearer Token');
  }

  handleLoginError(error: any) {
    if (error.error && error.error?.path === '/api/auth') {
      if (error.error.status === 401) {
        this.loginForm.setErrors({ invalidCredentials: true });
      }
    }
  }
}
