import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProdukComponent } from './admin-produk.component';

describe('AdminProdukComponent', () => {
  let component: AdminProdukComponent;
  let fixture: ComponentFixture<AdminProdukComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminProdukComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminProdukComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
