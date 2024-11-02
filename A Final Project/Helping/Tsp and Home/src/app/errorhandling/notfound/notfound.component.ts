import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrl: './notfound.component.css',
})
export class NotfoundComponent {
  constructor(private router: Router) {}

  goToHome() {
    this.router.navigate(['dashboard']);
  }
}
