import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AttendanceService } from '../../../services/attendance.service';
import { EmployeeModel } from '../../../models/employee.model';

@Component({
  selector: 'app-createattendance',
  templateUrl: './createattendance.component.html',
  styleUrls: ['./createattendance.component.css'],
})
export class CreateattendanceComponent implements OnInit {
  attendanceForm!: FormGroup;
  loading = false;
  errorMessage = '';
  attendanceData: any[] = [];
  employeeData: EmployeeModel[] = [];

  constructor(
    private fb: FormBuilder,
    private attendanceService: AttendanceService
  ) {}

  ngOnInit(): void {
    this.attendanceForm = this.fb.group({
      employee: ['', Validators.required],
    });
    this.loadEmployees();
    this.loadAttendanceData();
  }

  loadEmployees() {
    this.attendanceService.getAllEmployees().subscribe(
      (data) => {
        this.employeeData = data;
      },
      (error) => {
        this.errorMessage = 'Failed to load employees.';
      }
    );
  }

  loadAttendanceData() {
    this.attendanceService.getAllAttendances().subscribe(
      (data) => {
        this.attendanceService.getAllEmployees().subscribe((employees) => {
          this.attendanceData = data.map((attendance) => ({
            ...attendance,
            employee: employees.find((emp) => emp.id === attendance.employeeId),
          }));
        });
      },
      (error) => {
        this.errorMessage = 'Failed to load attendance data.';
      }
    );
  }

  saveAttendance(action: 'checkIn' | 'checkOut') {
    const selectedEmployee = this.attendanceForm.get('employee')?.value;

    if (!selectedEmployee) {
      this.errorMessage = 'Please select an employee.';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    if (action === 'checkIn') {
      this.attendanceService.clockInEmployee(selectedEmployee).subscribe(
        (response) => {
          this.loading = false;
          this.loadAttendanceData();
        },
        (error) => {
          this.loading = false;
          this.errorMessage = 'Failed to check in employee.';
        }
      );
    } else {
      this.attendanceService.clockOutEmployee(selectedEmployee).subscribe(
        (response) => {
          this.loading = false;
          this.loadAttendanceData();
        },
        (error) => {
          this.loading = false;
          this.errorMessage = 'Failed to check out employee.';
        }
      );
    }
  }
}
