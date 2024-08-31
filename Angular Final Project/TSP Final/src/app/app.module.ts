import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdvanceComponent } from './components/advance/advance.component';
import { LeavesComponent } from './components/leaves/leaves.component';
import { AttendanceComponent } from './components/attendance/attendance.component';
import { BonusComponent } from './components/bonus/bonus.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DepartmentComponent } from './components/department/department.component';
import { EmpDetailsComponent } from './components/emp-details/emp-details.component';
import { EmpLayoutComponent } from './components/emp-layout/emp-layout.component';
import { EmpLoginComponent } from './components/emp-login/emp-login.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { LayoutComponent } from './components/layout/layout.component';
import { AllLeavesComponent } from './components/all-leaves/all-leaves.component';
import { LoginComponent } from './components/login/login.component';
import { SalaryComponent } from './components/salary/salary.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    AdvanceComponent,
    LeavesComponent,
    AttendanceComponent,
    BonusComponent,
    DashboardComponent,
    DepartmentComponent,
    EmpDetailsComponent,
    EmpLayoutComponent,
    EmpLoginComponent,
    EmployeeComponent,
    LayoutComponent,
    AllLeavesComponent,
    LoginComponent,
    SalaryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
