import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../../services/employee.service';
import { EmployeeModel } from '../../../models/employee.model';
import { DepartmentService } from '../../../services/department.service'; // Ensure you have this service to get department data
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-viewemployee',
  templateUrl: './viewemployee.component.html',
  styleUrls: ['./viewemployee.component.css']
})
export class ViewemployeeComponent implements OnInit {
  departments: any[] = []; // Adjust this type according to your department model
  employees: EmployeeModel[] = [];
  viewEmployeeForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private departmentService: DepartmentService
  ) {}

  ngOnInit(): void {
    // Initialize the form
    this.viewEmployeeForm = this.fb.group({
      departmentId: ['']
    });

    // Load departments on component initialization
    this.loadDepartments();

    // Load employees when department changes
    this.viewEmployeeForm.get('departmentId')?.valueChanges.subscribe((departmentId) => {
      if (departmentId) {
        this.loadEmployees(departmentId);
      } else {
        this.employees = [];
      }
    });
  }

  // Load all departments
  loadDepartments(): void {
    this.departmentService.getAllDepartments().subscribe((departments) => {
      this.departments = departments;
    });
  }

  // Load employees based on selected department
  loadEmployees(departmentId: string): void {
    this.employeeService.getEmployeesByDepartment(departmentId).subscribe((employees) => {
      this.employees = employees;
    });
  }
}