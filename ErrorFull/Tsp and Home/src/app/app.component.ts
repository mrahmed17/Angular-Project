import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'hr-pm-system';

  isAuthenticated: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
    // this.authService.isAuthenticated().subscribe((authStatus) => {
    //   this.isAuthenticated = authStatus;
    // });
  }

  // ngOnInit(): void {
  //   this.isAuthenticated = this.authService.isAuthenticated();
  //   this.authService.currentUser$.subscribe((user) => {
  //     this.isAuthenticated = !!user;
  //   });
  // }

  onLogout(): void {
    this.authService.logout();
    this.isAuthenticated = false;
    // Optionally, you can add navigation to the any page after logout
    this.router.navigate(['/home']);
  }
}
