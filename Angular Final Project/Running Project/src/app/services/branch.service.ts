import { Injectable } from '@angular/core';
import { BranchModel } from '../models/branch.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BranchService {
  private baseUrl: string = 'http://localhost:3000/branches';
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) {}

  // Method to get all branchs
  getAllBranchs(): Observable<BranchModel[]> {
    return this.http
      .get<BranchModel[]>(this.baseUrl)
      .pipe(catchError(this.handleError<BranchModel[]>('getBranchs', [])));
  }

  // Method to get a branch by ID
  getBranchById(id: string): Observable<BranchModel> {
    const url = `${this.baseUrl}/${id}`;
    console.log('Fetching branch with URL:', url); // Log the URL
    return this.http
      .get<BranchModel>(url)
      .pipe(catchError(this.handleError<BranchModel>('getBranchById')));
  }

  // Method to create a new branch
  createBranch(branch: Partial<BranchModel>): Observable<BranchModel> {
    return this.http
      .post<BranchModel>(this.baseUrl, branch, { headers: this.headers })
      .pipe(catchError(this.handleError<BranchModel>('createBranch')));
  }

  // Method to update an existing branch
  updateBranch(
    id: string,
    updatedDetails: Partial<BranchModel>
  ): Observable<BranchModel> {
    const url = `${this.baseUrl}/${id}`;
    return this.http
      .put<BranchModel>(url, updatedDetails, { headers: this.headers })
      .pipe(catchError(this.handleError<BranchModel>('updateBranch')));
  }

  // Method to delete a branch
  deleteBranch(id: string): Observable<boolean> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete(url, { headers: this.headers }).pipe(
      map(() => true),
      catchError(this.handleError<boolean>('deleteBranch', false))
    );
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
