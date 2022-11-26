import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPembayaranComponent } from './admin-pembayaran/admin-pembayaran.component';
import { AdminProdukComponent } from './admin-produk/admin-produk.component';
import { AdminPromosiComponent } from './admin-promosi/admin-promosi.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'admin-produk', component: AdminProdukComponent },
  { path: 'admin-promosi', component: AdminPromosiComponent },
  { path: 'admin-pembayaran', component: AdminPembayaranComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
