import { AboutMeComponent } from './pages/about-me/about-me.component';
import { GamePageComponent } from './pages/game-page/game-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameComponent } from './components/game/game.component';
import { PrincipalPageComponent } from './pages/principal-page/principal-page.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

const routes: Routes = [
  { path: '',                             component: PrincipalPageComponent },
  { path: 'Game',                         component: GamePageComponent },
  { path: 'NotFound',                     component: NotFoundComponent },
  { path: 'About-Me',                     component: AboutMeComponent },
  { path: '**',                           redirectTo: 'NotFound'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
