import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../../../services/employee.service';
import { EmployeeModel } from '../../../models/employee.model';

@Component({
  selector: 'app-listemployee',
  templateUrl: './listemployee.component.html',
  styleUrls: ['./listemployee.component.css']
})
export class ListemployeeComponent implements OnInit {
  employees: EmployeeModel[] = [];

  constructor(private employeeService: EmployeeService, private router: Router) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.employeeService.getAllEmployees().subscribe(
      (data) => {
        this.employees = data;
      },
      (error) => {
        console.error('Error loading employees:', error);
      }
    );
  }

  editEmployee(id: string): void {
    this.router.navigate(['/employees/edit', id]);
  }

  deleteEmployee(id: string): void {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(id).subscribe(
        () => {
          this.employees = this.employees.filter((employee) => employee.id !== id);
          console.log('Employee deleted successfully.');
        },
        (error) => {
          console.error('Error deleting employee:', error);
        }
      );
    }
  }

  viewEmployee(id: string): void {
    this.router.navigate(['/employees/view', id]);
  }

  goBack(): void {
    this.router.navigate(['/employees/list']); // Navigate to the home page or wherever you want to go back
  }
}