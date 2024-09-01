import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../../../services/employee.service';
import { EmployeeModel } from '../../../models/employee.model';

@Component({
  selector: 'app-createemployee',
  templateUrl: './createemployee.component.html',
  styleUrls: ['./createemployee.component.css']
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
      hireDate: [{ value: new Date().toISOString().substring(0, 16), disabled: true }],
      status: [true],
      hourlyRate: [250, Validators.required],
      createdAt: [{ value: new Date().toISOString(), disabled: true }],
      updatedAt: [{ value: new Date().toISOString(), disabled: true }],
      updateStatus: ['']
    });
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      const newEmployee: EmployeeModel = {
        ...this.employeeForm.value,
        hireDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        id: this.generateEmployeeId(),
      };

      this.employeeService.createEmployee(newEmployee).subscribe(
        () => {
          this.router.navigate(['/employees']);
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
      hireDate: new Date().toISOString().substring(0, 16),
      status: true,
      hourlyRate: 250,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      updateStatus: ''
    });
  }

  cancel(): void {
    this.router.navigate(['/employees']);
  }
}