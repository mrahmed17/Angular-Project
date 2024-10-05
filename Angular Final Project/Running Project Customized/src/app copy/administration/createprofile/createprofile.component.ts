import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserModel } from '../../models/user.model';

@Component({
  selector: 'app-createprofile',
  templateUrl: './createprofile.component.html',
  styleUrl: './createprofile.component.css',
})
export class CreateprofileComponent {
  regForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.regForm = this.formBuilder.group({
      userName: ['', Validators.required],
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      address: ['', Validators.required],
      gender: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      nid: ['', Validators.required],
      contactNumber: ['', Validators.required],
      role: ['', Validators.required],
      status: [true],
      hourlyRate: [{ value: '', disabled: true }, Validators.required],
      profilePhoto: [''],
    });
  }

  onRoleChange(event: any): void {
    const selectedRole = event.target.value;
    let rate = 0;

    switch (selectedRole) {
      case 'HR':
        rate = 400;
        break;
      case 'Manager':
        rate = 350;
        break;
      case 'PayrollAdmin':
        rate = 300;
        break;
      case 'Employee':
        rate = 250;
        break;
      default:
        rate = 0;
        break;
    }

    this.regForm.patchValue({ hourlyRate: rate });
  }

  onSubmit(): void {
    if (this.regForm.valid) {
      const user: UserModel = this.regForm.value;
      user.createAt = new Date();
      user.updateAt = new Date();

      this.authService.registration(user).subscribe({
        next: (res) => {
          console.log('User registered successfully:', res);
          this.authService.storeToken(res.token);
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error('Error registering user:', err);
        },
      });
    } else {
      alert('Please complete all mandatory fields.');
    }
  }
}
