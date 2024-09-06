import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { UserModel } from '../models/user.model';
import { AuthResponseModel } from '../models/auth-response.model';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl: string = 'http://localhost:3000/user';
  private currentUserSubject: BehaviorSubject<UserModel | null>;
  public currentUser$: Observable<UserModel | null>;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object // Injecting PLATFORM_ID to check if it's browser
  ) {
    const storedUser = this.isBrowser()
      ? JSON.parse(localStorage.getItem('currentUser') || 'null')
      : null;
    this.currentUserSubject = new BehaviorSubject<UserModel | null>(storedUser);
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  // Get the current user ID
  getUserId(): string | null {
    return this.currentUserValue?.id || null;
  }

  // Check if the platform is a browser
  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  // Registers a new user
  registration(user: UserModel): Observable<AuthResponseModel> {
    return this.http.post<UserModel>(this.apiUrl, user).pipe(
      map((newUser: UserModel) => {
        const token = btoa(`${newUser.email}${newUser.password}`);
        return { token, user: newUser } as AuthResponseModel;
      }),
      catchError((error) => {
        console.error('Registration error:', error);
        throw error;
        return throwError(() => new Error('Registration failed'));
      })
    );
  }

  // Logs in a user
  login(credentials: {
    email: string;
    password: string;
  }): Observable<AuthResponseModel> {
    let params = new HttpParams();
    params = params.append('email', credentials.email);

    return this.http.get<UserModel[]>(`${this.apiUrl}`, { params }).pipe(
      map((users) => {
        if (users.length > 0) {
          const user = users[0];
          if (user.password === credentials.password) {
            const token = btoa(`${user.email}:${user.password}`);
            this.storeToken(token);
            this.setCurrentUser(user);
            // this.storeUserProfile(user);
            return { token, user } as AuthResponseModel;
          } else {
            throw new Error('Invalid password');
          }
        } else {
          throw new Error('User not found');
        }
      }),

      catchError((error) => {
        console.error('Login error:', error);
        throw error;
      })
    );
  }

  // Gets the current user value
  public get currentUserValue(): UserModel | null {
    return this.currentUserSubject.value;
  }

  // Logs out the current user
  logout(): void {
    this.clearCurrentUser();
    if (this.isBrowser()) {
      localStorage.removeItem('token');
    }
    // localStorage.removeItem('token'); //no need
  }

  // Sets the current user and stores in localStorage
  private setCurrentUser(user: UserModel): void {
    if (this.isBrowser()) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      localStorage.setItem('role', user.role); // Store role
    }
    this.currentUserSubject.next(user);
  }

  // Clears the current user from localStorage
  private clearCurrentUser(): void {
    if (this.isBrowser()) {
      localStorage.removeItem('currentUser');
    }
    this.currentUserSubject.next(null);
  }

  // Checks if the user is authenticated
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  // Retrieves the token from localStorage
  getToken(): string | null {
    return this.isBrowser() ? localStorage.getItem('token') : null;
  }

  // Retrieves the user role
  getUserRole(): 'HR' | 'Manager' | 'PayrollAdmin' | 'Employee' | null {
    return (
      this.currentUserValue?.role ||
      (localStorage.getItem('role') as
        | 'HR'
        | 'Manager'
        | 'PayrollAdmin'
        | 'Employee'
        | null)
    );
  }


  // Stores the token in localStorage
  storeToken(token: string): void {
    if (this.isBrowser()) {
      localStorage.setItem('token', token);
    }
  }

  // Method by Sir
  // storeToken(token: string): void {
  //   localStorage.setItem('token', token);
  // }

  // Stores the user profile in localStorage
  storeUserProfile(user: UserModel): void {
    if (this.isBrowser()) {
      localStorage.setItem('userProfile', JSON.stringify(user));
    }
  }

  // Retrieves the user profile from localStorage
  getUserProfileFromStorage(): UserModel | null {
    if (this.isBrowser()) {
      const userProfile = localStorage.getItem('userProfile');
      console.log('User Profile is: ', userProfile);
      return userProfile ? JSON.parse(userProfile) : null;
    }
    return null;
  }

  forgetPassword(email: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/forgetpassword`, { email });
  }

  // Clears all user details from localStorage
  removeUserDetails() {
    if (this.isBrowser()) {
      localStorage.clear();
    }
  }
}
