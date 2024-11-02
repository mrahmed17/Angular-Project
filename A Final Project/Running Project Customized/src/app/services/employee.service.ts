import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { EmployeeModel } from '../models/employee.model';
import { SalaryModel } from '../models/salary.model';
import { FeedbackModel } from '../models/feedback.model';
import { LeaveModel } from '../models/leave.model';
import { BonusModel } from '../models/bonus.model';
import { AdvanceSalaryModel } from '../models/advance-salary.model';
import { DepartmentModel } from '../models/department.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private baseUrl: string = 'https://localhost:3000/employees';

  constructor(private httpClient: HttpClient) {}

  createEmployee(employee: EmployeeModel): Observable<EmployeeModel> {
    return this.httpClient
      .post<EmployeeModel>(`${this.baseUrl}`, employee)
      .pipe(catchError(this.handleError));
  }

  getAllEmployees(): Observable<EmployeeModel[]> {
    return this.httpClient
      .get<EmployeeModel[]>(`${this.baseUrl}`)
      .pipe(catchError(this.handleError));
  }

  getEmployeeById(id: number): Observable<EmployeeModel> {
    return this.httpClient
      .get<EmployeeModel>(`${this.baseUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  updateEmployee(
    id: number,
    employee: EmployeeModel
  ): Observable<EmployeeModel> {
    return this.httpClient
      .put<EmployeeModel>(`${this.baseUrl}/${id}`, employee)
      .pipe(catchError(this.handleError));
  }

  deleteEmployee(id: number): Observable<void> {
    return this.httpClient
      .delete<void>(`${this.baseUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  getSalaryByEmployeeId(id: number): Observable<SalaryModel> {
    return this.httpClient
      .get<SalaryModel>(`${this.baseUrl}/${id}/salary`)
      .pipe(catchError(this.handleError));
  }

  requestAdvanceSalary(
    advanceSalary: AdvanceSalaryModel
  ): Observable<AdvanceSalaryModel> {
    return this.httpClient
      .post<AdvanceSalaryModel>(`${this.baseUrl}/advance-salary`, advanceSalary)
      .pipe(catchError(this.handleError));
  }

  getAdvanceSalaryByEmployeeId(id: number): Observable<AdvanceSalaryModel[]> {
    return this.httpClient
      .get<AdvanceSalaryModel[]>(`${this.baseUrl}/${id}/advance-salary`)
      .pipe(catchError(this.handleError));
  }

  grantBonus(bonus: BonusModel): Observable<BonusModel> {
    return this.httpClient
      .post<BonusModel>(`${this.baseUrl}/bonus`, bonus)
      .pipe(catchError(this.handleError));
  }

  getBonusByEmployeeId(id: number): Observable<BonusModel[]> {
    return this.httpClient
      .get<BonusModel[]>(`${this.baseUrl}/${id}/bonus`)
      .pipe(catchError(this.handleError));
  }

  getFeedbackByEmployeeId(id: number): Observable<FeedbackModel[]> {
    return this.httpClient
      .get<FeedbackModel[]>(`${this.baseUrl}/${id}/feedback`)
      .pipe(catchError(this.handleError));
  }

  applyForLeave(leave: LeaveModel): Observable<LeaveModel> {
    return this.httpClient
      .post<LeaveModel>(`${this.baseUrl}/apply-leave`, leave)
      .pipe(catchError(this.handleError));
  }

  getLeaveByEmployeeId(id: number): Observable<LeaveModel[]> {
    return this.httpClient
      .get<LeaveModel[]>(`${this.baseUrl}/${id}/leaves`)
      .pipe(catchError(this.handleError));
  }

  getDepartmentByEmployeeId(id: number): Observable<DepartmentModel> {
    return this.httpClient
      .get<DepartmentModel>(`${this.baseUrl}/${id}/department`)
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
