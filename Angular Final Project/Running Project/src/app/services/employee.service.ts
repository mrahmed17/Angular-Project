import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { EmployeeModel } from '../models/employee.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private baseUrl: string = 'http://localhost:3000/employees';
  private departmentbaseUrl: string = 'https://localhost:3000/departments';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  getAllEmployees(): Observable<EmployeeModel[]> {
    return this.http
      .get<EmployeeModel[]>(this.baseUrl)
      .pipe(catchError(this.handleError));
  }

  getEmployeesByDepartment(departmentId: string): Observable<EmployeeModel[]> {
    return this.http
      .get<EmployeeModel[]>(`${this.baseUrl}?departmentId=${departmentId}`)
      .pipe(catchError(this.handleError));
  }

  getEmployeeById(id: string): Observable<EmployeeModel> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<EmployeeModel>(url).pipe(catchError(this.handleError));
  }

  createEmployee(employee: EmployeeModel): Observable<EmployeeModel> {
    return this.http
      .post<EmployeeModel>(this.baseUrl, employee, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  updateEmployee(
    id: string,
    employee: EmployeeModel
  ): Observable<EmployeeModel> {
    const url = `${this.baseUrl}/${id}`;
    return this.http
      .put<EmployeeModel>(url, employee, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  deleteEmployee(id: string): Observable<void> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<void>(url).pipe(catchError(this.handleError));
  }

  getAllDepartments(): Observable<any[]> {
    // Adjust the return type based on your department model
    return this.http
      .get<any[]>(this.departmentbaseUrl)
      .pipe(catchError(this.handleError));
  }

  // Error handling method
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Something went wrong; please try again later.!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }
}