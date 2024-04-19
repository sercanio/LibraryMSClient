import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BookCardComponent } from '~app/features/book/components/book-card/book-card.component';

@Component({
  standalone: true,
  imports: [CommonModule, BookCardComponent],
  templateUrl: './library.component.html',
  styleUrl: './library.component.scss'
})
export class LibraryComponent {
  
}
