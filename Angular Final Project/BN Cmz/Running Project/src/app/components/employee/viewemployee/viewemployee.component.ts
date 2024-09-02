import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../../services/employee.service';
import { DepartmentService } from '../../../services/department.service';
import { EmployeeModel } from '../../../models/employee.model';
import { DepartmentModel } from '../../../models/department.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-viewemployee',
  templateUrl: './viewemployee.component.html',
  styleUrls: ['./viewemployee.component.css'],
})
export class ViewemployeeComponent
{
  // implements OnInit {
  // errorMessage: string | null = null;
  // loading: boolean = false;
  // employee: EmployeeModel | null = null;

  // constructor(
  //   private employeeService: EmployeeService,
  //   private route: ActivatedRoute
  // ) {}

  // ngOnInit(): void {
  //   this.loading = true;
  //   const departmentId = this.route.snapshot.paramMap.get('id');
  //   if (departmentId) {
  //     this.employeeService.getEmployeesByDepartment(departmentId).subscribe({
  //       next: (employees) => {
  //         this.loading = false;
  //         this.employee = employees.length > 0 ? employees[0] : null;
  //       },
  //       error: (err) => {
  //         this.loading = false;
  //         this.errorMessage = 'Could not load employee data';
  //       },
  //     });
  //   }
  // }

  // goBack(): void {
  //   window.history.back();
  // }
}