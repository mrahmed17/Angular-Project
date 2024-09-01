import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../../../services/employee.service';
import { EmployeeModel } from '../../../models/employee.model';

@Component({
  selector: 'app-createemployee',
  templateUrl: './createemployee.component.html',
  styleUrls: ['./createemployee.component.css'],
})
export class CreateemployeeComponent {
  employeeForm: FormGroup;
  loading = false;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private router: Router
  ) {
    this.employeeForm = this.fb.group({
      username: ['', Validators.required],
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      contactNumber: ['', Validators.required],
      gender: ['Male', Validators.required],
      age: ['', Validators.required],
      nidNo: ['', Validators.required],
      department: ['', Validators.required],
      managerId: ['', Validators.required],
      hireDate: ['', Validators.required],
      payrollCalculationMethod: ['Weekly', Validators.required],
      hourlyRate: ['', Validators.required],
      profilePhoto: [''],
    });
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      this.loading = true;
      const newEmployee = new EmployeeModel(
        this.generateEmployeeId(this.employeeForm.value.username),
        this.employeeForm.value.username,
        this.employeeForm.value.fullName,
        this.employeeForm.value.email,
        this.employeeForm.value.address,
        this.employeeForm.value.contactNumber,
        'Employee',
        this.employeeForm.value.gender,
        this.employeeForm.value.age,
        this.employeeForm.value.nidNo,
        this.employeeForm.value.department,
        this.employeeForm.value.managerId,
        new Date(this.employeeForm.value.hireDate),
        this.employeeForm.value.payrollCalculationMethod,
        this.employeeForm.value.hourlyRate,
        '250',
        this.employeeForm.value.profilePhoto
      );

      this.employeeService.createEmployee(newEmployee).subscribe(
        (data: EmployeeModel) => {
          this.loading = false;
          this.router.navigate(['/employees/list']);
        },
        (error) => {
          this.errorMessage = 'Failed to create employee.';
          this.loading = false;
          console.error('Failed to create employee', error);
        }
      );
    }
  }

  cancel(): void {
    this.router.navigate(['/employees/list']);
  }

  private generateEmployeeId(username: string): string {
    const randomNumber = Math.floor(Math.random() * 10000);
    return `${username}-${randomNumber}`;
  }
}
