import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './template/navbar/navbar.component';
import { HomeComponent } from './template/home/home.component';

const routes: Routes = [
  { path: 'navbar', component: NavbarComponent },
  { path: 'home', component: HomeComponent },
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
