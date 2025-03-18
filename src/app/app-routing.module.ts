// angular import
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Project import
import { AdminComponent } from './theme/layouts/admin-layout/admin-layout.component';
import { GuestLayoutComponent } from './theme/layouts/guest-layout/guest-layout.component';

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
        path: 'dashboard/default',
        loadComponent: () => import('./demo/dashboard/default/default.component').then((c) => c.DefaultComponent)
      },
      {
        path: 'client/take-appointment',
        loadComponent: () => import('./components/client/appointement/forms/forms.component').then((c) => c.FormsComponent)
      },
      {
        path: 'client/take-appointment/:id',
        loadComponent: () => import('./components/client/appointement/details/details.component').then((c) => c.DetailsComponent)
      },
      {
        path: 'client/vehicule',
        loadComponent: () => import('./components/client/vehicules/vehicules.component').then((c) => c.VehiculesComponent)
      },
      {
        path: 'client/progress',
        loadComponent: () => import('./components/client/progress/list/list.component').then((c) => c.ListComponent),

      },
      {
        path: 'client/progress/detail/:id', // Ajout de :id pour le paramètre dynamique
        loadComponent: () => import('./components/client/progress/details/details.component').then((c) => c.DetailsComponent),
      },
      {
        path: 'manager/statistics',
        loadComponent: () => import('./components/manager/statistics/statistics.component').then((c) => c.StatisticsComponent)
      },
      {
        path: 'manager/appointment-list',
        loadComponent: () => import('./components/manager/appointment-list/appointment-list.component').then((c) => c.AppointmentListComponent)
      },
      {
        path: 'manager/repair-list',
        loadComponent: () => import('./components/manager/repair-list/repair-list.component').then((c) => c.RepairListComponent)
      },
      {
        path: 'manager/mechanics',
        loadComponent: () => import('./components/manager/mechanics/mechanics.component').then((c) => c.MechanicsComponent)
      },
      {
        path: 'mechanic/repair-list',
        loadComponent: () => import('./components/mechanic/repair-list/repair-list.component').then((c) => c.RepairListComponent)
      },
      {
        path: 'mechanic/repair-list/details/:id',
        loadComponent: () => import('./components/mechanic/details/details.component').then((c) => c.DetailsComponent)
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
        loadComponent: () => import('./components/authentication/auth-login/auth-login.component').then((c) => c.AuthLoginComponent)
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./components/authentication/auth-register/auth-register.component').then((c) => c.AuthRegisterComponent)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
