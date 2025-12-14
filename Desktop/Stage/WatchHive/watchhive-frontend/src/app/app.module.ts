import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RuchesComponent } from './pages/ruches/ruches.component';
import { RucheDetailsComponent } from './pages/ruche-details/ruche-details.component';
import { RuchersComponent } from './pages/ruchers/ruchers.component';
import { RucherDetailsComponent } from './pages/rucher-details/rucher-details.component';
import { AlertSettingsComponent } from './pages/alert-settings/alert-settings.component';
import { AlertHistoryComponent } from './pages/alert-history/alert-history.component';

// import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    MainLayoutComponent,
    SidebarComponent,
    DashboardComponent,
    RuchesComponent,
    RucheDetailsComponent,
    RuchersComponent,
    RucherDetailsComponent,
    AlertSettingsComponent,
    AlertHistoryComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    AppRoutingModule,
    // NgChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
