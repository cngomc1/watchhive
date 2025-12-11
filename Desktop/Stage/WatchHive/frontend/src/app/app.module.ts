import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { routes } from './app.routes';

// Composants
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RuchesComponent } from './pages/ruches/ruches.component';
import { RucheDetailsComponent } from './pages/ruche-details/ruche-details.component';
import { RuchersComponent } from './pages/ruchers/ruchers.component';
import { RucherDetailsComponent } from './pages/rucher-details/rucher-details.component';
import { SettingsComponent } from './pages/settings/settings.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    RuchesComponent,
    RucheDetailsComponent,
    RuchersComponent,
    RucherDetailsComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes) // <-- routing configuré ici
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
