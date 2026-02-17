import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-bread-crumbs-component',
  imports: [RouterLink],
  templateUrl: './bread-crumbs-component.html',
  styleUrl: './bread-crumbs-component.css',
})
export class BreadCrumbsComponent implements OnInit {

  private router = inject(Router)

  ngOnInit(): void {
    const urlPath = this.router.url.split('/')[1]
    console.log(urlPath)
  }

  get currentPage() {
    return this.router.url.split('/')[1];
  }

}
