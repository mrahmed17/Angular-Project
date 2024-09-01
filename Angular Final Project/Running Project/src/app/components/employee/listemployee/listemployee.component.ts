import { Component, OnInit } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { EmployeeService } from '../../../services/employee.service';
import { DepartmentService } from '../../../services/department.service';
import { ManagerService } from '../../../services/manager.service';
import { EmployeeModel } from '../../../models/employee.model';

@Component({
  selector: 'app-listemployee',
  templateUrl: './listemployee.component.html',
  styleUrls: ['./listemployee.component.css'],
})
export class ListemployeeComponent implements OnInit {
  employees$!: Observable<EmployeeModel[]>;
  departments: any[] = [];
  managers: any[] = [];

  constructor(
    private employeeService: EmployeeService,
    private departmentService: DepartmentService,
    private managerService: ManagerService
  ) {}

  ngOnInit(): void {
    this.loadEmployeeData();
  }

  loadEmployeeData(): void {
    forkJoin({
      employees: this.employeeService.getAllEmployees(),
      departments: this.departmentService.getAllDepartments(),
      managers: this.managerService.getAllManagers(),
    }).subscribe(({ employees, departments, managers }) => {
      this.departments = departments;
      this.managers = managers;
      this.employees$ = this.transformEmployees(employees);
    });
  }

  transformEmployees(employees: EmployeeModel[]): Observable<EmployeeModel[]> {
    return new Observable((subscriber) => {
      const transformed = employees.map((employee) => ({
        ...employee,
        departmentName: this.getDepartmentName(employee.departmentId),
        managerName: this.getManagerName(employee.managerId),
      }));
      subscriber.next(transformed);
      subscriber.complete();
    });
  }

  getDepartmentName(departmentId: string): string {
    return (
      this.departments.find((d) => d.id === departmentId)?.name || 'Unknown'
    );
  }

  getManagerName(managerId: string): string {
    return this.managers.find((m) => m.id === managerId)?.fullName || 'Unknown';
  }

  deleteEmployee(employeeId: string): void {
    // Add your delete logic here
  }
}