import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsernameValidators } from '../../shared/utility/validators';

@Component({
  selector: 'app-login',
  imports: [],
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
    if (this.loginForm.valid) {
    }
  }

  handleLoginError(error: any) {
    if (error.error && error.error?.path === '/api/auth') {
      if (error.error.status === 401) {
        this.loginForm.setErrors({ invalidCredentials: true });
      }
    }
  }
}
