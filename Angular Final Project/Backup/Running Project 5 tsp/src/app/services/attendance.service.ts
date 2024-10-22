import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AttendanceModel } from '../models/attendance.model';

@Injectable({
  providedIn: 'root',
})
export class AttendanceService {
  private apiUrl: string = 'http://localhost:3000/attendances';

  constructor(private http: HttpClient) {}

  createAttendance(attendance: AttendanceModel): Observable<AttendanceModel> {
    return this.http
      .post<AttendanceModel>(this.apiUrl, attendance)
      .pipe(catchError(this.handleError));
  }

  getAttendanceById(id: string): Observable<AttendanceModel> {
    return this.http
      .get<AttendanceModel>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  getAllAttendances(): Observable<AttendanceModel[]> {
    return this.http
      .get<AttendanceModel[]>(this.apiUrl)
      .pipe(catchError(this.handleError));
  }

  updateAttendance(
    id: string,
    attendance: AttendanceModel
  ): Observable<AttendanceModel> {
    return this.http
      .put<AttendanceModel>(`${this.apiUrl}/${id}`, attendance)
      .pipe(catchError(this.handleError));
  }

  deleteAttendance(id: string): Observable<void> {
    return this.http
      .delete<void>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  // Additional method to get attendance by date range
  getAttendanceByDateRange(
    startDate: string,
    endDate: string
  ): Observable<AttendanceModel[]> {
    return this.http.get<AttendanceModel[]>(
      `${this.apiUrl}?startDate=${startDate}&endDate=${endDate}`
    );
  }

  clockIn(employeeId: number): Observable<AttendanceModel> {
    const now = new Date().toISOString();
    // Create or update attendance record with clock-in time
    return this.http.post<AttendanceModel>(`${this.apiUrl}/clock-in`, {
      employeeId,
      clockInTime: now,
    });
  }

  clockOut(employeeId: number): Observable<AttendanceModel> {
    const now = new Date().toISOString();
    // Create or update attendance record with clock-out time and calculate total hours
    return this.http
      .post<AttendanceModel>(`${this.apiUrl}/clock-out`, {
        employeeId,
        clockOutTime: now,
      })
      .pipe(
        map((attendance) => {
          const clockIn = new Date(attendance.clockInTime!).getTime();
          const clockOut = new Date(attendance.clockOutTime!).getTime();
          attendance.totalHours = (clockOut - clockIn) / (1000 * 60 * 60); // Calculate hours
          return attendance;
        })
      );
  }

  private handleError(error: any): Observable<never> {
    // Handle the error and return an observable
    console.error('An error occurred:', error);
    return throwError('Something went wrong; please try again later.');
  }
}
