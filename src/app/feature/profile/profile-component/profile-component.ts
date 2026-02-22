import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthStore } from '../../../store/auth.store';
import { NavbarComponent } from '../../../shared/components/navbar-component/navbar-component';
import { BreadCrumbsComponent } from '../../../shared/components/bread-crumbs-component/bread-crumbs-component';

@Component({
    selector: 'app-profile-component',
    imports: [NavbarComponent, BreadCrumbsComponent, ReactiveFormsModule],
    templateUrl: './profile-component.html',
    styleUrl: './profile-component.css',
})
export class ProfileComponent implements OnInit {
    readonly authStore = inject(AuthStore);
    private readonly fb = inject(FormBuilder);

    profileForm = this.fb.group({
        nom: ['', [Validators.required, Validators.minLength(2)]],
        prenom: ['', [Validators.required, Validators.minLength(2)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['']
    });

    ngOnInit(): void {
        const user = this.authStore.user();
        if (user) {
            this.profileForm.patchValue({
                nom: user.nom,
                prenom: user.prenom,
                email: user.email,
                password: ''
            });
        }
    }

    onSubmit(): void {
        if (this.profileForm.invalid) return;

        const user = this.authStore.user();
        if (!user) return;

        const formValue = this.profileForm.getRawValue();

        const payload: any = {
            id: user.id,
            nom: formValue.nom,
            prenom: formValue.prenom,
            email: formValue.email
        };

        if (formValue.password && formValue.password.trim().length > 0) {
            payload.password = formValue.password;
        }

        this.authStore.updateProfile(payload);
        alert('Profil mis à jour avec succès !');
    }

    onDeleteAccount(): void {
        const user = this.authStore.user();
        if (!user) return;

        const confirmed = confirm(
            'Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.'
        );

        if (confirmed) {
            this.authStore.deleteAccount(user.id);
        }
    }
}
