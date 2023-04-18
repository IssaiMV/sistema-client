import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/core/authentication/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.loginForm.statusChanges.subscribe(x => {
      console.log(this.loginForm.get('email'));
    })
  }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  async onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    console.log(this.loginForm);

    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    // Lógica para autenticar al usuario utilizando el servicio de autenticación
    const isAuthenticated = await this.authService.authenticate(email, password);
    console.log(isAuthenticated);

    if (isAuthenticated) {
      this.router.navigate(['/home']);
    } else {
      alert('Invalid credentials');
    }
  }
}
