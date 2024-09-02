import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { EmployeeModel } from '../models/employee.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private apiUrl: string = 'http://localhost:3000/employees';
  private departmentApiUrl: string = 'https://localhost:3000/departments'; // Assuming you have a departments endpoint
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  getAllEmployees(): Observable<EmployeeModel[]> {
    return this.http
      .get<EmployeeModel[]>(this.apiUrl)
      .pipe(catchError(this.handleError));
  }

  getEmployeesByDepartment(departmentId: string): Observable<EmployeeModel[]> {
    return this.http
      .get<EmployeeModel[]>(`${this.apiUrl}?departmentId=${departmentId}`)
      .pipe(catchError(this.handleError));
  }

  getEmployeeById(id: string): Observable<EmployeeModel> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<EmployeeModel>(url).pipe(catchError(this.handleError));
  }

  createEmployee(employee: EmployeeModel): Observable<EmployeeModel> {
    return this.http
      .post<EmployeeModel>(this.apiUrl, employee, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  updateEmployee(
    id: string,
    employee: EmployeeModel
  ): Observable<EmployeeModel> {
    const url = `${this.apiUrl}/${id}`;
    return this.http
      .put<EmployeeModel>(url, employee, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  deleteEmployee(id: string): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url).pipe(catchError(this.handleError));
  }

  getAllDepartments(): Observable<any[]> {
    // Adjust the return type based on your department model
    return this.http
      .get<any[]>(this.departmentApiUrl)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}