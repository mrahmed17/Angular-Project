import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../../services/employee.service';
import { DepartmentService } from '../../../services/department.service';
import { EmployeeModel } from '../../../models/employee.model';
import { DepartmentModel } from '../../../models/department.model';

@Component({
  selector: 'app-viewemployee',
  templateUrl: './viewemployee.component.html',
  styleUrls: ['./viewemployee.component.css'],
})
export class ViewemployeeComponent implements OnInit {
  departments: DepartmentModel[] = [];
  employees: EmployeeModel[] = [];
  selectedDepartmentId: string = '';

  constructor(
    private employeeService: EmployeeService,
    private departmentService: DepartmentService
  ) {}

  ngOnInit(): void {
    this.loadDepartments();
  }

  loadDepartments(): void {
    this.departmentService.getAllDepartments().subscribe((departments) => {
      this.departments = departments;
    });
  }

  onDepartmentChange(departmentId: string): void {
    if (departmentId) {
      this.employeeService
        .getEmployeesByDepartment(departmentId)
        .subscribe((employees) => {
          this.employees = employees;
        });
    } else {
      this.employees = [];
    }
  }
}