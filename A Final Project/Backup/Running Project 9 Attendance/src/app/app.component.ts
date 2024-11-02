import { Component, OnInit } from '@angular/core';
import { UserModel } from './models/user.model';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'hr-payroll-management-system';

  userRole: string | null = '';
  currentUser: UserModel | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe((user) => {
      this.currentUser = user;
      this.userRole = user?.role || null;
    });
  }
}
