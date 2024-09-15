import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SalaryModel } from '../models/salary.model';

@Injectable({
  providedIn: 'root',
})
export class PayrollService {
  private baseUrl: string = 'http://localhost:3000/payrolls';

  constructor(private httpClient: HttpClient) {}

  // Create a new payroll record
  createSalary(salary: SalaryModel): Observable<SalaryModel> {
    salary.netSalary = this.calculateNetPay(salary);
    return this.httpClient
      .post<SalaryModel>(this.baseUrl, salary)
      .pipe(catchError(this.handleError));
  }

  // Get a payroll record by ID
  getPayrollById(id: string): Observable<SalaryModel> {
    return this.httpClient
      .get<SalaryModel>(`${this.baseUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  // Get all payroll records
  getAllPayrolls(): Observable<SalaryModel[]> {
    return this.httpClient
      .get<SalaryModel[]>(this.baseUrl)
      .pipe(catchError(this.handleError));
  }

  // Update an existing payroll record
  updatePayroll(id: string, payroll: SalaryModel): Observable<SalaryModel> {
    payroll.netSalary = this.calculateNetPay(payroll); // Recalculate net pay before updating
    return this.httpClient
      .put<SalaryModel>(`${this.baseUrl}/${id}`, payroll)
      .pipe(catchError(this.handleError));
  }

  // Delete a payroll record
  deletePayroll(id: string): Observable<void> {
    return this.httpClient
      .delete<void>(`${this.baseUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  // Calculate the net pay for a payroll record
  private calculateNetPay(payroll: SalaryModel): number {
    const totalDeductions = payroll.fund;
    const totalBonuses = payroll.bonusAmount;
    return payroll.baseSalary * 40 + totalBonuses - totalDeductions;
  }

  // Handle any errors in the HTTP request
  private handleError(error: HttpErrorResponse): Observable<never> {
    // Log error to the console (or send to a remote logging infrastructure)
    console.error('An error occurred:', error.message);
    // Return an observable with a user-facing error message
    return throwError(
      () => new Error('Something went wrong; please try again later.')
    );
  }
}
