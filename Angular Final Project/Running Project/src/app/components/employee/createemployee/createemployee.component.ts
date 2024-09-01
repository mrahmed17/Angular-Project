import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { EmployeeService } from '../../../services/employee.service';
import { DepartmentService } from '../../../services/department.service';
import { ManagerService } from '../../../services/manager.service';
import { EmployeeModel } from '../../../models/employee.model';
import { DepartmentModel } from '../../../models/department.model';
import { ManagerModel } from '../../../models/manager.model';

@Component({
  selector: 'app-createemployee',
  templateUrl: './createemployee.component.html',
  styleUrls: ['./createemployee.component.css'],
})
export class CreateemployeeComponent implements OnInit, OnDestroy {
  employeeForm!: FormGroup;
  departments$: Observable<DepartmentModel[]> = of([]);
  managers$: Observable<ManagerModel[]> = of([]);
  private subscription: Subscription = new Subscription();
  errorMessage: string | null = null;
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private departmentService: DepartmentService,
    private managerService: ManagerService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Initialize form with validation
    this.employeeForm = this.fb.group({
      username: ['', [Validators.required]],
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required]],
      contactNumber: ['', [Validators.required]],
      gender: ['Male', [Validators.required]],
      age: ['', [Validators.required]],
      nidNo: ['', [Validators.required]],
      departmentId: ['', [Validators.required]],
      managerId: ['', [Validators.required]],
      profilePhoto: [''],
      // Hidden fields
      status: [true], // Default to active
      hourlyRate: [250], // Fixed hourly rate
      hireDate: [new Date()], // System date for hireDate
      createdAt: [new Date()], // System date for createdAt
      updatedAt: [''], // Hidden field
    });

    // Fetch departments and managers for dropdowns
    this.departments$ = this.departmentService.getAllDepartments();
    this.managers$ = this.managerService.getAllManagers();
  }

  // Method to create a new employee
  onSubmit(): void {
    if (this.employeeForm.valid) {
      const newEmployee: EmployeeModel = {
        ...this.employeeForm.value,
        hireDate: new Date(), // Ensure hireDate is set to current date
        updatedAt: new Date(), // Ensure updatedAt is set to current date
      };

      this.subscription.add(
        this.employeeService
          .createEmployee(newEmployee)
          .pipe(
            map((employee) => {
              console.log('Employee created successfully:', employee);
              this.router.navigate(['/employees/list']); // Redirect to the employees list
            }),
            catchError((error) => {
              console.error('Error creating employee:', error);
              this.errorMessage = 'Failed to create employee.';
              return [];
            })
          )
          .subscribe()
      );
    }
  }

  resetForm(): void {
    this.employeeForm.reset({
      status: true,
      hourlyRate: 250,
      hireDate: new Date(),
      createdAt: new Date(),
      updatedAt: '',
    });
  }

  cancel(): void {
    this.router.navigate(['/employees/list']);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
