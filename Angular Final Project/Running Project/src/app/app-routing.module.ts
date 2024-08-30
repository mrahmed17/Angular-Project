import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './template/home/home.component';
import { LayoutComponent } from './template/layout/layout.component';
import { NotfoundComponent } from './errorhandling/notfound/notfound.component';
import { CreatelocationComponent } from './components/location/createlocation/createlocation.component';
import { EditlocationComponent } from './components/location/editlocation/editlocation.component';
import { ViewlocationComponent } from './components/location/viewlocation/viewlocation.component'; // Assuming you have this component
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

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'layout',
    component: LayoutComponent,
  },
  {
    path: 'admins',
    children: [
      {
        path: 'create',
        component: CreateadminComponent,
      },
      {
        path: 'edit/:id',
        component: EditadminComponent,
      },
      {
        path: 'view/:id',
        component: ViewadminComponent,
      },
      {
        path: 'list',
        component: ListadminComponent,
      },
    ],
  },
  {
    path: 'managers',
    children: [
      {
        path: 'create',
        component: CreatemanagerComponent,
      },
      {
        path: 'edit/:id',
        component: EditmanagerComponent,
      },
      {
        path: 'view/:id',
        component: ViewmanagerComponent,
      },
      {
        path: 'list',
        component: ListmanagerComponent,
      },
    ],
  },
  {
    path: 'departments',
    children: [
      {
        path: 'create',
        component: CreatedepartmentComponent,
      },
      {
        path: 'edit/:id',
        component: EditdepartmentComponent,
      },
      {
        path: 'view/:id',
        component: ViewdepartmentComponent,
      },
      {
        path: 'list',
        component: ListdepartmentComponent,
      },
    ],
  },
  {
    path: 'locations',
    children: [
      {
        path: 'create',
        component: CreatelocationComponent,
      },
      {
        path: 'edit/:id',
        component: EditlocationComponent,
      },
      {
        path: 'view/:id',
        component: ViewlocationComponent,
      },
      {
        path: 'list',
        component: ListlocationComponent,
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
