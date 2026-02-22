import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormBuilder, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/service/auth-service';
import { AuthStore } from '../../../store/auth.store';

@Component({
  selector: 'app-register-component',
  imports: [
    RouterLink,
    ReactiveFormsModule
  ],
  standalone: true,
  templateUrl: './register-component.html',
  styleUrl: './register-component.css',
})
export class RegisterComponent {

  private readonly fb = inject(NonNullableFormBuilder)
  private readonly authService = inject(AuthService)
  private readonly store = inject(AuthStore)

  registerForm = this.fb.group({
    nom: ['', [Validators.required, Validators.minLength(2)]],
    prenom: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })

  get nom() {
    return this.registerForm.controls.nom;
  }

  get prenom() {
    return this.registerForm.controls.prenom;
  }

  get email() {
    return this.registerForm.controls.email;
  }

  get password() {
    return this.registerForm.controls.password;
  }

  submit(): void {
    if (this.registerForm.invalid) return;

    const data = this.registerForm.getRawValue();

    this.store.register(data);

  }


}
