import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetroativoComponent } from './retroativo.component';

describe('RetroativoComponent', () => {
  let component: RetroativoComponent;
  let fixture: ComponentFixture<RetroativoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RetroativoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RetroativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
