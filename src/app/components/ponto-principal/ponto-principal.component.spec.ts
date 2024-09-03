import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PontoPrincipalComponent } from './ponto-principal.component';

describe('PontoPrincipalComponent', () => {
  let component: PontoPrincipalComponent;
  let fixture: ComponentFixture<PontoPrincipalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PontoPrincipalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PontoPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
