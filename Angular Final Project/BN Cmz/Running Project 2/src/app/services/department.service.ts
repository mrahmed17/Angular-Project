import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DepartmentModel } from '../models/department.model';
import { ManagerModel } from '../models/manager.model';
import { LocationModel } from '../models/location.model';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  private apiUrl: string = 'http://localhost:3000/departments';
  private locationUrl: string = 'http://localhost:3000/locations'; // Adjust URL as needed
  private managerUrl: string = 'http://localhost:3000/managers'; // Adjust URL as needed

  constructor(private httpClient: HttpClient) {}

  // Fetch all departments
  getAllDepartments(): Observable<DepartmentModel[]> {
    return this.httpClient
      .get<DepartmentModel[]>(this.apiUrl)
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

  // Create a new department
  createDepartment(department: DepartmentModel): Observable<DepartmentModel> {
    // Generate and set a new department ID before making the POST request
    const departmentWithId = {
      ...department,
      departmentId: this.generateDepartmentId(department.name),
    };

    return this.httpClient
      .post<DepartmentModel>(this.apiUrl, departmentWithId)
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

  // Error handling
  private handleError(error: any): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error('An error occurred:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }

  // Method to generate a unique department ID
  private generateDepartmentId(name: string): string {
    const randomNumber = Math.floor(Math.random() * 10000); // Random number for uniqueness
    const namePart = name.replace(/\s+/g, '').toUpperCase(); // Remove spaces and make uppercase
    return `${namePart}-${randomNumber}`;
  }
}
