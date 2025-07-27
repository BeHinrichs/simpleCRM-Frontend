import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Dashboard } from './dashboard/dashboard';
import { Main } from './dashboard/main/main';
import { Account } from './dashboard/account/account';
import { PvStation } from './dashboard/pv-station/pv-station';
import { HomeMatic } from './dashboard/home-matic/home-matic';
import { Task } from './dashboard/task/task';


export const routes: Routes = [
    {path: "", component: Login},
    {
        path: "dashboard",
        component: Dashboard,
        children: [
            { path: '', redirectTo: 'main', pathMatch: 'full' },
            { path: "main", component: Main },
            { path: "account", component: Account},
            { path: "pv-station", component: PvStation},
            { path: "home-matic", component: HomeMatic},
            { path: "task", component: Task}
        ]
    }
    
];
