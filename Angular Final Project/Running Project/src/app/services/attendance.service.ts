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
  clockInEmployee(employeeId: string): Observable<any> {
    const now = new Date().toISOString();
    return this.http
      .post<any>(`${this.apiUrl}`, {
        employeeId,
        clockInTime: now,
        clockOutTime: null, // Will be set when checking out
        totalHours: null, // Will be calculated when checking out
      })
      .pipe(catchError(this.handleError));
  }

  // Clock-out employee
  clockOutEmployee(employeeId: string): Observable<any> {
    const now = new Date().toISOString();
    return this.http.get<any[]>(`${this.apiUrl}?employeeId=${employeeId}`).pipe(
      map((attendances) => {
        const clockInAttendance = attendances.find((att) => !att.clockOutTime);
        if (clockInAttendance) {
          const updatedAttendance = {
            ...clockInAttendance,
            clockOutTime: now,
            totalHours: this.calculateTotalHours(
              clockInAttendance.clockInTime,
              now
            ),
          };
          return this.http.put<any>(
            `${this.apiUrl}/${clockInAttendance.id}`,
            updatedAttendance
          );
        } else {
          throw new Error('No matching clock-in record found.');
        }
      }),
      catchError(this.handleError)
    );
  }

  // Calculate total hours worked
  private calculateTotalHours(
    clockInTime: string,
    clockOutTime: string
  ): number {
    const clockIn = new Date(clockInTime).getTime();
    const clockOut = new Date(clockOutTime).getTime();
    return (clockOut - clockIn) / (1000 * 60 * 60); // Convert milliseconds to hours
  }

  // Add the deleteAttendance method
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
