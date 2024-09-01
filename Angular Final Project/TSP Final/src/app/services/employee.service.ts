import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of } from 'rxjs';
import { EmployeeModel } from '../models/employee.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private http: HttpClient) {}
  private baseUrl = 'http://localhost:3000/employee';

  employeePost(data: EmployeeModel) {
    return this.http.post<any>(this.baseUrl, data).pipe(
      map((res) => res),
      catchError((error) => {
        console.error('Error posting employee:', error);
        return of(null); // Handle or return an observable with a default value
      })
    );
  }

  getEmpDetails() {
    return this.http.get<any>(`${this.baseUrl}/emp_details`).pipe(
      map((res) => res),
      catchError((error) => {
        if (error.status === 404) {
          console.error('Endpoint not found:', error);
        } else {
          console.error('Error getting employee details:', error);
        }
        return of(null); // Handle or return an observable with a default value
      })
    );
  }

  getAllEmployee() {
    return this.http.get<any>(this.baseUrl).pipe(
      map((res) => res),
      catchError((error) => {
        console.error('Error fetching all employees:', error);
        return of(null); // Handle or return an observable with a default value
      })
    );
  }

  editEmployee(id: number, employeeData: EmployeeModel) {
    return this.http.put<any>(`${this.baseUrl}/${id}`, employeeData).pipe(
      map((res) => res),
      catchError((error) => {
        console.error('Error editing employee:', error);
        return of(null); // Handle or return an observable with a default value
      })
    );
  }

  deleteEmployee(id: number) {
    return this.http.delete<any>(`${this.baseUrl}/${id}`).pipe(
      map((res) => res),
      catchError((error) => {
        console.error('Error deleting employee:', error);
        return of(null); // Handle or return an observable with a default value
      })
    );
  }
}
