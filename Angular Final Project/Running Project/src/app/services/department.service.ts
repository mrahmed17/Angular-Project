import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DepartmentModel } from '../models/department.model';
import { LocationModel } from '../models/location.model'; // Updated import
import { ManagerModel } from '../models/manager.model'; // Updated import

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  private apiUrl: string = 'http://localhost:3000/departments'; // Base URL for departments API
  private locationUrl: string = 'http://localhost:3000/locations'; // Base URL for locations API
  private managerUrl: string = 'http://localhost:3000/managers'; // Base URL for managers API
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' }); // Headers for JSON requests

  constructor(private httpClient: HttpClient) {}

  // Fetch all departments
  getAllDepartments(): Observable<DepartmentModel[]> {
    return this.httpClient
      .get<DepartmentModel[]>(this.apiUrl)
      .pipe(
        catchError(this.handleError<DepartmentModel[]>('getAllDepartments', []))
      );
  }

  // Create a new department
  createDepartment(department: DepartmentModel): Observable<DepartmentModel> {
    return this.httpClient
      .post<DepartmentModel>(this.apiUrl, department, { headers: this.headers })
      .pipe(catchError(this.handleError<DepartmentModel>('createDepartment')));
  }

  // Delete a department by ID
  deleteDepartment(id: string): Observable<void> {
    return this.httpClient
      .delete<void>(`${this.apiUrl}/${id}`, { headers: this.headers })
      .pipe(catchError(this.handleError<void>('deleteDepartment')));
  }

  // Update an existing department by ID
  updateDepartment(
    id: string,
    department: Partial<DepartmentModel>
  ): Observable<DepartmentModel> {
    return this.httpClient
      .put<DepartmentModel>(`${this.apiUrl}/${id}`, department, {
        headers: this.headers,
      })
      .pipe(catchError(this.handleError<DepartmentModel>('updateDepartment')));
  }

  // Get a department by ID
  getDepartmentById(id: string): Observable<DepartmentModel> {
    return this.httpClient
      .get<DepartmentModel>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError<DepartmentModel>('getDepartmentById')));
  }

  // Fetch all locations
  getAllLocations(): Observable<LocationModel[]> {
    return this.httpClient
      .get<LocationModel[]>(this.locationUrl)
      .pipe(
        catchError(this.handleError<LocationModel[]>('getAllLocations', []))
      );
  }

  // Fetch all managers
  getAllManagers(): Observable<ManagerModel[]> {
    return this.httpClient
      .get<ManagerModel[]>(this.managerUrl)
      .pipe(catchError(this.handleError<ManagerModel[]>('getAllManagers', [])));
  }

  // Error handling
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return throwError(
        () => new Error('Something went wrong; please try again later.')
      );
    };
  }
}
