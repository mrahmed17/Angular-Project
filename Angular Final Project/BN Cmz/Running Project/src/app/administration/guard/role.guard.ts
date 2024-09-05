import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    const expectedRole = route.data['role'] as Array<
      'HR' | 'Manager' | 'PayrollAdmin' | 'Employee'
    >;
    return this.authService.currentUser$.pipe(
      map(() => {
        const role: 'HR' | 'Manager' | 'PayrollAdmin' | 'Employee' | null =
          this.authService.getUserRole();
        if (role && expectedRole.includes(role)) {
          return true;
        } else {
          this.router.navigate(['/login']);
          return false;
        }

        // const role: 'HR' | 'Manager' | 'PayrollAdmin' | 'Employee' | null =
        //   this.authService.getUserRole();

        // if (role === null || !expectedRole.includes(role)) {
        //   this.router.navigate(['/login']);
        //   return false;
        // }

        // return true;
      })
    );
  }
}
