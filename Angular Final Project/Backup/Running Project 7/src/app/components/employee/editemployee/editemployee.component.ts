import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../../services/employee.service';
import { EmployeeModel } from '../../../models/employee.model';

@Component({
  selector: 'app-editemployee',
  templateUrl: './editemployee.component.html',
  styleUrls: ['./editemployee.component.css'],
})
export class EditemployeeComponent implements OnInit {
  employeeForm!: FormGroup;
  employeeId!: string;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Get employeeId from route parameters
    this.employeeId = this.route.snapshot.paramMap.get('id') || '';

    // Initialize form
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
      createdAt: [{ value: new Date().toISOString(), readonly: true }],
      updatedAt: [{ value: new Date().toISOString(), readonly: true }],
    });

    // Fetch employee details
    this.loadEmployee();
  }

  loadEmployee(): void {
    if (this.employeeId) {
      this.employeeService.getEmployeeById(this.employeeId).subscribe(
        (employee: EmployeeModel) => {
          this.employeeForm.patchValue({
            ...employee,
            hireDate: employee.hireDate
              ? new Date(employee.hireDate).toISOString().substring(0, 16)
              : '',
            createdAt: new Date(employee.createdAt).toISOString(),
            updatedAt: new Date(employee.updatedAt).toISOString(),
          });
        },
        (error) => {
          console.error('Error fetching employee details:', error);
        }
      );
    }
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      const updatedEmployee: EmployeeModel = {
        ...this.employeeForm.value,
        updatedAt: new Date(), // Set updatedAt to current date/time
      };

      this.employeeService
        .updateEmployee(this.employeeId, updatedEmployee)
        .subscribe(
          () => {
            this.router.navigate(['/employees']); // Redirect after successful update
          },
          (error) => {
            console.error('Error updating employee:', error);
          }
        );
    }
  }

  resetForm(): void {
    this.loadEmployee(); // Reload employee data to reset form
  }
}
