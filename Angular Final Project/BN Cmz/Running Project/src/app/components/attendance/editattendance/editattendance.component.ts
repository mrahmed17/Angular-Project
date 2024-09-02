import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AttendanceService } from '../../../services/attendance.service';
import { ManagerService } from '../../../services/manager.service';
import { EmployeeService } from '../../../services/employee.service';


@Component({
  selector: 'app-editattendance',
  templateUrl: './editattendance.component.html',
  styleUrls: ['./editattendance.component.css'],
})
export class EditattendanceComponent implements OnInit {
  editAttendanceForm: FormGroup;
  loading = false;
  attendanceId: string = ''; // Default empty string
  attendance: any = {}; // Default empty object or appropriate default
  errorMessage: string = ''; // Default empty string

  managerData: any[] = []; // Array to hold manager data
  employeeData: any[] = []; // Array to hold employee data

  constructor(
    private fb: FormBuilder,
    private attendanceService: AttendanceService,
    private managerService: ManagerService,
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.editAttendanceForm = this.fb.group({
      employeeId: ['', Validators.required],
      clockInTime: ['', Validators.required],
      clockOutTime: [''],
      managerId: [''], // Added managerId for selection
    });
  }

  ngOnInit(): void {
    this.attendanceId = this.route.snapshot.paramMap.get('id')!;
    this.loadAttendance();
    this.loadManagers(); // Load managers for dropdown
    this.loadEmployees(); // Load employees for dropdown
  }

  loadAttendance(): void {
    this.loading = true;

    // Placeholder values for fullName and role
    const fullName = ''; // You may need to fetch or pass this value
    const role: 'employee' | 'manager' = 'employee'; // Replace with appropriate role

    this.attendanceService
      .getAttendanceById(this.attendanceId, fullName, role)
      .subscribe({
        next: (data) => {
          this.attendance = data;
          this.editAttendanceForm.patchValue({
            employeeId: data.employeeId,
            clockInTime: data.clockInTime,
            clockOutTime: data.clockOutTime,
            managerId: data.managerId, // Populate managerId
          });
          this.loading = false;
        },
        error: (error) => {
          this.errorMessage = 'Failed to load attendance record';
          this.loading = false;
        },
      });
  }

  loadManagers(): void {
    this.managerService.getAllManagers().subscribe({
      next: (data) => {
        this.managerData = data;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load managers';
      },
    });
  }

  loadEmployees(): void {
    this.employeeService.getAllEmployees().subscribe({
      next: (data) => {
        this.employeeData = data;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load employees';
      },
    });
  }

  onSubmit(): void {
    if (this.editAttendanceForm.invalid) {
      return;
    }

    this.loading = true;
    this.attendanceService
      .updateAttendance(this.attendanceId, this.editAttendanceForm.value)
      .subscribe({
        next: () => {
          this.router.navigate(['/attendance']);
        },
        error: (error) => {
          this.errorMessage = 'Failed to update attendance record';
          this.loading = false;
        },
      });
  }

  deleteAttendance(attendanceId: string): void {
    this.loading = true;
    this.attendanceService.deleteAttendance(attendanceId).subscribe({
      next: () => {
        this.router.navigate(['/attendance']);
      },
      error: (error) => {
        this.errorMessage = 'Failed to delete attendance record';
        this.loading = false;
      },
    });
  }

  cancel(): void {
    this.router.navigate(['/attendances/list']);
  }
}