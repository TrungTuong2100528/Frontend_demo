import { Routes } from '@angular/router';
import { InventoryComponent } from './AppComponents/inventory/inventory.component';
import { CustomerComponent } from './AppComponents/customer/customer.component';

export const routes: Routes = [

    // Inventory là trang mặc định
    { path: '', redirectTo: 'inventory', pathMatch: 'full' },

    {path:'inventory', component:InventoryComponent},
    {path:'Customers', component:CustomerComponent},

     // (tuỳ chọn) fallback
    { path: '**', redirectTo: 'inventory' }
];
