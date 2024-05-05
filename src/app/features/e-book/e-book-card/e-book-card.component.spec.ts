import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EBookCardComponent } from './e-book-card.component';

describe('EBookCardComponent', () => {
  let component: EBookCardComponent;
  let fixture: ComponentFixture<EBookCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EBookCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EBookCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
