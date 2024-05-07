import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  HostListener,
  ElementRef,
  Output,
  EventEmitter,
} from '@angular/core';
import { SearchResultCollection } from '~app/models/SearchResultCollection';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { HighlightPipe } from '~app/shared/pipes/highlight/highlight.pipe';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-search-result',
  standalone: true,
  imports: [CommonModule, HighlightPipe, RouterModule],
  templateUrl: './search-result.component.html',
  styleUrl: './search-result.component.scss',
  animations: [
    trigger('fadeIn', [
      state('void', style({ opacity: 0 })),
      transition('void <=> *', animate(75)),
    ]),
    trigger('fadeOut', [
      state('void', style({ opacity: 1 })),
      transition('* <=> void', animate(75)),
    ]),
  ],
})
export class SearchResultComponent {
  @Input() searchResultCollection: SearchResultCollection | null = null;
  @Input() searchInput!: HTMLInputElement;
  @Output() onSearchInputChange = new EventEmitter();

  protected selectedItemIndex: number = 0;
  protected showResults: boolean = false;
  protected isSearchFocused = true;
  protected searchParam = '';

  constructor(private elementRef: ElementRef) {}

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowUp':
        this.selectedItemIndex = Math.max(this.selectedItemIndex - 1, 0);
        break;
      case 'ArrowDown':
        this.selectedItemIndex = Math.min(
          this.selectedItemIndex + 1,
          this.searchResultCollection!.bookListItems.length - 1
        );
        break;
    }
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: MouseEvent) {
    if (
      !this.elementRef.nativeElement.contains(event.target) &&
      this.searchResultCollection
    ) {
      this.showResults = false;
      this.searchResultCollection = null;
    } else {
      this.showResults = true;
    }
  }
  inputChange(event: Event) {
    this.searchParam = (event.target as HTMLInputElement).value;
    this.onSearchInputChange.emit(event);
  }
}
