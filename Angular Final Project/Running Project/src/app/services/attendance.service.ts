import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { EmployeeModel } from '../models/employee.model';
import { AttendanceModel } from '../models/attendance.model';

@Injectable({
  providedIn: 'root',
})
export class AttendanceService {
  private baseUrl: string = 'http://localhost:3000/attendances';

  constructor(private http: HttpClient) {}

  // Fetch all employees
  getAllEmployees(): Observable<EmployeeModel[]> {
    return this.http.get<EmployeeModel[]>(this.employeebaseUrl).pipe(
      map((res) => res),
      catchError(this.handleError)
    );
  }

  // Method to get attendance records by employee ID
  getAttendancesByEmployeeId(employeeId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}?employeeId=${employeeId}`).pipe(
      map((res) => res),
      catchError(this.handleError)
    );
  }

  // Fetch all attendance records
  getAllAttendances(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl).pipe(
      map((res) => res),
      catchError(this.handleError)
    );
  }

  // Get a specific attendance record by ID
  getAttendanceById(attendanceId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${attendanceId}`).pipe(
      map((res) => res),
      catchError(this.handleError)
    );
  }

  // Update a specific attendance record
  updateAttendance(employeeId: number, attendanceData: any): Observable<any> {
    return this.http
      .post<any>(`${this.baseUrl}/update/${employeeId}`, attendanceData)
      .pipe(
        tap((response) =>
          console.log(`Attendance updated successfully: ${response}`)
        ),
        catchError((error) => {
          console.error(`Error updating attendance: ${JSON.stringify(error)}`);
          return throwError(
            `Failed to update attendance. Please try again later.`
          );
        })
      );
  }

  // Clock-in employee
  clockInEmployee(
    employeeId: number,
    attendence: AttendanceModel
  ): Observable<any> {
    const now = new Date().toISOString();
    const clockInData = { clockInTime: now };
    attendence.clockInTime=now;

    return this.http.post<any>(`${this.baseUrl}`, attendence).pipe(
      tap((response) => console.log(`Clock-in successful: ${response}`)),
      catchError((error) => {
        console.error(`Error clocking in employee: ${error}`);
        return throwError(
          `Failed to check in employee. Please try again later.`
        );
      })
    );
  }

  // Clock-out employee
  clockOutEmployee(employeeId: number): Observable<any> {
    const now = new Date().toISOString();
    const clockOutData = { clockOutTime: now };

    return this.http
      .post<any>(`${this.baseUrl}/update/${employeeId}`, clockOutData)
      .pipe(
        tap((response) => console.log(`Clock-out successful: ${response}`)),
        catchError((error) => {
          console.error(`Error updating attendance: ${error}`);
          return throwError(
            `Failed to update attendance. Please try again later.`
          );
        })
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
      .delete<void>(`${this.baseUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  // Handle errors
  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError('Something went wrong; please try again later.');
  }
}
