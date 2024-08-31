import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PerformanceModel } from '../models/performance.model';

@Injectable({
  providedIn: 'root',
})
export class PerformanceService {
  private apiUrl: string = 'http://localhost:3000/performances';
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) {}

  // Get all performance records
  getAllPerformance(): Observable<PerformanceModel[]> {
    return this.http
      .get<PerformanceModel[]>(this.apiUrl)
      .pipe(
        catchError(
          this.handleError<PerformanceModel[]>('getAllPerformance', [])
        )
      );
  }

  // Get a specific performance record by ID
  getPerformance(id: string): Observable<PerformanceModel> {
    return this.http
      .get<PerformanceModel>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError<PerformanceModel>('getPerformance')));
  }

  // Create a new performance record
  createPerformance(
    performance: PerformanceModel
  ): Observable<PerformanceModel> {
    return this.http
      .post<PerformanceModel>(this.apiUrl, performance, {
        headers: this.headers,
      })
      .pipe(
        catchError(this.handleError<PerformanceModel>('createPerformance'))
      );
  }

  // Update an existing performance record
  updatePerformance(
    id: string,
    performance: PerformanceModel
  ): Observable<PerformanceModel> {
    return this.http
      .put<PerformanceModel>(`${this.apiUrl}/${id}`, performance, {
        headers: this.headers,
      })
      .pipe(
        catchError(this.handleError<PerformanceModel>('updatePerformance'))
      );
  }

  // Delete a performance record
  deletePerformance(id: string): Observable<void> {
    return this.http
      .delete<void>(`${this.apiUrl}/${id}`, { headers: this.headers })
      .pipe(catchError(this.handleError<void>('deletePerformance')));
  }

  // Handle errors from HTTP requests
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: HttpErrorResponse): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return throwError(
        () => new Error('Something went wrong; please try again later.')
      );
    };
  }
}
