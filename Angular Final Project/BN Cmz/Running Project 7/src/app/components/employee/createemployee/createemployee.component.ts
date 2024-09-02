import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../../../services/employee.service';
import { EmployeeModel } from '../../../models/employee.model';

@Component({
  selector: 'app-createemployee',
  templateUrl: './createemployee.component.html',
  styleUrls: ['./createemployee.component.css'],
})
export class CreateemployeeComponent implements OnInit {
  employeeForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      username: ['', Validators.required],
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      contactNumber: ['', Validators.required],
      departmentId: ['', Validators.required],
      managerId: ['', Validators.required],
      hireDate: ['', Validators.required],
      status: [true],
      hourlyRate: [250, Validators.required],
      // createdAt and updateStatus fields will be handled programmatically
    });
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      const newEmployee: EmployeeModel = {
        ...this.employeeForm.value,
        createdAt: new Date(), // Auto-generated
        updatedAt: new Date(), // Same as createdAt initially
        id: this.generateEmployeeId(), // Manually generated ID
      };

      this.employeeService.createEmployee(newEmployee).subscribe(
        () => {
          this.router.navigate(['/employees']); // Redirect after successful creation
        },
        (error) => {
          console.error('Error creating employee:', error);
        }
      );
    }
  }

  generateEmployeeId(): string {
    return 'EMP' + Math.random().toString(36).substr(2, 9).toUpperCase();
  }

  resetForm(): void {
    this.employeeForm.reset({
      username: '',
      fullName: '',
      email: '',
      address: '',
      contactNumber: '',
      departmentId: '',
      managerId: '',
      hireDate: '',
      status: true,
      hourlyRate: 250,
    });
  }
}