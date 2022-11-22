import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {
  redirectLoggedInTo,
  redirectUnauthorizedTo,
  canActivate,
} from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo([""])
const redirectLoggedInToHome = () => redirectLoggedInTo(['home'])

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule), 
      ...canActivate(redirectLoggedInToHome)
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
      ...canActivate(redirectUnauthorizedToLogin)
  },
  // {
  //   path: '**',
  //   redirectTo: '',
  //   pathMatch: 'full',
  // },
  {
    path: 'create',
    loadChildren: () => import('./create/create.module').then( m => m.CreatePageModule)
  },
  {
    path: 'detail/:id',
    loadChildren: () => import('./detail/detail.module').then( m => m.DetailPageModule)
  },

  
  
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
