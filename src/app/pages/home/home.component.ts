import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  LOCALE_ID,
} from '@angular/core';
import { PageService } from '../../services/page/page.service';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  title = 'Tobeto Public Library';
  pageService!: PageService;
  constructor(
    @Inject(LOCALE_ID) private locale: string,
    private titleService: Title,
    private metaService: Meta
  ) {
    this.pageService = new PageService(
      this.locale,
      this.titleService,
      this.metaService
    );
    this.pageService.setPage();
  }
}
