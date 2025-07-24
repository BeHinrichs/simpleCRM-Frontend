import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Dashboard } from './dashboard/dashboard';
import { Main } from './dashboard/main/main';
import { Account } from './dashboard/account/account';
import { Billing } from './dashboard/billing/billing';
import { Orders } from './dashboard/orders/orders'


export const routes: Routes = [
    {path: "", component: Login},
    {
        path: "dashboard",
        component: Dashboard,
        children: [
            { path: '', redirectTo: 'main', pathMatch: 'full' },
            { path: "main", component: Main },
            {path: "account", component: Account},
            {path: "billing", component: Billing},
            {path: "orders", component: Orders}
        ]
    }
    
];
