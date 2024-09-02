import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './template/home/home.component';

import { NotfoundComponent } from './errorhandling/notfound/notfound.component';
import { CreatelocationComponent } from './components/location/createlocation/createlocation.component';
import { EditlocationComponent } from './components/location/editlocation/editlocation.component';
import { ViewlocationComponent } from './components/location/viewlocation/viewlocation.component';
import { ListlocationComponent } from './components/location/listlocation/listlocation.component';
import { CreateadminComponent } from './components/admin/createadmin/createadmin.component';
import { EditadminComponent } from './components/admin/editadmin/editadmin.component';
import { ViewadminComponent } from './components/admin/viewadmin/viewadmin.component';
import { ListadminComponent } from './components/admin/listadmin/listadmin.component';
import { CreatemanagerComponent } from './components/manager/createmanager/createmanager.component';
import { EditmanagerComponent } from './components/manager/editmanager/editmanager.component';
import { ViewmanagerComponent } from './components/manager/viewmanager/viewmanager.component';
import { ListmanagerComponent } from './components/manager/listmanager/listmanager.component';
import { CreatedepartmentComponent } from './components/department/createdepartment/createdepartment.component';
import { EditdepartmentComponent } from './components/department/editdepartment/editdepartment.component';
import { ViewdepartmentComponent } from './components/department/viewdepartment/viewdepartment.component';
import { ListdepartmentComponent } from './components/department/listdepartment/listdepartment.component';
import { CreateemployeeComponent } from './components/employee/createemployee/createemployee.component';
import { EditemployeeComponent } from './components/employee/editemployee/editemployee.component';
import { ViewemployeeComponent } from './components/employee/viewemployee/viewemployee.component';
import { ListemployeeComponent } from './components/employee/listemployee/listemployee.component';
import { CreatepayrollComponent } from './components/payroll/createpayroll/createpayroll.component';
import { EditpayrollComponent } from './components/payroll/editpayroll/editpayroll.component';
import { ViewpayrollComponent } from './components/payroll/viewpayroll/viewpayroll.component';
import { ListpayrollComponent } from './components/payroll/listpayroll/listpayroll.component';
import { CreatefeedbackComponent } from './components/feedback/createfeedback/createfeedback.component';
import { EditfeedbackComponent } from './components/feedback/editfeedback/editfeedback.component';
import { ViewfeedbackComponent } from './components/feedback/viewfeedback/viewfeedback.component';
import { ListfeedbackComponent } from './components/feedback/listfeedback/listfeedback.component';
import { CreateattendanceComponent } from './components/attendance/createattendance/createattendance.component';
import { EditattendanceComponent } from './components/attendance/editattendance/editattendance.component';
import { ViewattendanceComponent } from './components/attendance/viewattendance/viewattendance.component';
import { ListattendanceComponent } from './components/attendance/listattendance/listattendance.component';
import { CreateperformanceComponent } from './components/performance/createperformance/createperformance.component';
import { EditperformanceComponent } from './components/performance/editperformance/editperformance.component';
import { ViewperformanceComponent } from './components/performance/viewperformance/viewperformance.component';
import { ListperformanceComponent } from './components/performance/listperformance/listperformance.component';
import { LoginComponent } from './administration/login/login.component';
import { SidebarComponent } from './template/sidebar/sidebar.component';
import { LogoutComponent } from './administration/logout/logout.component';
import { CreateprofileComponent } from './administration/createprofile/createprofile.component';
import { AuthGuard } from './administration/guard/authguard.guard';
import { RoleGuard } from './administration/guard/role.guard';
import { UserprofileComponent } from './administration/userprofile/userprofile.component';
import { DashboardComponent } from './template/dashboard/dashboard.component';
import { ForgetpasswordComponent } from './administration/forgetpassword/forgetpassword.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'logout',
    component: LogoutComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'createprofille',
    component: CreateprofileComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'Admin' },
  },
  {
    path: 'userprofile',
    component: UserprofileComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: ['Admin', 'Manager', 'User'] },
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: ['Admin', 'Manager'] },
  },
  {
    path: 'sidebar',
    component: SidebarComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'Admin' },
  },
  { path: 'forgetpassword', component: ForgetpasswordComponent },
  {
    path: 'admins',
    children: [
      {
        path: 'create',
        component: CreateadminComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { role: ['Admin', 'Manager'] },
      },
      {
        path: 'edit/:id',
        component: EditadminComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { role: ['Admin', 'Manager'] },
      },
      {
        path: 'view/:id',
        component: ViewadminComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { role: ['Admin', 'Manager'] },
      },
      {
        path: 'list',
        component: ListadminComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { role: ['Admin', 'Manager'] },
      },
    ],
  },
  {
    path: 'managers',
    children: [
      {
        path: 'create',
        component: CreatemanagerComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { role: 'Admin' },
      },
      {
        path: 'edit/:id',
        component: EditmanagerComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { role: 'Admin' },
      },
      {
        path: 'view/:id',
        component: ViewmanagerComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { role: 'Admin' },
      },
      {
        path: 'list',
        component: ListmanagerComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { role: 'Admin' },
      },
    ],
  },
  {
    path: 'employees',
    children: [
      {
        path: 'create',
        component: CreateemployeeComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { role: ['Admin', 'Manager'] },
      },
      {
        path: 'edit/:id',
        component: EditemployeeComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { role: ['Admin', 'Manager'] },
      },
      {
        path: 'view/:id',
        component: ViewemployeeComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { role: ['Admin', 'Manager'] },
      },
      {
        path: 'list',
        component: ListemployeeComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { role: ['Admin', 'Manager'] },
      },
    ],
  },
  {
    path: 'payrolls',
    children: [
      {
        path: 'create',
        component: CreatepayrollComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { role: ['Admin', 'Manager'] },
      },
      {
        path: 'edit/:id',
        component: EditpayrollComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { role: ['Admin', 'Manager'] },
      },
      {
        path: 'view/:id',
        component: ViewpayrollComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { role: ['Admin', 'Manager'] },
      },
      {
        path: 'list',
        component: ListpayrollComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { role: ['Admin', 'Manager'] },
      },
    ],
  },
  {
    path: 'departments',
    children: [
      {
        path: 'create',
        component: CreatedepartmentComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { role: ['Admin', 'Manager'] },
      },
      {
        path: 'edit/:id',
        component: EditdepartmentComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { role: ['Admin', 'Manager'] },
      },
      {
        path: 'view/:id',
        component: ViewdepartmentComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { role: ['Admin', 'Manager'] },
      },
      {
        path: 'list',
        component: ListdepartmentComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { role: ['Admin', 'Manager'] },
      },
    ],
  },
  {
    path: 'attendances',
    children: [
      {
        path: 'create',
        component: CreateattendanceComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { role: ['Admin', 'Manager', 'User'] },
      },
      {
        path: 'edit/:id',
        component: EditattendanceComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { role: ['Admin'] },
      },
      {
        path: 'view/:id',
        component: ViewattendanceComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { role: ['Admin', 'Manager'] },
      },
      {
        path: 'list',
        component: ListattendanceComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { role: ['Admin', 'Manager'] },
      },
    ],
  },
  {
    path: 'feedbacks',
    children: [
      {
        path: 'create',
        component: CreatefeedbackComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { role: ['Admin', 'Manager', 'User'] },
      },
      {
        path: 'edit/:id',
        component: EditfeedbackComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { role: ['Admin', 'Manager'] },
      },
      {
        path: 'view/:id',
        component: ViewfeedbackComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { role: ['Admin', 'Manager'] },
      },
      {
        path: 'list',
        component: ListfeedbackComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { role: ['Admin', 'Manager'] },
      },
    ],
  },
  {
    path: 'performances',
    children: [
      {
        path: 'create',
        component: CreateperformanceComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { role: ['Admin', 'Manager'] },
      },
      {
        path: 'edit/:id',
        component: EditperformanceComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { role: ['Admin', 'Manager'] },
      },
      {
        path: 'view/:id',
        component: ViewperformanceComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { role: ['Admin', 'Manager'] },
      },
      {
        path: 'list',
        component: ListperformanceComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { role: ['Admin', 'Manager'] },
      },
    ],
  },
  {
    path: 'locations',
    children: [
      {
        path: 'create',
        component: CreatelocationComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { role: ['Admin', 'Manager'] },
      },
      {
        path: 'edit/:id',
        component: EditlocationComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { role: ['Admin', 'Manager'] },
      },
      {
        path: 'view/:id',
        component: ViewlocationComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { role: ['Admin', 'Manager'] },
      },
      {
        path: 'list',
        component: ListlocationComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { role: ['Admin', 'Manager'] },
      },
    ],
  },
  { path: '**', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
