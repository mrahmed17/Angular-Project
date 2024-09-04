import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../../services/employee.service';
import { EmployeeModel } from '../../../models/employee.model';
import { DepartmentService } from '../../../services/department.service'; 
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-viewemployee',
  templateUrl: './viewemployee.component.html',
  styleUrls: ['./viewemployee.component.css'],
})
export class ViewemployeeComponent implements OnInit {
  employees: EmployeeModel[] = [];
  departments: any[] = []; // Adjust this type according to your department model
  viewEmployeeForm!: FormGroup;

  loading = false; // Set to false initially, since no loading is happening on initialization.
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private departmentService: DepartmentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Initialize the form
    this.viewEmployeeForm = this.fb.group({
      departmentId: [''],
    });

    // Load departments on component initialization
    this.loadDepartments();

    // Load employees when department changes
    this.viewEmployeeForm
      .get('departmentId')
      ?.valueChanges.subscribe((departmentId) => {
        this.errorMessage = null; // Reset error message before loading new data
        this.employees = []; // Clear previous data
        if (departmentId) {
          this.loadEmployees(departmentId);
        } else {
          this.employees = [];
        }
      });
  }

  // Load all departments
  loadDepartments(): void {
    this.loading = true;
    this.departmentService.getAllDepartments().subscribe(
      (departments) => {
        this.departments = departments;
        this.loading = false;
      },
      (error) => {
        this.errorMessage = 'Failed to load departments.';
        this.loading = false;
      }
    );
  }

  // Load employees based on selected department
  loadEmployees(departmentId: string): void {
    this.loading = true;
    this.employeeService.getEmployeesByDepartment(departmentId).subscribe(
      (employees) => {
        this.employees = employees;
        this.loading = false;
      },
      (error) => {
        this.errorMessage = 'Failed to load employees.';
        this.loading = false;
      }
    );
  }

  // Navigate back to the employee list
  goBack(): void {
    this.router.navigate(['/employees/list']);
  }
}