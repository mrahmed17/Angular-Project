import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Advance } from '../models/advance.model';

@Injectable({
  providedIn: 'root',
})
export class AdvanceService {
  private baseUrl = 'http://localhost:3000/advances'; // Replace with your actual API endpoint

  constructor(private http: HttpClient) {}

  // Method to update an advance record
  updateAdvance(id: number, advance: Advance): Observable<Advance> {
    return this.http.put<Advance>(`${this.baseUrl}/${id}`, advance).pipe(
      catchError(this.handleError) // Basic error handling
    );
  }

  // Method to get all advance records
  getAllAdvance(): Observable<Advance[]> {
    return this.http.get<Advance[]>(this.baseUrl).pipe(
      catchError(this.handleError) // Basic error handling
    );
  }

  // Method to create a new advance record
  advancePost(advance: Advance): Observable<Advance> {
    return this.http.post<Advance>(this.baseUrl, advance).pipe(
      catchError(this.handleError) // Basic error handling
    );
  }

  // Method to delete an advance record
  deleteAdvance(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`).pipe(
      catchError(this.handleError) // Basic error handling
    );
  }

  // Error handling logic
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
