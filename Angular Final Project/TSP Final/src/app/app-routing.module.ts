import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AttendanceComponent } from './components/attendance/attendance.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { DepartmentComponent } from './components/department/department.component';
import { LeavesComponent } from './components/leaves/leaves.component';
import { SalaryComponent } from './components/salary/salary.component';
import { AdvanceComponent } from './components/advance/advance.component';
import { BonusComponent } from './components/bonus/bonus.component';
import { AllLeavesComponent } from './components/all-leaves/all-leaves.component';
import { EmpDetailsComponent } from './components/emp-details/emp-details.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'attendance', component: AttendanceComponent },
  { path: 'employee', component: EmployeeComponent },
  { path: 'department', component: DepartmentComponent },
  { path: 'leaves', component: LeavesComponent },
  { path: 'salary', component: SalaryComponent },
  { path: 'advance', component: AdvanceComponent },
  { path: 'bonus', component: BonusComponent },
  { path: 'allleaves', component: AllLeavesComponent },
  { path: 'empdetails', component: EmpDetailsComponent },
  { path: '', component: LayoutComponent  },

   {path:"login", component:LoginComponent
  },
  // { path: 'empLogIn', component: EmpLoginComponent },
  //   {
  //     path: "emplayout", component: EmpLayoutComponent,

  //     children: [
  //       { path: "attendance", component: AttendanceComponent },
  //       { path: "leaves", component: LeavesComponent },
  //     ]
  //   }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
