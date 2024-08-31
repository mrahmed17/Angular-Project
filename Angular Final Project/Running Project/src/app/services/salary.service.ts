import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AttendanceService } from './attendance.service';

@Injectable({
  providedIn: 'root',
})
export class SalaryService {
  private readonly hourlyRate = 20; // Example hourly rate, could be dynamic

  constructor(private attendanceService: AttendanceService) {}

  calculateSalary(
    employeeId: number,
    dateRange: { start: string; end: string }
  ): Observable<number> {
    return this.attendanceService
      .getAttendanceByDateRange(dateRange.start, dateRange.end)
      .pipe(
        map((attendances) => {
          // Filter attendances for the specific employee
          const employeeAttendances = attendances.filter(
            (att) => att.employee?.id === employeeId
          );
          // Calculate total hours worked
          const totalHours = employeeAttendances.reduce(
            (sum, attendance) => sum + (attendance.totalHours || 0),
            0
          );
          // Calculate total salary based on total hours worked
          return totalHours * this.hourlyRate;
        }),
        catchError((error) => {
          console.error('Error calculating salary:', error);
          return throwError(() => new Error('Failed to calculate salary'));
        })
      );
  }
}
