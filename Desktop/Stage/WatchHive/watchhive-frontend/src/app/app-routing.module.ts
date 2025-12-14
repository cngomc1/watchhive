import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RuchesComponent } from './pages/ruches/ruches.component';
import { RucheDetailsComponent } from './pages/ruche-details/ruche-details.component';
import { RuchersComponent } from './pages/ruchers/ruchers.component';
import { RucherDetailsComponent } from './pages/rucher-details/rucher-details.component';
import { AlertSettingsComponent } from './pages/alert-settings/alert-settings.component';
import { AlertHistoryComponent } from './pages/alert-history/alert-history.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'ruches', component: RuchesComponent },
      { path: 'ruches/:id', component: RucheDetailsComponent },
      { path: 'ruchers', component: RuchersComponent },
      { path: 'ruchers/:id', component: RucherDetailsComponent },
      { path: 'alert-settings', component: AlertSettingsComponent },
      { path: 'alert-history', component: AlertHistoryComponent }
    ]
  },

  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
