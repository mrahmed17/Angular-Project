import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  UserObj: any = {
    UserName: 'admin',
    UserName2: 'tamim',
    Password: '1234',
  };

  constructor(private router: Router) {}
  onLogin() {
    if (this.UserObj.UserName == 'admin' && this.UserObj.Password == '1234') {
      this.router.navigateByUrl('dashboard');
    }
  
    else {
      alert('Username and password is wrong');
    }
  }
}
