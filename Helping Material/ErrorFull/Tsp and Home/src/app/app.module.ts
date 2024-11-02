import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './template/dashboard/dashboard.component';
import { CreatelocationComponent } from './components/location/createlocation/createlocation.component';
import { EditlocationComponent } from './components/location/editlocation/editlocation.component';
import { ListlocationComponent } from './components/location/listlocation/listlocation.component';
import { ViewlocationComponent } from './components/location/viewlocation/viewlocation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  HttpClientModule,
  provideHttpClient,
  withFetch,
} from '@angular/common/http';
import { BreadcrumbComponent } from './template/breadcrumb/breadcrumb.component';
import { LocationService } from './services/location.service';

import { CreateadminComponent } from './components/admin/createadmin/createadmin.component';
import { EditadminComponent } from './components/admin/editadmin/editadmin.component';
import { ListadminComponent } from './components/admin/listadmin/listadmin.component';
import { ViewadminComponent } from './components/admin/viewadmin/viewadmin.component';
import { CreatemanagerComponent } from './components/manager/createmanager/createmanager.component';
import { EditmanagerComponent } from './components/manager/editmanager/editmanager.component';
import { ListmanagerComponent } from './components/manager/listmanager/listmanager.component';
import { ViewmanagerComponent } from './components/manager/viewmanager/viewmanager.component';
import { CreateemployeeComponent } from './components/employee/createemployee/createemployee.component';
import { EditemployeeComponent } from './components/employee/editemployee/editemployee.component';
import { ListemployeeComponent } from './components/employee/listemployee/listemployee.component';
import { ViewemployeeComponent } from './components/employee/viewemployee/viewemployee.component';
import { CreatedepartmentComponent } from './components/department/createdepartment/createdepartment.component';
import { EditdepartmentComponent } from './components/department/editdepartment/editdepartment.component';
import { ListdepartmentComponent } from './components/department/listdepartment/listdepartment.component';
import { ViewdepartmentComponent } from './components/department/viewdepartment/viewdepartment.component';
import { CreateattendanceComponent } from './components/attendance/createattendance/createattendance.component';
import { EditattendanceComponent } from './components/attendance/editattendance/editattendance.component';
import { ListattendanceComponent } from './components/attendance/listattendance/listattendance.component';
import { ViewattendanceComponent } from './components/attendance/viewattendance/viewattendance.component';
import { CreatefeedbackComponent } from './components/feedback/createfeedback/createfeedback.component';
import { EditfeedbackComponent } from './components/feedback/editfeedback/editfeedback.component';
import { ListfeedbackComponent } from './components/feedback/listfeedback/listfeedback.component';
import { ViewfeedbackComponent } from './components/feedback/viewfeedback/viewfeedback.component';
import { CreateleaveComponent } from './components/leave/createleave/createleave.component';
import { EditleaveComponent } from './components/leave/editleave/editleave.component';
import { ListleaveComponent } from './components/leave/listleave/listleave.component';
import { ViewleaveComponent } from './components/leave/viewleave/viewleave.component';
import { CreatepayrollComponent } from './components/payroll/createpayroll/createpayroll.component';
import { EditpayrollComponent } from './components/payroll/editpayroll/editpayroll.component';
import { ListpayrollComponent } from './components/payroll/listpayroll/listpayroll.component';
import { ViewpayrollComponent } from './components/payroll/viewpayroll/viewpayroll.component';
import { CreateperformanceComponent } from './components/performance/createperformance/createperformance.component';
import { EditperformanceComponent } from './components/performance/editperformance/editperformance.component';
import { ListperformanceComponent } from './components/performance/listperformance/listperformance.component';
import { ViewperformanceComponent } from './components/performance/viewperformance/viewperformance.component';
import { SidebarComponent } from './template/sidebar/sidebar.component';
import { HeaderComponent } from './template/header/header.component';
import { FooterComponent } from './template/footer/footer.component';
import { ErrorComponent } from './errorhandling/error/error.component';
import { NotfoundComponent } from './errorhandling/notfound/notfound.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    CreatelocationComponent,
    EditlocationComponent,
    ListlocationComponent,
    ViewlocationComponent,
    BreadcrumbComponent,

    CreateadminComponent,
    EditadminComponent,
    ListadminComponent,
    ViewadminComponent,
    CreatemanagerComponent,
    EditmanagerComponent,
    ListmanagerComponent,
    ViewmanagerComponent,
    CreateemployeeComponent,
    EditemployeeComponent,
    ListemployeeComponent,
    ViewemployeeComponent,
    CreatedepartmentComponent,
    EditdepartmentComponent,
    ListdepartmentComponent,
    ViewdepartmentComponent,
    CreateattendanceComponent,
    EditattendanceComponent,
    ListattendanceComponent,
    ViewattendanceComponent,
    CreatefeedbackComponent,
    EditfeedbackComponent,
    ListfeedbackComponent,
    ViewfeedbackComponent,
    CreateleaveComponent,
    EditleaveComponent,
    ListleaveComponent,
    ViewleaveComponent,
    CreatepayrollComponent,
    EditpayrollComponent,
    ListpayrollComponent,
    ViewpayrollComponent,
    CreateperformanceComponent,
    EditperformanceComponent,
    ListperformanceComponent,
    ViewperformanceComponent,
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    ErrorComponent,
    NotfoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      // your routes
    ]),
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch()),
    LocationService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}