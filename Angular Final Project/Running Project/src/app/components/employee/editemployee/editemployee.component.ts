import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../../services/employee.service';
import { EmployeeModel } from '../../../models/employee.model';

@Component({
  selector: 'app-editemployee',
  templateUrl: './editemployee.component.html',
  styleUrls: ['./editemployee.component.css']
})
export class EditemployeeComponent implements OnInit {
  employeeForm!: FormGroup;
  employeeId!: string;
  employee!: EmployeeModel;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.employeeId = this.route.snapshot.paramMap.get('id')!;
    this.loadEmployee();

    this.employeeForm = this.fb.group({
      username: ['', Validators.required],
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      contactNumber: ['', Validators.required],
      departmentId: ['', Validators.required],
      managerId: ['', Validators.required],
      hireDate: [{ value: '', disabled: true }],
      status: [true],
      hourlyRate: [250, Validators.required],
      createdAt: [{ value: '', disabled: true }],
      updatedAt: [{ value: new Date().toISOString(), disabled: true }],
      updateStatus: ['']
    });
  }

  loadEmployee(): void {
    this.employeeService.getEmployeeById(this.employeeId).subscribe(
      (employee) => {
        this.employee = employee;
        this.employeeForm.patchValue({
          username: employee.username,
          fullName: employee.fullName,
          email: employee.email,
          address: employee.address,
          contactNumber: employee.contactNumber,
          departmentId: employee.departmentId,
          managerId: employee.managerId,
          hireDate: employee.hireDate.toISOString().substring(0, 16),
          status: employee.status,
          hourlyRate: employee.hourlyRate,
          createdAt: employee.createdAt.toISOString(),
          updatedAt: new Date().toISOString(),
          updateStatus: employee.updateStatus
        });
      },
      (error) => {
        console.error('Error loading employee:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      const updatedEmployee: EmployeeModel = {
        ...this.employeeForm.value,
        id: this.employeeId,
        hireDate: new Date(this.employeeForm.get('hireDate')!.value),
        createdAt: this.employee.createdAt,
        updatedAt: new Date()
      };

      this.employeeService.updateEmployee(this.employeeId, updatedEmployee).subscribe(
        () => {
          this.router.navigate(['/employees']);
        },
        (error) => {
          console.error('Error updating employee:', error);
        }
      );
    }
  }

  cancel(): void {
    this.router.navigate(['/employees']);
  }
}