import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent, },
  // { path: 'home', component: PollsComponent, },
  // { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
  // { path: 'polls/create', component: CreatePollComponent, canActivate: [AuthGuard] },
  // { path: 'polls', component: PollsComponent, },
  // { path: 'polls/:id', component: ViewPollComponent, },
  // { path: 'mypolls', component: MyPollsComponent, canActivate: [AuthGuard] },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(
  appRoutes,
  { useHash: false, enableTracing: false, onSameUrlNavigation: 'reload' });
