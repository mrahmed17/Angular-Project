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
    path: 'employees',
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
