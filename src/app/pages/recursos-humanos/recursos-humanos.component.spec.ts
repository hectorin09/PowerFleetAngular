import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecursosHumanosComponent } from './recursos-humanos.component';

describe('RecursosHumanosComponent', () => {
  let component: RecursosHumanosComponent;
  let fixture: ComponentFixture<RecursosHumanosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecursosHumanosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecursosHumanosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
