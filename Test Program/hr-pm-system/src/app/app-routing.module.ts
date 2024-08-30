import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './template/layout/layout.component';
import { DashboardComponent } from './template/dashboard/dashboard.component';
import { CreatelocationComponent } from './components/location/createlocation/createlocation.component';
import { EditlocationComponent } from './components/location/editlocation/editlocation.component';
import { ViewlocationComponent } from './components/location/viewlocation/viewlocation.component';
import { ListlocationComponent } from './components/location/listlocation/listlocation.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      {
        path: 'locations',
        children: [
          { path: 'create', component: CreatelocationComponent },
          { path: 'edit/:id', component: EditlocationComponent },
          { path: 'view/:id', component: ViewlocationComponent },
          { path: 'list', component: ListlocationComponent },
        ],
      },
      // Add more routes here as needed
    ],
  },
  // Handle undefined routes
  { path: '**', redirectTo: 'dashboard' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
