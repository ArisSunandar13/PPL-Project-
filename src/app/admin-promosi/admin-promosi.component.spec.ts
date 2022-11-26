import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPromosiComponent } from './admin-promosi.component';

describe('AdminPromosiComponent', () => {
  let component: AdminPromosiComponent;
  let fixture: ComponentFixture<AdminPromosiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPromosiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminPromosiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
