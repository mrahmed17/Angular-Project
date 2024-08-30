import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css'],
})
export class ForgetpasswordComponent {
  forgetPasswordForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.forgetPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit(): void {
    if (this.forgetPasswordForm.valid) {
      const email = this.forgetPasswordForm.value.email;
      this.authService.requestPasswordReset(email).subscribe(
        () => {
          this.successMessage =
            'A password reset link has been sent to your email.';
          this.forgetPasswordForm.reset();
        },
        (error) => {
          this.errorMessage =
            'Failed to send password reset link. Please try again.';
          console.error('Error sending password reset link', error);
        }
      );
    }
  }
}
