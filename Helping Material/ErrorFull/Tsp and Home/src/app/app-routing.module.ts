import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './template/dashboard/dashboard.component';
import { CreatelocationComponent } from './components/location/createlocation/createlocation.component';
import { EditlocationComponent } from './components/location/editlocation/editlocation.component';
import { ViewlocationComponent } from './components/location/viewlocation/viewlocation.component';
import { ListlocationComponent } from './components/location/listlocation/listlocation.component';
import { CreateadminComponent } from './components/admin/createadmin/createadmin.component';
import { EditadminComponent } from './components/admin/editadmin/editadmin.component';
import { ViewadminComponent } from './components/admin/viewadmin/viewadmin.component';
import { ListadminComponent } from './components/admin/listadmin/listadmin.component';
import { SidebarComponent } from './template/sidebar/sidebar.component';
// Import other components here

const routes: Routes = [
  { path: '', redirectTo: '/sidebar', pathMatch: 'full' },
  { path: 'sidebar', component: SidebarComponent },
  { path: 'dashboard', component: DashboardComponent },
  {
    path: 'admins',
    children: [
      { path: 'create', component: CreateadminComponent },
      { path: 'edit/:id', component: EditadminComponent },
      { path: 'view/:id', component: ViewadminComponent },
      { path: 'list', component: ListadminComponent },
    ],
  },
  {
    path: 'locations',
    children: [
      { path: 'create', component: CreatelocationComponent },
      { path: 'edit/:id', component: EditlocationComponent },
      { path: 'view/:id', component: ViewlocationComponent },
      { path: 'list', component: ListlocationComponent },
    ],
  },
  // Define other routes here
  { path: '**', redirectTo: '/sidebar' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
