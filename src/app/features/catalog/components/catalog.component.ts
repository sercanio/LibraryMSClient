import { Component } from '@angular/core';
import { CatalogService } from '../services/catalog.service';
import { CatalogResponse } from '~app/models/HttpResponse/CatalogResponse';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.scss',
})
export class CatalogComponent {
  protected catalogs!: CatalogResponse[];
  constructor(protected catalogService: CatalogService) {}

  ngOnInit(): void {
    this.catalogService.getAll().subscribe((response) => {
      console.log(response);
      this.catalogs = response.items;
    });
  }
}
