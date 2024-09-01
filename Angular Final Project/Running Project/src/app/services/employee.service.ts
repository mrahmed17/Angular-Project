import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { EmployeeModel } from '../models/employee.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private apiUrl = 'https://api.yourdomain.com/employees'; // Replace with your actual API endpoint

  constructor(private http: HttpClient) {}

  // Create a new employee
  createEmployee(employee: EmployeeModel): Observable<EmployeeModel> {
    return this.http
      .post<EmployeeModel>(this.apiUrl, employee)
      .pipe(catchError(this.handleError));
  }

  // Get all employees
  getEmployees(): Observable<EmployeeModel[]> {
    return this.http
      .get<EmployeeModel[]>(this.apiUrl)
      .pipe(catchError(this.handleError));
  }

  // Get a single employee by ID
  getEmployeeById(id: string): Observable<EmployeeModel> {
    const url = `${this.apiUrl}/${id}`;
    return this.http
      .get<EmployeeModel>(url)
      .pipe(catchError(this.handleError));
  }

  // Update an employee
  updateEmployee(id: string, employee: EmployeeModel): Observable<EmployeeModel> {
    const url = `${this.apiUrl}/${id}`;
    return this.http
      .put<EmployeeModel>(url, employee)
      .pipe(catchError(this.handleError));
  }

  // Delete an employee
  deleteEmployee(id: string): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http
      .delete<void>(url)
      .pipe(catchError(this.handleError));
  }

  // Handle any errors from the HTTP request
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Unknown error!';
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