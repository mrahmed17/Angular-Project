import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PayrollService } from '../../../services/payroll.service';
import { PayrollModel } from '../../../models/payroll.model';
import { Employee, Manager } from '../../../models/payroll.model';
import { forkJoin } from 'rxjs';
import { ManagerService } from '../../../services/manager.service';
import { EmployeeService } from '../../../services/employee.service';

@Component({
  selector: 'app-createpayroll',
  templateUrl: './createpayroll.component.html',
  styleUrls: ['./createpayroll.component.css'],
})
export class CreatepayrollComponent implements OnInit {
  payrollForm: FormGroup;
  loading = false;
  errorMessage: string | null = null;
  employees: Employee[] = [];
  managers: Manager[] = [];

  constructor(
    private fb: FormBuilder,
    private payrollService: PayrollService,
    private managerService: ManagerService,
    private employeeService: EmployeeService,
    private router: Router
  ) {
    this.payrollForm = this.fb.group({
      id: ['', Validators.required], // Manual PayrollId
      employeeId: ['', Validators.required],
      managerId: ['', Validators.required],
      hourlyRate: [{ value: 0, disabled: true }, Validators.required],
      performanceBonuses: [0, Validators.required],
      medicare: [0, Validators.required],
      deductions: [0, Validators.required],
      overtimeHours: [0, Validators.required],
      overtimeRate: [0, Validators.required],
      yearlySickDay: [0, Validators.required],
      payDate: [{ value: new Date(), disabled: true }, Validators.required], // Auto-Generated Date
      totalPay: [{ value: 0, disabled: true }, Validators.required], // Auto-Calculated Total Pay
    });
  }

  ngOnInit(): void {
    this.loadEmployeesAndManagers();

    // Listen to changes in relevant fields and recalculate totalPay
    this.payrollForm.valueChanges.subscribe(() => {
      this.calculateTotalPay();
    });
  }

  loadEmployeesAndManagers(): void {
    forkJoin([
      this.employeeService.getAllEmployees(),
      this.managerService.getAllManagers(),
    ]).subscribe(([employees, managers]) => {
      this.employees = employees;
      this.managers = managers;
    });
  }

  onEmployeeOrManagerSelect(): void {
    const employeeId = this.payrollForm.get('employeeId')?.value;
    const managerId = this.payrollForm.get('managerId')?.value;

    if (employeeId) {
      this.employeeService.getEmployeeById(employeeId).subscribe((employee) => {
        this.payrollForm.get('hourlyRate')?.setValue(employee.hourlyRate);
      });
    } else if (managerId) {
      this.managerService.getManagerById(managerId).subscribe((manager) => {
        this.payrollForm.get('hourlyRate')?.setValue(manager.hourlyRate);
      });
    }
  }

  calculateTotalPay(): void {
    const formValues = this.payrollForm.getRawValue();
    const basePay = formValues.hourlyRate * 40 * 4; // Assume 40 hours work week and 4 week a month
    const overtimePay = formValues.overtimeHours * formValues.overtimeRate;
    const totalPay =
      basePay +
      overtimePay +
      formValues.performanceBonuses -
      formValues.deductions;

    this.payrollForm.get('totalPay')?.setValue(totalPay);
  }

  onSubmit(): void {
    if (this.payrollForm.valid) {
      this.loading = true;
      const payroll: PayrollModel = new PayrollModel(
        this.payrollForm.value.id, // Use manual PayrollId
        this.payrollForm.value.employeeId,
        this.payrollForm.value.managerId,
        this.payrollForm.get('hourlyRate')?.value,
        this.payrollForm.value.performanceBonuses,
        this.payrollForm.value.medicare,
        this.payrollForm.value.deductions,
        this.payrollForm.value.overtimeHours,
        this.payrollForm.value.overtimeRate,
        this.payrollForm.value.yearlySickDay,
        new Date(this.payrollForm.get('payDate')?.value)
      );

      this.payrollService.createPayroll(payroll).subscribe(
        () => {
          this.loading = false;
          this.router.navigate(['/payrolls/list']);
        },
        (error) => {
          this.errorMessage = 'Failed to create payroll.';
          this.loading = false;
          console.error('Failed to create payroll', error);
        }
      );
    }
  }

  resetForm(): void {
    this.payrollForm.reset({
      payDate: new Date(), // Reset to current date
    });
  }

  cancel(): void {
    this.router.navigate(['/payrolls/list']);
  }
}
