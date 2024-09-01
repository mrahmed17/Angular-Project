import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../../services/employee.service';
import { DepartmentService } from '../../../services/department.service';
import { ManagerService } from '../../../services/manager.service';
import { EmployeeModel } from '../../../models/employee.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-editemployee',
  templateUrl: './editemployee.component.html',
  styleUrls: ['./editemployee.component.css'],
})
export class EditemployeeComponent implements OnInit {
  employeeForm!: FormGroup;
  departments$!: Observable<any[]>;
  managers$!: Observable<any[]>;
  employeeId!: string;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private departmentService: DepartmentService,
    private managerService: ManagerService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.employeeId = this.route.snapshot.paramMap.get('id')!;
    this.departments$ = this.departmentService.getAllDepartments();
    this.managers$ = this.managerService.getAllManagers();

    this.employeeService
      .getEmployeeById(this.employeeId)
      .subscribe((employee) => {
        this.employeeForm = this.fb.group({
          username: [employee.username, Validators.required],
          fullName: [employee.fullName, Validators.required],
          email: [employee.email, [Validators.required, Validators.email]],
          address: [employee.address, Validators.required],
          contactNumber: [employee.contactNumber, Validators.required],
          gender: [employee.gender, Validators.required],
          age: [employee.age, Validators.required],
          nidNo: [employee.nidNo, Validators.required],
          departmentId: [employee.departmentId, Validators.required], // Directly use the string value
          managerId: [employee.managerId, Validators.required], // Directly use the string value
          profilePhoto: [employee.profilePhoto],
          hireDate: [
            {
              value: new Date(employee.hireDate).toISOString().substring(0, 16),
              disabled: true,
            },
          ],
          payrollCalculationMethod: [
            employee.payrollCalculationMethod,
            Validators.required,
          ],
          status: [{ value: employee.status, disabled: true }], // boolean value for checkbox
          hourlyRate: [{ value: employee.hourlyRate, disabled: true }], // number value for input
          createdAt: [{ value: employee.createdAt, disabled: true }], // string value for text input
          updatedAt: [{ value: employee.updatedAt, disabled: true }], // string value for text input
        });
      });
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      const updatedEmployee: EmployeeModel = {
        ...this.employeeForm.value,
        updatedAt: new Date().toISOString(),
      };
      this.employeeService
        .updateEmployee(this.employeeId, updatedEmployee)
        .subscribe(() => {
          this.router.navigate(['/employees/list']);
        });
    }
  }

  resetForm(): void {
    this.employeeForm.reset();
  }

  cancel(): void {
    this.router.navigate(['/employees/list']);
  }
}
