import { Component, computed, inject, OnInit } from '@angular/core';
import { FavStore } from '../../../store/fav.store';
import { AuthStore } from '../../../store/auth.store';
import { NavbarComponent } from "../../../shared/components/navbar-component/navbar-component";
import { BreadCrumbsComponent } from "../../../shared/components/bread-crumbs-component/bread-crumbs-component";
import { LucideAngularModule, Heart } from 'lucide-angular';

@Component({
  selector: 'app-favorite-component',
  imports: [NavbarComponent, BreadCrumbsComponent, LucideAngularModule],
  templateUrl: './favorite-component.html',
  styleUrl: './favorite-component.css',
})
export class FavoriteComponent implements OnInit {

  favStore = inject(FavStore);
  private authStore = inject(AuthStore);
  isEmpty = computed(() => !this.favStore.fav() || this.favStore.fav().length === 0);
  readonly HeartIcon = Heart;

  ngOnInit(): void {
    const userId = this.authStore.user()?.id;
    if (userId) {
      this.favStore.getAllFavorite(userId);
    }
  }

  delete(jobId: string): void {
    this.favStore.deleteFromFavorite(jobId);
  }

}
