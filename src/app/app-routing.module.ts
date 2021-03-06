import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './content/dashboard/dashboard.component';
import { ContingencySimplifiedListComponent } from './content/operations/contingency-simplified-list/contingency-simplified-list.component';
import { LayoutComponent } from './layout/layout.component';
import { AuthGuardService } from './auth/_services/authGuard.service';
import { FindAccountComponent } from './auth/find-account/find-account.component';
import { OperationsComponent } from './content/operations/operations.component';
import { RecoverPasswordComponent } from './auth/recover-password/recover-password.component';
import { SimplifiedLayoutComponent } from './simplified-layout/simplified-layout.component';
import { ContingencyListComponent } from './content/operations/contingency-list/contingency-list.component';
import { PendingListComponent } from './content/operations/pending-list/pending-list.component';
import {FleetHealthComponent} from './content/fleet-health/fleet-health.component';
import {DeferralListComponent} from './content/fleet-health/deferral-list/deferral-list.component';
import {ManagementComponent} from './content/management/management.component';
import {UserManagementComponent} from './content/management/mng-general/user-management/user-management.component';
import {BulkLoadComponent} from './content/management/mng-general/user-management/bulk-load/bulk-load.component';
import {UserListComponent} from './content/management/mng-general/user-management/user-list/user-list.component';
import {AtecFilterComponent} from './content/management/mng-fleet-health/atec-filter/atec-filter.component';
import {AogListComponent} from './content/operations/aog-list/aog-list.component';

const ROUTES: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: '',
                redirectTo: '/operations/contingencies',
                pathMatch: 'full',
            },
            {
                path: 'dashboard',
                component: DashboardComponent,
                canActivate: [AuthGuardService]
            },
            {
                path: 'operations',
                canActivate: [AuthGuardService],
                component: OperationsComponent,
                children: [
                    {
                        path: '',
                        redirectTo: '/operations/contingencies',
                        pathMatch: 'full',
                    },
                    {
                        path: 'contingencies',
                        component: ContingencyListComponent,
                    },
                    {
                        path: 'contingencies/historical',
                        component: ContingencyListComponent,
                        data: { historical: true },
                    },

                    {
                        path: 'pendings',
                        component: PendingListComponent,
                    }
                ]
            },
            {
                path: 'operations/aog',
                component: AogListComponent,
                canActivate: [AuthGuardService],
            },
            {
                path: 'fleet-health',
                canActivate: [AuthGuardService],
                component: FleetHealthComponent,
                children: [
                    {
                        path: '',
                        redirectTo: '/fleet-health/deferrals',
                        pathMatch: 'full',
                    },
                    {
                        path: 'deferrals',
                        component: DeferralListComponent,
                    }
                ]
            },
            {
                path: 'management',
                canActivate: [AuthGuardService],
                component: ManagementComponent,
                children: [
                    {
                        path: '',
                        redirectTo: '/management/general/users/user-list',
                        pathMatch: 'full',
                    },
                    {
                        path: 'general/users',
                        component: UserManagementComponent,
                        children: [
                            {
                                path: '',
                                redirectTo: '/management/general/users/user-list',
                                pathMatch: 'full'
                            },
                            {
                                path: 'bulk-load',
                                component: BulkLoadComponent,
                            },
                            {
                                path: 'add-user',
                                component: UserListComponent,
                            },
                            {
                                path: 'user-list',
                                component: UserListComponent,
                            },
                        ]
                    },
                    {
                        path: 'operations/emails',
                        component: UserManagementComponent,
                    },
                    {
                        path: 'fleet-health/atec',
                        component: AtecFilterComponent,
                    }
                ]
            },
        ]
    },

    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'logout',
        component: LoginComponent,
        data: { logout: true }
    },
    {
        path: 'findAccount',
        component: FindAccountComponent
    },
    {
        path: 'recoverPassword',
        component: RecoverPasswordComponent
    },
    {
        path: 'hemicycle',
        component: SimplifiedLayoutComponent,
        children: [
            {
                path: '',
                redirectTo: 'contingencies',
                pathMatch: 'full',
            },
            {
                path: 'contingencies',
                component: ContingencySimplifiedListComponent
            }
        ]
    },
    {
        path: '**',
        redirectTo: '/login',
        pathMatch: 'full'
    }
];


@NgModule({
    imports: [
        RouterModule.forRoot(ROUTES)
    ],
    exports: [
        RouterModule
    ],
    providers: []
})

export class AppRoutingModule {
}
