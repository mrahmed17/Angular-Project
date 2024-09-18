import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AttendanceService } from '../../../services/attendance.service';
import { EmployeeModel } from '../../../models/employee.model';


@Component({
  selector: 'app-createattendance',
  templateUrl: './createattendance.component.html',
  styleUrls: ['./createattendance.component.css'],
})
export class CreateattendanceComponent implements OnInit {
  attendanceForm: FormGroup;
  loading = false;
  errorMessage = '';

  // Define the types for employeeData and managerData
  employeeData: EmployeeModel[] = [];
  managerData: ManagerModel[] = [];
  attendanceData: any[] = []; // Assuming attendanceData will have a more complex type, adjust as needed

  constructor(
    private fb: FormBuilder,
    private attendanceService: AttendanceService
  ) {
    this.attendanceForm = this.fb.group({
      manager: ['', Validators.required],
      employee: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // Fetch employee and manager data here
    this.loadEmployeeData();
    this.loadManagerData();
    this.loadAttendanceData();
  }

  loadEmployeeData() {
    // Replace this with actual service call
    this.employeeData = [
      // Example data
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Smith' },
    ];
  }

  loadManagerData() {
    // Replace this with actual service call
    this.managerData = [
      // Example data
      { id: 1, name: 'Michael Scott' },
      { id: 2, name: 'Pam Beesly' },
    ];
  }

  loadAttendanceData() {
    // Load all attendance data
    this.attendanceService.getAllAttendances().subscribe(
      (data) => {
        this.attendanceData = data;
      },
      (error) => {
        this.errorMessage = 'Failed to load attendance data.';
      }
    );
  }

  saveAttendance(action: 'checkIn' | 'checkOut') {
    const selectedManager = this.attendanceForm.get('manager')?.value;
    const selectedEmployee = this.attendanceForm.get('employee')?.value;

    if (!selectedManager && !selectedEmployee) {
      this.errorMessage = 'Please select either a manager or an employee.';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    if (selectedManager) {
      if (action === 'checkIn') {
        this.attendanceService.clockInManager(selectedManager).subscribe(
          (response) => {
            this.loading = false;
            this.loadAttendanceData();
          },
          (error) => {
            this.loading = false;
            this.errorMessage = 'Failed to check in manager.';
          }
        );
      } else {
        this.attendanceService.clockOutManager(selectedManager).subscribe(
          (response) => {
            this.loading = false;
            this.loadAttendanceData();
          },
          (error) => {
            this.loading = false;
            this.errorMessage = 'Failed to check out manager.';
          }
        );
      }
    } else if (selectedEmployee) {
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
}