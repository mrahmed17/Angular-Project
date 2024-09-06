import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DepartmentModel } from '../models/department.model';
import { LocationModel } from '../models/branch.model'; // Updated import
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  private baseUrl: string = 'http://localhost:3000/departments'; // Base URL for departments API
  private locationUrl: string = 'http://localhost:3000/locations'; // Base URL for locations API
  private managerUrl: string = 'http://localhost:3000/managers'; // Base URL for managers API
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' }); // Headers for JSON requests

  constructor(private httpClient: HttpClient) {}

  // Fetch all departments
  getAllDepartments(): Observable<DepartmentModel[]> {
    return this.httpClient
      .get<DepartmentModel[]>(this.baseUrl)
      .pipe(
        catchError(this.handleError<DepartmentModel[]>('getAllDepartments', []))
      );
  }

  // Create a new department
  createDepartment(department: DepartmentModel): Observable<DepartmentModel> {
    return this.httpClient
      .post<DepartmentModel>(this.baseUrl, department, {
        headers: this.headers,
      })
      .pipe(catchError(this.handleError<DepartmentModel>('createDepartment')));
  }

  // Delete a department by ID
  deleteDepartment(id: string): Observable<void> {
    return this.httpClient
      .delete<void>(`${this.baseUrl}/${id}`, { headers: this.headers })
      .pipe(catchError(this.handleError<void>('deleteDepartment')));
  }

  // Update an existing department by ID
  updateDepartment(
    id: string,
    department: Partial<DepartmentModel>
  ): Observable<DepartmentModel> {
    return this.httpClient
      .put<DepartmentModel>(`${this.baseUrl}/${id}`, department, {
        headers: this.headers,
      })
      .pipe(catchError(this.handleError<DepartmentModel>('updateDepartment')));
  }

  // Get a department by ID
  getDepartmentById(id: string): Observable<DepartmentModel> {
    return this.httpClient
      .get<DepartmentModel>(`${this.baseUrl}/${id}`)
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
  getAllManagers(): Observable<UserModel[]> {
    return this.httpClient
      .get<UserModel[]>(this.managerUrl)
      .pipe(catchError(this.handleError<UserModel[]>('getAllManagers', [])));
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
