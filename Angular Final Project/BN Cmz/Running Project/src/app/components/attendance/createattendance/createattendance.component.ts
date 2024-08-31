import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AttendanceService } from '../../../services/attendance.service';
import { AttendanceModel } from '../../../models/attendance.model';

@Component({
  selector: 'app-createattendance',
  templateUrl: './createattendance.component.html',
  styleUrls: ['./createattendance.component.css'],
})
export class CreateattendanceComponent implements OnInit {
  attendanceForm: FormGroup;
  loading = false;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private attendanceService: AttendanceService,
    private router: Router
  ) {
    this.attendanceForm = this.fb.group({
      userId: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      role: ['Employee', Validators.required],
      profilePhoto: ['', Validators.required],
      clockOutTime: [null],
      status: ['Present', Validators.required],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.attendanceForm.valid) {
      this.loading = true;
      const attendanceData: AttendanceModel = {
        ...this.attendanceForm.value,
        id: '', // ID will be generated by the server
        totalHours: 0, // Default to 0; will be calculated later
        date: new Date().toISOString(),
        clockInTime: new Date().toISOString(),
      };

      this.attendanceService.createAttendance(attendanceData).subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/attendances/list']);
        },
        error: (error) => {
          this.errorMessage = 'Failed to create attendance record.';
          this.loading = false;
          console.error('Failed to create attendance', error);
        },
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/attendances/list']);
  }
}
