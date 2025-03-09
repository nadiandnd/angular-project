import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UsernameValidators } from '../../shared/utility/validators';
import { FormErrorComponent } from '../../shared/component/form-error/form-error.component';
import { AuthService } from '../../services/auth.service';
import { tap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AlertDialog } from '../../shared/utility/modal';

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

  private dialog = inject(MatDialog);

  constructor(private fb: FormBuilder, private authService: AuthService) {}

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
      this.openDialog();
    }
  }

  openDialog() {
    this.dialog.open(AlertDialog, {
      id: 'confirmation',
      width: '400px',
      data: {
        title: 'Warning!',
        content: 'Are you sure you want to proceed?',
        btnList: [
          { label: 'Cancel' },
          { label: 'Confirm', action: () => this.confirmAction() },
        ],
      },
    });
  }

  confirmAction() {
    this.dialog.getDialogById('confirmation')?.close();
    this.authService.login(this.loginForm.value).subscribe();
  }

  handleLoginError(error: any) {
    // To be done
    if (error.error && error.error?.path === '/api/auth') {
      if (error.error.status === 401) {
        this.loginForm.setErrors({ invalidCredentials: true });
      }
    }
  }
}
