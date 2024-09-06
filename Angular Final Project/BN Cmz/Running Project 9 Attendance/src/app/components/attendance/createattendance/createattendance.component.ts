import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AttendanceService } from '../../../services/attendance.service';
import { EmployeeModel } from '../../../models/employee.model';
import { AttendanceModel } from '../../../models/attendance.model';

@Component({
  selector: 'app-createattendance',
  templateUrl: './createattendance.component.html',
  styleUrls: ['./createattendance.component.css'],
})
export class CreateattendanceComponent implements OnInit {
  attendanceForm!: FormGroup;
  employees: EmployeeModel[] = [];
  attendances: AttendanceModel[] = [];
  loading = false;
  errorMessage: string | null = null;
  attendence: AttendanceModel = new AttendanceModel();

  constructor(
    private fb: FormBuilder,
    private attendanceService: AttendanceService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.fetchEmployees();
    this.fetchAttendances();
  }

  // Initialize form
  initializeForm(): void {
    this.attendanceForm = this.fb.group({
      employeeId: ['', Validators.required],
      clockInTime: [null],
      clockOutTime: [null],
    });
  }

  // Fetch employees for dropdown
  fetchEmployees(): void {
    this.attendanceService.getAllEmployees().subscribe(
      (employees) => {
        this.employees = employees;
      },
      (error) => {
        this.errorMessage = 'Failed to load employees';
      }
    );
  }

  // Fetch all attendances to show in the table
  fetchAttendances(): void {
    this.attendanceService.getAllAttendances().subscribe(
      (attendances) => {
        console.log('Attendances:', attendances); // Log to see the response
        this.attendances = attendances;
      },
      (error) => {
        this.errorMessage = 'Failed to load attendance records';
      }
    );
  }

  // Handle clock-in and clock-out actions
  saveAttendance(action: 'checkIn' | 'checkOut'): void {
    const employeeId = this.attendanceForm.get('employeeId')?.value;
    this.loading = true;
    this.errorMessage = null;

    if (action === 'checkIn') {
      this.attendanceService
        .clockInEmployee(employeeId, this.attendence)
        .subscribe(
          (response) => {
            this.loading = false;
            this.fetchAttendances(); // Refresh attendances after clock-in
          },
          (error) => {
            this.loading = false;
            this.errorMessage = 'Failed to check in employee.';
          }
        );
    } else if (action === 'checkOut') {
      this.attendanceService.clockOutEmployee(employeeId).subscribe(
        (response) => {
          this.loading = false;
          this.fetchAttendances(); // Refresh attendances after clock-out
        },
        (error) => {
          this.loading = false;
          this.errorMessage = 'Failed to check out employee.';
        }
      );
    }
  }
}
