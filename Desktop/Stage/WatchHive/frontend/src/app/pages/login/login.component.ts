import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  errorMessage = '';

  constructor(private fb: FormBuilder, private loginService: LoginService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) return;

    this.loading = true;
    const { email, password } = this.loginForm.value;

    this.loginService.login(email, password).subscribe({
      next: (res: any) => {
        console.log('Login successful', res);
        // Ici tu peux sauvegarder token, rediriger, etc.
        this.loading = false;
      },
      error: (err: any) => {
        console.error(err);
        this.errorMessage = 'Login failed';
        this.loading = false;
      }
    });
  }
}
