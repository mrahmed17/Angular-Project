import { Component, OnInit } from '@angular/core';
import { AttendanceService } from '../../../services/attendance.service';

@Component({
  selector: 'app-listattendance',
  templateUrl: './listattendance.component.html',
  styleUrls: ['./listattendance.component.css'],
})
export class ListattendanceComponent implements OnInit {
  attendances: any[] = [];
  loading = false;
  errorMessage = '';

  constructor(private attendanceService: AttendanceService) {}

  ngOnInit(): void {
    this.loadAttendances();
  }

  loadAttendances() {
    this.loading = true;
    this.attendanceService.getAllAttendances().subscribe(
      (data) => {
        this.attendances = data;
        this.loading = false;
      },
      (error) => {
        this.errorMessage = 'Failed to load attendance records.';
        this.loading = false;
      }
    );
  }

  editAttendance(attendanceId: number): void {
    // Navigate to the edit attendance component
    // Adjust the route path as needed
    window.location.href = `/attendances/edit/${attendanceId}`;
  }

  deleteAttendance(attendanceId: number): void {
    const confirmDelete = confirm(
      'Are you sure you want to delete this attendance record?'
    );
    if (confirmDelete) {
      this.loading = true;
      this.attendanceService.deleteAttendance(attendanceId).subscribe(
        () => {
          this.loadAttendances();
          this.loading = false;
        },
        (error) => {
          this.errorMessage = 'Failed to delete attendance record.';
          this.loading = false;
        }
      );
    }
  }
}
