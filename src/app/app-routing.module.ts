import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { AdminPembayaranComponent } from './admin-pembayaran/admin-pembayaran.component';
import { AdminProdukComponent } from './admin-produk/admin-produk.component';
import { AdminPromosiComponent } from './admin-promosi/admin-promosi.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'admin-produk', component: AdminProdukComponent },
  { path: 'admin-promosi', component: AdminPromosiComponent },
  { path: 'admin-pembayaran', component: AdminPembayaranComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
