import { Component, OnInit } from '@angular/core';
import { AttendanceService } from '../../../services/attendance.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listattendance',
  templateUrl: './listattendance.component.html',
  styleUrls: ['./listattendance.component.css'],
})
export class ListattendanceComponent implements OnInit {
  attendances: any[] = []; // Assuming this is an array of attendance records
  errorMessage: string = '';

  constructor(
    private attendanceService: AttendanceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadAttendances();
  }

  loadAttendances(): void {
    this.attendanceService.getAllAttendances().subscribe({
      next: (data) => {
        this.attendances = data;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load attendances';
      },
    });
  }

  onEdit(attendanceId: string): void {
    this.router.navigate([`/editattendance/${attendanceId}`]);
  }

  onView(attendanceId: string): void {
    this.router.navigate([`/viewattendance/${attendanceId}`]);
  }

  onDelete(attendanceId: string): void {
    if (confirm('Are you sure you want to delete this attendance record?')) {
      this.attendanceService.deleteAttendance(attendanceId).subscribe({
        next: () => {
          this.loadAttendances(); // Refresh the list after deletion
        },
        error: (error) => {
          this.errorMessage = 'Failed to delete attendance record';
        },
      });
    }
  }
}
