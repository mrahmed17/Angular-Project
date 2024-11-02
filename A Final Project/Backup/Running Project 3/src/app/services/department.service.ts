import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DepartmentModel } from '../models/department.model';
import { LocationModel } from '../models/location.model'; // Updated import
import { ManagerModel } from '../models/manager.model'; // Updated import

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  private apiUrl = 'http://localhost:3000/departments';
  private locationUrl = 'http://localhost:3000/locations';
  private managerUrl = 'http://localhost:3000/managers';

  constructor(private httpClient: HttpClient) {}

  // Fetch all departments
  getAllDepartments(): Observable<DepartmentModel[]> {
    return this.httpClient
      .get<DepartmentModel[]>(this.apiUrl)
      .pipe(catchError(this.handleError));
  }

  // Create a new department
  createDepartment(department: DepartmentModel): Observable<DepartmentModel> {
    return this.httpClient
      .post<DepartmentModel>(this.apiUrl, department)
      .pipe(catchError(this.handleError));
  }

  // Delete a department by ID
  deleteDepartment(id: string): Observable<void> {
    return this.httpClient
      .delete<void>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  // Update an existing department by ID
  updateDepartment(
    id: string,
    department: Partial<DepartmentModel>
  ): Observable<DepartmentModel> {
    return this.httpClient
      .put<DepartmentModel>(`${this.apiUrl}/${id}`, department)
      .pipe(catchError(this.handleError));
  }

  // Get a department by ID
  getDepartmentById(id: string): Observable<DepartmentModel> {
    return this.httpClient
      .get<DepartmentModel>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  // Fetch all locations
  getAllLocations(): Observable<LocationModel[]> {
    return this.httpClient
      .get<LocationModel[]>(this.locationUrl)
      .pipe(catchError(this.handleError));
  }

  // Fetch all managers
  getAllManagers(): Observable<ManagerModel[]> {
    return this.httpClient
      .get<ManagerModel[]>(this.managerUrl)
      .pipe(catchError(this.handleError));
  }

  // Error handling
  private handleError(error: any): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error('An error occurred:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
