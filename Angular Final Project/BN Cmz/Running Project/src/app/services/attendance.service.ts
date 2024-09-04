import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { EmployeeModel } from '../models/employee.model';

@Injectable({
  providedIn: 'root',
})
export class AttendanceService {
  private apiUrl: string = 'http://localhost:3000/attendances';
  private employeeApiUrl: string = 'http://localhost:3000/employees';

  constructor(private http: HttpClient) {}

  // Fetch all employees
  getAllEmployees(): Observable<EmployeeModel[]> {
    return this.http.get<EmployeeModel[]>(this.employeeApiUrl).pipe(
      map((res) => res),
      catchError(this.handleError)
    );
  }

  // Method to get attendance records by employee ID
  getAttendancesByEmployeeId(employeeId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?employeeId=${employeeId}`).pipe(
      map((res) => res),
      catchError(this.handleError)
    );
  }

  // Fetch all attendance records
  getAllAttendances(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((res) => res),
      catchError(this.handleError)
    );
  }

  // Get a specific attendance record by ID
  getAttendanceById(attendanceId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${attendanceId}`).pipe(
      map((res) => res),
      catchError(this.handleError)
    );
  }

  // Update a specific attendance record
  updateAttendance(
    attendanceId: number,
    updatedAttendance: any
  ): Observable<any> {
    return this.http
      .put<any>(`${this.apiUrl}/${attendanceId}`, updatedAttendance)
      .pipe(
        map((res) => res),
        catchError(this.handleError)
      );
  }

  // Clock-in employee
  clockInEmployee(employeeId: number): Observable<any> {
    const now = new Date().toISOString();
    return this.http
      .post<any>(`${this.apiUrl}/clock-in`, {
        employeeId,
        clockInTime: now,
      })
      .pipe(catchError(this.handleError));
  }

  // Clock-out employee
  clockOutEmployee(employeeId: number): Observable<any> {
    const now = new Date().toISOString();
    return this.http
      .post<any>(`${this.apiUrl}/clock-out`, {
        employeeId,
        clockOutTime: now,
      })
      .pipe(
        map((attendance) => this.calculateTotalHours(attendance)),
        catchError(this.handleError)
      );
  }

  // Calculate total hours worked
  private calculateTotalHours(attendance: any): any {
    const clockIn = new Date(attendance.clockInTime).getTime();
    const clockOut = new Date(attendance.clockOutTime).getTime();
    attendance.totalHours = (clockOut - clockIn) / (1000 * 60 * 60);
    return attendance;
  }
  
  // Delete a specific attendance record
  deleteAttendance(id: number): Observable<void> {
    return this.http
      .delete<void>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  // Handle errors
  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError('Something went wrong; please try again later.');
  }
}