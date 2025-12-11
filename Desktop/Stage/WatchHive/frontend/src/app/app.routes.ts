import { Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RuchesComponent } from './pages/ruches/ruches.component';
import { RucheDetailsComponent } from './pages/ruche-details/ruche-details.component';
import { RuchersComponent } from './pages/ruchers/ruchers.component';
import { RucherDetailsComponent } from './pages/rucher-details/rucher-details.component';
import { SettingsComponent } from './pages/settings/settings.component';

import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // Pages protégées par AuthGuard
  {
    path: '',
    canActivate: [authGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'ruches', component: RuchesComponent },
      { path: 'ruche-details/:id', component: RucheDetailsComponent },
      { path: 'ruchers', component: RuchersComponent },
      { path: 'rucher-details/:id', component: RucherDetailsComponent },
      { path: 'settings', component: SettingsComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },

  { path: '**', redirectTo: 'login' } // redirection pour URL inconnue
];
