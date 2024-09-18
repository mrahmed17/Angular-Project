import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BreadcrumbComponent } from './template/breadcrumb/breadcrumb.component';
import { SidebarComponent } from './template/sidebar/sidebar.component';
import { FooterComponent } from './template/footer/footer.component';
import { HeaderComponent } from './template/header/header.component';
import { HomeComponent } from './template/home/home.component';
import { NotificationComponent } from './template/notification/notification.component';
import { LayoutComponent } from './template/layout/layout.component';
import { ErrorComponent } from './errorhandling/error/error.component';
import { NotfoundComponent } from './errorhandling/notfound/notfound.component';

@NgModule({
  declarations: [
    AppComponent,
    BreadcrumbComponent,
    SidebarComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    NotificationComponent,
    LayoutComponent,
    ErrorComponent,
    NotfoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
