import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPembayaranComponent } from './admin-pembayaran.component';

describe('AdminPembayaranComponent', () => {
  let component: AdminPembayaranComponent;
  let fixture: ComponentFixture<AdminPembayaranComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPembayaranComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminPembayaranComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
