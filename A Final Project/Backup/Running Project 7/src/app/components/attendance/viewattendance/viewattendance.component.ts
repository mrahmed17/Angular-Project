import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AttendanceService } from '../../../services/attendance.service';

@Component({
  selector: 'app-viewattendance',
  templateUrl: './viewattendance.component.html',
  styleUrls: ['./viewattendance.component.css'],
})
export class ViewattendanceComponent implements OnInit {
  attendances: any[] = [];
  errorMessage: string = '';
  loading: boolean = false;
  employeeId: string = '';
  managerId: string = ''; // Add this if you also need manager ID

  constructor(
    private attendanceService: AttendanceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.employeeId = this.route.snapshot.paramMap.get('employeeId') || '';
    this.managerId = this.route.snapshot.paramMap.get('managerId') || '';
    this.loadAttendances();
  }

  loadAttendances(): void {
    this.loading = true;
    if (this.employeeId) {
      this.attendanceService
        .getAttendancesByEmployeeId(this.employeeId)
        .subscribe({
          next: (data) => {
            this.attendances = data;
            this.loading = false;
          },
          error: (error) => {
            this.errorMessage = 'Failed to load attendance records';
            this.loading = false;
          },
        });
    } else if (this.managerId) {
      this.attendanceService
        .getAttendancesByManagerId(this.managerId)
        .subscribe({
          next: (data) => {
            this.attendances = data;
            this.loading = false;
          },
          error: (error) => {
            this.errorMessage = 'Failed to load attendance records';
            this.loading = false;
          },
        });
    }
  }

  backToList(): void {
    this.router.navigate(['/attendances/list']);
  }
}
