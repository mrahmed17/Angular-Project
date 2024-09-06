import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { EmployeeModel } from '../models/employee.model';
import { ManagerModel } from '../models/manager.model';

@Injectable({
  providedIn: 'root',
})
export class AttendanceService {
  private apiUrl: string = 'http://localhost:3000/attendances';
  private employeeApiUrl: string = 'http://localhost:3000/employees';
  private managerApiUrl: string = 'http://localhost:3000/managers';

  constructor(private http: HttpClient) {}

  createAttendance(attendance: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, attendance).pipe(
      map((res) => res),
      catchError(this.handleError)
    );
  }

  getAttendanceById(
    id: string,
    fullName: string,
    role: 'employee' | 'manager'
  ): Observable<any> {
    const roleParam = role === 'employee' ? 'empname' : 'managername';
    return this.http
      .get<any>(`${this.apiUrl}/present?id=${id}&${roleParam}=${fullName}`)
      .pipe(
        map((res) => res),
        catchError(this.handleError)
      );
  }

  getAllAttendances(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((res) => res),
      catchError(this.handleError)
    );
  }

  updateAttendance(id: string, attendance: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, attendance).pipe(
      map((res) => res),
      catchError(this.handleError)
    );
  }

  deleteAttendance(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`).pipe(
      map((res) => res),
      catchError(this.handleError)
    );
  }

  getAttendanceByDateRange(
    startDate: string,
    endDate: string
  ): Observable<any[]> {
    return this.http
      .get<any[]>(`${this.apiUrl}?startDate=${startDate}&endDate=${endDate}`)
      .pipe(
        map((res) => res),
        catchError(this.handleError)
      );
  }

  // Add this method to get all employees
  getAllEmployees(): Observable<EmployeeModel[]> {
    return this.http.get<EmployeeModel[]>(this.employeeApiUrl).pipe(
      map((res) => res),
      catchError(this.handleError)
    );
  }

  // Add this method to get all managers
  getAllManagers(): Observable<ManagerModel[]> {
    return this.http.get<ManagerModel[]>(this.managerApiUrl).pipe(
      map((res) => res),
      catchError(this.handleError)
    );
  }

  // Add this method in AttendanceService
  getAttendancesByEmployeeId(employeeId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?employeeId=${employeeId}`).pipe(
      map((res) => res),
      catchError(this.handleError)
    );
  }

  getAttendancesByManagerId(managerId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?managerId=${managerId}`).pipe(
      map((res) => res),
      catchError(this.handleError)
    );
  }

  clockInEmployee(employeeId: number): Observable<EmployeeModel> {
    const now = new Date().toISOString();
    return this.http
      .post<EmployeeModel>(`${this.apiUrl}/clock-in`, {
        employeeId,
        clockInTime: now,
      })
      .pipe(catchError(this.handleError));
  }

  clockInManager(managerId: number): Observable<ManagerModel> {
    const now = new Date().toISOString();
    return this.http
      .post<ManagerModel>(`${this.apiUrl}/clock-in`, {
        managerId,
        clockInTime: now,
      })
      .pipe(catchError(this.handleError));
  }

  clockOutEmployee(employeeId: number): Observable<EmployeeModel> {
    const now = new Date().toISOString();
    return this.http
      .post<EmployeeModel>(`${this.apiUrl}/clock-out`, {
        employeeId,
        clockOutTime: now,
      })
      .pipe(
        map((attendance) => this.calculateTotalHours(attendance)),
        catchError(this.handleError)
      );
  }

  clockOutManager(managerId: number): Observable<ManagerModel> {
    const now = new Date().toISOString();
    return this.http
      .post<ManagerModel>(`${this.apiUrl}/clock-out`, {
        managerId,
        clockOutTime: now,
      })
      .pipe(
        map((attendance) => this.calculateTotalHours(attendance)),
        catchError(this.handleError)
      );
  }

  private calculateTotalHours(attendance: any): any {
    const clockIn = new Date(attendance.clockInTime!).getTime();
    const clockOut = new Date(attendance.clockOutTime!).getTime();
    attendance.totalHours = (clockOut - clockIn) / (1000 * 60 * 60);
    return attendance;
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError('Something went wrong; please try again later.');
  }
}

// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable, throwError } from 'rxjs';
// import { map } from 'rxjs/operators';
// import { EmployeeModel } from '../models/employee.model';
// import { ManagerModel } from '../models/manager.model';

// @Injectable({
//   providedIn: 'root',
// })
// export class AttendanceService {
//   private apiUrl: string = 'http://localhost:3000/attendances';

//   constructor(private http: HttpClient) {}

//   createAttendance(attendance: any) {
//     return this.http.post<any>(this.apiUrl, attendance).pipe(
//       map((res) => {
//         return res;
//       })
//     );
//   }

//   getAttendanceById(id: string, fullName: string) {
//     return this.http
//       .get<any>(
//         `${this.apiUrl}/present?${id}&${this.apiUrl}/present?empname=${fullName}`
//       )
//       .pipe(
//         map((res) => {
//           return res;
//         })
//       );
//   }

//   getAllAttendances() {
//     return this.http.get<any>(this.apiUrl).pipe(
//       map((res) => {
//         return res;
//       })
//     );
//   }

//   updateAttendance(id: string, attendance: any) {
//     return this.http.put<any>(`${this.apiUrl}/${id}`, attendance).pipe(
//       map((res) => {
//         return res;
//       })
//     );
//   }

//   deleteAttendance(id: string) {
//     return this.http.delete<any>(`${this.apiUrl}/${id}`).pipe(
//       map((res) => {
//         return res;
//       })
//     );
//   }

//   // Additional method to get attendance by date range
//   getAttendanceByDateRange(startDate: string, endDate: string) {
//     return this.http.get<any>(
//       `${this.apiUrl}?startDate=${startDate}&endDate=${endDate}`
//     );
//   }

//   clockInEmployee(employeeId: number): Observable<EmployeeModel> {
//     const now = new Date().toISOString();
//     // Create or update attendance record with clock-in time
//     return this.http.post<any>(`${this.apiUrl}/clock-in`, {
//       employeeId,
//       clockInTime: now,
//     });
//   }

//   clockInManager(managerId: number): Observable<ManagerModel> {
//     const now = new Date().toISOString();
//     // Create or update attendance record with clock-in time
//     return this.http.post<any>(`${this.apiUrl}/clock-in`, {
//       managerId,
//       clockInTime: now,
//     });
//   }

//   clockOutEmployee(employeeId: number): Observable<ManagerModel> {
//     const now = new Date().toISOString();
//     // Create or update attendance record with clock-out time and calculate total hours
//     return this.http
//       .post<any>(`${this.apiUrl}/clock-out`, {
//         employeeId,
//         clockOutTime: now,
//       })
//       .pipe(
//         map((attendance) => {
//           const clockIn = new Date(attendance.clockInTime!).getTime();
//           const clockOut = new Date(attendance.clockOutTime!).getTime();
//           attendance.totalHours = (clockOut - clockIn) / (1000 * 60 * 60); // Calculate hours
//           return attendance;
//         })
//       );
//   }

//   clockOutManager(managerId: number): Observable<ManagerModel> {
//     const now = new Date().toISOString();
//     // Create or update attendance record with clock-out time and calculate total hours
//     return this.http
//       .post<any>(`${this.apiUrl}/clock-out`, {
//         managerId,
//         clockOutTime: now,
//       })
//       .pipe(
//         map((attendance) => {
//           const clockIn = new Date(attendance.clockInTime!).getTime();
//           const clockOut = new Date(attendance.clockOutTime!).getTime();
//           attendance.totalHours = (clockOut - clockIn) / (1000 * 60 * 60); // Calculate hours
//           return attendance;
//         })
//       );
//   }

//   private handleError(error: any): Observable<never> {
//     // Handle the error and return an observable
//     console.error('An error occurred:', error);
//     return throwError('Something went wrong; please try again later.');
//   }
// }
