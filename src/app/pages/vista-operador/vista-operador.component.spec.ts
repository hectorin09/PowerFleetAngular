import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaOperadorComponent } from './vista-operador.component';

describe('VistaOperadorComponent', () => {
  let component: VistaOperadorComponent;
  let fixture: ComponentFixture<VistaOperadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VistaOperadorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VistaOperadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
