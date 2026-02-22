import { Component, computed, inject, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApplicationStore } from '../../../store/application.store';
import { AuthStore } from '../../../store/auth.store';
import { NavbarComponent } from '../../../shared/components/navbar-component/navbar-component';
import { BreadCrumbsComponent } from '../../../shared/components/bread-crumbs-component/bread-crumbs-component';
import { ApplicationStatus } from '../../../core/model/application.model';

@Component({
    selector: 'app-application-tracking-component',
    imports: [NavbarComponent, BreadCrumbsComponent, DatePipe, FormsModule],
    templateUrl: './application-tracking-component.html',
    styleUrl: './application-tracking-component.css',
})
export class ApplicationTrackingComponent implements OnInit {
    readonly appStore = inject(ApplicationStore);
    readonly authStore = inject(AuthStore);

    isEmpty = computed(() => this.appStore.applicationsList().length === 0);

    ngOnInit(): void {
        const user = this.authStore.user();
        if (user) {
            this.appStore.loadUserApplications(user.id);
        }
    }

    onStatusChange(id: string, newStatus: ApplicationStatus) {
        this.appStore.updateApplication({ id, changes: { status: newStatus } });
    }

    onSaveNote(id: string, notes: string) {
        this.appStore.updateApplication({ id, changes: { notes } });
    }

    onDelete(id: string) {
        this.appStore.deleteApplication(id);
    }

    getStatusBadgeClass(status: ApplicationStatus): string {
        switch (status) {
            case 'en_attente': return 'badge-warning';
            case 'accepte': return 'badge-success';
            case 'refuse': return 'badge-error';
        }
    }

    getStatusLabel(status: ApplicationStatus): string {
        switch (status) {
            case 'en_attente': return 'En attente';
            case 'accepte': return 'Accepté';
            case 'refuse': return 'Refusé';
        }
    }
}
