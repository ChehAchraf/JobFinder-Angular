import { Component, computed, inject, OnInit } from '@angular/core';
import { FavStore } from '../../../store/fav.store';
import { NavbarComponent } from "../../../shared/components/navbar-component/navbar-component";
import { FavoriteService } from '../../../core/service/favorite-service';
import { BreadCrumbsComponent } from "../../../shared/components/bread-crumbs-component/bread-crumbs-component";
import { LucideAngularModule, FileIcon, Heart } from 'lucide-angular';
import { Job } from '../../../core/model/job.model';


@Component({
  selector: 'app-favorite-component',
  imports: [NavbarComponent, BreadCrumbsComponent, LucideAngularModule],
  templateUrl: './favorite-component.html',
  styleUrl: './favorite-component.css',
})
export class FavoriteComponent implements OnInit {

  favStore = inject(FavStore)
  private favService = inject(FavoriteService)
  favStroe = inject(FavStore)
  isEmpty = computed(() => !this.favStore.fav() || this.favStore.fav().length === 0)
  readonly HeartIcon = Heart


  ngOnInit(): void {
    this.favStore.getAllFavorite();
  }

  delete(jobId: string) {
    const id = jobId
    this.favStore.deleteFromFavorite(id);
  }

}
