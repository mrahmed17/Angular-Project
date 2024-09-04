import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AttendanceService } from '../../../services/attendance.service';

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
  employeeData: any[] = [];

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
        console.log('Attendance Data:', data); // Add this line
        this.attendanceData = data;
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
