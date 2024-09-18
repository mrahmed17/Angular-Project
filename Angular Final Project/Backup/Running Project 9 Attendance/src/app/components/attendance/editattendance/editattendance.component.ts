import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AttendanceService } from '../../../services/attendance.service';


@Component({
  selector: 'app-editattendance',
  templateUrl: './editattendance.component.html',
  styleUrls: ['./editattendance.component.css'],
})
export class EditattendanceComponent implements OnInit {
  attendanceForm!: FormGroup;
  attendanceId!: number;
  loading = false;
  errorMessage = '';
  employeeData: any[] = [];

  constructor(
    private fb: FormBuilder,
    private attendanceService: AttendanceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.attendanceForm = this.fb.group({
      employee: ['', Validators.required],
      checkIn: ['', Validators.required],
      checkOut: ['', Validators.required],
    });

    this.route.params.subscribe((params) => {
      this.attendanceId = params['id'];
      this.loadAttendance();
      this.loadEmployees();
    });
  }

  loadAttendance() {
    this.attendanceService.getAttendanceById(this.attendanceId).subscribe(
      (data) => {
        this.attendanceForm.patchValue({
          employee: data.employeeId,
          checkIn: new Date(data.checkIn).toISOString().slice(0, 16),
          checkOut: new Date(data.checkOut).toISOString().slice(0, 16),
        });
      },
      (error) => {
        this.errorMessage = 'Failed to load attendance data.';
      }
    );
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

  updateAttendance() {
    if (this.attendanceForm.invalid) {
      this.errorMessage = 'Please fill out the form correctly.';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    const updatedAttendance = {
      employeeId: this.attendanceForm.get('employee')?.value,
      checkIn: new Date(
        this.attendanceForm.get('checkIn')?.value
      ).toISOString(),
      checkOut: new Date(
        this.attendanceForm.get('checkOut')?.value
      ).toISOString(),
    };

    this.attendanceService
      .updateAttendance(this.attendanceId, updatedAttendance)
      .subscribe(
        (response) => {
          this.loading = false;
          this.router.navigate(['/attendance-list']);
        },
        (error) => {
          this.loading = false;
          this.errorMessage = 'Failed to update attendance record.';
        }
      );
  }
}