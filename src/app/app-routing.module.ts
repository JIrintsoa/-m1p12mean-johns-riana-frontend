// angular import
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// Project import
import { AdminComponent } from './theme/layouts/admin-layout/admin-layout.component';
import { GuestLayoutComponent } from './theme/layouts/guest-layout/guest-layout.component';
import { AuthInterceptor } from './auth/auth.interceptors';
import { AuthGuard } from './auth/auth.guard';
import { UnauthorizedComponent } from './shared/unauthorized/unauthorized.component';
import { LogoutComponent } from './components/authentication/auth-logout/auth-logout.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
      },
      { 
        path: 'unauthorized',
        component: UnauthorizedComponent
      },
      {
        path: 'dashboard/default',
        loadComponent: () => import('./demo/dashboard/default/default.component').then((c) => c.DefaultComponent)
      },
      {
        path: 'client/take-appointment',
        loadComponent: () => import('./components/client/appointement/forms/forms.component').then((c) => c.FormsComponent,),
        canActivate: [AuthGuard],
        data: { roles: ['client'] }
      },
      {
        path: 'client/take-appointment/:id',
        loadComponent: () => import('./components/client/appointement/details/details.component').then((c) => c.DetailsComponent),
        canActivate: [AuthGuard],
        data: { roles: ['client'] }
      },
      {
        path: 'client/vehicule',
        loadComponent: () => import('./components/client/vehicules/vehicules.component').then((c) => c.VehiculesComponent),
        canActivate: [AuthGuard],
        data: { roles: ['client'] }
      },
      {
        path: 'client/progress',
        loadComponent: () => import('./components/client/progress/list/list.component').then((c) => c.ListComponent),
        canActivate: [AuthGuard],
        data: { roles: ['client'] }
      },
      {
        path: 'client/progress/detail/:id', // Ajout de :id pour le paramètre dynamique
        loadComponent: () => import('./components/client/progress/details/details.component').then((c) => c.DetailsComponent),
        canActivate: [AuthGuard],
        data: { roles: ['client'] }
      },
      {
        path: 'manager/statistics',
        loadComponent: () => import('./components/manager/statistics/statistics.component').then((c) => c.StatisticsComponent),
        canActivate: [AuthGuard],
        data: { roles: ['manager'] }},
      {
        path: 'manager/appointment-list',
        loadComponent: () => import('./components/manager/appointment-list/appointment-list.component').then((c) => c.AppointmentListComponent),
        canActivate: [AuthGuard],
        data: { roles: ['manager'] }
      },
      {
        path: 'manager/appointment-list/details/:id',
        loadComponent: () => import('./components/manager/details/details.component').then((c) => c.DetailsComponent),
        canActivate: [AuthGuard],
        data: { roles: ['manager'] }
      },
      {
        path: 'manager/repair-list',
        loadComponent: () => import('./components/manager/repair-list/repair-list.component').then((c) => c.RepairListComponent),
        canActivate: [AuthGuard],
        data: { roles: ['manager'] }
      },
      {
        path: 'manager/mechanics',
        loadComponent: () => import('./components/manager/mechanics/mechanics.component').then((c) => c.MechanicsComponent),
        canActivate: [AuthGuard],
        data: { roles: ['manager'] }
      },
      {
        path: 'mechanic/repair-list',
        loadComponent: () => import('./components/mechanic/repair-list/repair-list.component').then((c) => c.RepairListComponent),
        canActivate: [AuthGuard],
        data: { roles: ['mechanic'] }
      },
      {
        path: 'mechanic/repair-list/details/:id',
        loadComponent: () => import('./components/mechanic/details/details.component').then((c) => c.DetailsComponent),
        canActivate: [AuthGuard],
        data: { roles: ['mechanic'] }
      },
      {
        path: 'typography',
        loadComponent: () => import('./demo/component/basic-component/color/color.component').then((c) => c.ColorComponent)
      },
      {
        path: 'color',
        loadComponent: () => import('./demo/component/basic-component/typography/typography.component').then((c) => c.TypographyComponent)
      },
      {
        path: 'sample-page',
        loadComponent: () => import('./demo/others/sample-page/sample-page.component').then((c) => c.SamplePageComponent)
      }
    ]
  },
  {
    path: '',
    component: GuestLayoutComponent,
    children: [
      {
        path: 'login',
        loadComponent: () => import('./components/authentication/auth-login/auth-login.component').then((c) => c.AuthLoginComponent),
        canActivate: [AuthGuard]
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./components/authentication/auth-register/auth-register.component').then((c) => c.AuthRegisterComponent)
      },
      {
        path: 'logout',
        component: LogoutComponent, // Ajoutez la route de déconnexion
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes),HttpClientModule,UnauthorizedComponent],
  exports: [RouterModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ]
})
export class AppRoutingModule {}
