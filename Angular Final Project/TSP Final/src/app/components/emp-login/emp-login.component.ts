import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-emp-login',
  templateUrl: './emp-login.component.html',
  styleUrls: ['./emp-login.component.css'],
})
export class EmpLoginComponent {
  emp_name: string = 'tamim@example.com';
  password: string = '1234';

  emp_name1: string = 'tamim@example.com';
  emp_name2: string = 'raju@gmail.com';

  constructor(private router2: Router) {}

  empLogIn() {
    if (
      (this.emp_name === this.emp_name1 || this.emp_name === this.emp_name2) &&
      this.password === '1234'
    ) {
      this.router2.navigateByUrl('attendance');
    } else {
      alert('Username and/or password is incorrect');
    }
  }
}
