import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ManagerService } from '../../../services/manager.service';

@Component({
  selector: 'app-createmanager',
  templateUrl: './createmanager.component.html',
  styleUrls: ['./createmanager.component.css'],
})
export class CreatemanagerComponent implements OnInit {
  managerForm: FormGroup;
  submissionError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private managerService: ManagerService,
    private router: Router
  ) {
    this.managerForm = this.fb.group({
      username: ['', Validators.required],
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contactNumber: ['', Validators.required],
      gender: ['Male', Validators.required],
      dateOfBirth: ['', Validators.required],
      nidNo: [null, [Validators.required, Validators.pattern('^[0-9]*$')]],
      hireDate: ['', Validators.required],
      payrollCalculationMethod: ['Monthly', Validators.required],
      hourlyRate: [0, [Validators.required, Validators.min(0)]],
      profilePhoto: [''],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.managerForm.invalid) {
      return;
    }

    const formValue = this.managerForm.value;
    this.managerService
      .createManager(
        formValue.username,
        formValue.fullName,
        formValue.email,
        formValue.contactNumber,
        formValue.gender,
        formValue.dateOfBirth,
        formValue.nidNo,
        new Date(formValue.hireDate),
        formValue.payrollCalculationMethod,
        formValue.hourlyRate,
        formValue.profilePhoto
      )
      .subscribe(
        () => {
          this.router.navigate(['/managers/list']);
        },
        (error) => {
          this.submissionError = 'Failed to create manager. Please try again.';
          console.error('Create Manager Error:', error);
        }
      );
  }

  // // Method to create a new manager and save it to db.json
  // createManager(
  //   username: string,
  //   fullName: string,
  //   email: string,
  //   contactNumber: string,
  //   gender: 'Male' | 'Female' | 'Other',
  //   dateOfBirth: Date,
  //   nidNo: number,
  //   hireDate: Date,
  //   payrollCalculationMethod: 'Weekly' | 'Monthly',
  //   hourlyRate: number,
  //   profilePhoto?: string
  // ): Observable<ManagerModel> {
  //   const managerId = this.generateManagerId(username);
  //   const currentDate = new Date();
  //   const newManager = new ManagerModel(
  //     managerId,
  //     username,
  //     fullName,
  //     email,
  //     contactNumber,
  //     'Manager',
  //     gender,
  //     dateOfBirth,
  //     nidNo,
  //     hireDate,
  //     payrollCalculationMethod,
  //     hourlyRate,
  //     currentDate,
  //     currentDate,
  //     currentDate,
  //     profilePhoto
  //   );

  //   // Save the new manager to db.json
  //   return this.http
  //     .post<ManagerModel>(this.apiUrl, newManager)
  //     .pipe(catchError(this.handleError));
  // }

  resetForm(): void {
    this.managerForm.reset();
  }

  cancel(): void {
    this.router.navigate(['/managers/list']);
  }
}
