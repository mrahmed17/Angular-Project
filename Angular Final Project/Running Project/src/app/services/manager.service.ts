import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ManagerModel } from '../models/manager.model';

@Injectable({
  providedIn: 'root',
})
export class ManagerService {
  private apiUrl: string = 'http://localhost:3000/managers';
  private departmentApiUrl: string = 'https://localhost:3000/departments';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  // Method to get all managers
  getAllManagers(): Observable<ManagerModel[]> {
    return this.http
      .get<ManagerModel[]>(this.apiUrl)
      .pipe(catchError(this.handleError));
  }

  getManagerByDepartment(departmentId: string): Observable<ManagerModel[]> {
    return this.http
      .get<ManagerModel[]>(`${this.apiUrl}?departmentId=${departmentId}`)
      .pipe(catchError(this.handleError));
  }

  // Method to get a manager by ID
  getManagerById(id: string): Observable<ManagerModel> {
    return this.http
      .get<ManagerModel>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  createManager(manager: ManagerModel): Observable<ManagerModel> {
    return this.http
      .post<ManagerModel>(this.apiUrl, manager, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  // Method to update manager details
  updateManager(id: string, manager: ManagerModel): Observable<ManagerModel> {
    manager.updatedAt = new Date(); // Update the 'updatedAt' timestamp
    return this.http
      .patch<ManagerModel>(`${this.apiUrl}/${id}`, manager, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  // Method to delete a manager
  deleteManager(id: string): Observable<void> {
    return this.http
      .delete<void>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  getAllDepartments(): Observable<any[]> {
    // Adjust the return type based on your department model
    return this.http
      .get<any[]>(this.departmentApiUrl)
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
    return throwError(
      () => new Error(errorMessage)
    );
  }
}
