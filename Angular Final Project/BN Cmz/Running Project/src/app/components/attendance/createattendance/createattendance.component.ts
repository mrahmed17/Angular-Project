import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AttendanceService } from '../../../services/attendance.service';
import { EmployeeModel } from '../../../models/employee.model';
import { ManagerModel } from '../../../models/manager.model';

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
  attendanceData: any[] = []; // Adjust type as needed based on your actual data structure

  constructor(
    private fb: FormBuilder,
    private attendanceService: AttendanceService
  ) {
    this.attendanceForm = this.fb.group({
      manager: [''],
      employee: [''],
    });
  }

  ngOnInit(): void {
    this.loadEmployeeData();
    this.loadManagerData();
    this.loadAttendanceData();
  }

  loadEmployeeData() {
    this.attendanceService.getAllAttendances().subscribe(
      (data) => {
        this.employeeData = data.filter((item) => item.role === 'employee'); // Adjust based on your data structure
      },
      (error) => {
        this.errorMessage = 'Failed to load employee data.';
      }
    );
  }

  // loadEmployeeData() {
  //   // Replace this with actual service call
  //   this.attendanceService.getAllEmployees().subscribe(
  //     (data) => {
  //       this.employeeData = data;
  //     },
  //     (error) => {
  //       this.errorMessage = 'Failed to load employee data.';
  //     }
  //   );
  // }

  loadManagerData() {
    this.attendanceService.getAllAttendances().subscribe(
      (data) => {
        this.managerData = data.filter((item) => item.role === 'manager'); // Adjust based on your data structure
      },
      (error) => {
        this.errorMessage = 'Failed to load manager data.';
      }
    );
  }

  // loadManagerData() {
  //   // Replace this with actual service call
  //   this.attendanceService.getAllManagers().subscribe(
  //     (data) => {
  //       this.managerData = data;
  //     },
  //     (error) => {
  //       this.errorMessage = 'Failed to load manager data.';
  //     }
  //   );
  // }

  loadAttendanceData() {
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
