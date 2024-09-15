import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { AdvanceSalaryModel } from '../models/advance-salary.model';

@Injectable({
  providedIn: 'root',
})
export class AdvanceSalaryService {
  private baseUrl: string = 'https://localhost:3000/advance-salaries';
  constructor(private httpClient: HttpClient) {}

  getAdvanceSalaryByEmployeeId(
    employeeId: number
  ): Observable<AdvanceSalaryModel[]> {
    return this.httpClient
      .get<AdvanceSalaryModel[]>(`${this.baseUrl}?employeeId=${employeeId}`)
      .pipe(catchError(this.handleError));
  }

  requestAdvanceSalary(
    advanceSalary: AdvanceSalaryModel
  ): Observable<AdvanceSalaryModel> {
    return this.httpClient
      .post<AdvanceSalaryModel>(`${this.baseUrl}`, advanceSalary)
      .pipe(catchError(this.handleError));
  }


  getAdvanceSalaryById(id: number): Observable<AdvanceSalaryModel> {
    return this.httpClient
      .get<AdvanceSalaryModel>(`${this.baseUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }


  updateAdvanceSalary(
    id: number,
    advanceSalary: AdvanceSalaryModel
  ): Observable<AdvanceSalaryModel> {
    return this.httpClient
      .put<AdvanceSalaryModel>(`${this.baseUrl}/${id}`, advanceSalary)
      .pipe(catchError(this.handleError));
  }


  deleteAdvanceSalary(id: number): Observable<void> {
    return this.httpClient
      .delete<void>(`${this.baseUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }


  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Something went wrong; please try again later.';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}