import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SearchResultCollection } from '~app/models/SearchResultCollection';

@Component({
  selector: 'app-search-result',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search-result.component.html',
  styleUrl: './search-result.component.scss',
})
export class SearchResultComponent {
  @Input() searchResultCollection!: SearchResultCollection;
}
