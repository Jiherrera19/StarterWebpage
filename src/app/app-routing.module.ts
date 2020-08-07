import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'gumby', loadChildren: () => import('./gumby/gumby.module').then(m => m.GumbyModule) },
  { path: 'landing-page', loadChildren: () => import('./landing-page/landing-page.module').then(m => m.LandingPageModule) },
  { path: '', redirectTo: 'landing-page', pathMatch: 'full' },
  { path: 'meme-generator', loadChildren: () => import('./meme-generator/meme-generator.module').then(m => m.MemeGeneratorModule) },
  { path: 'cs-mit', loadChildren: () => import('./cs-mit/cs-mit.module').then(m => m.CsMitModule) }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
