import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameComponent } from './components/game/game.component';
import { PrincipalPageComponent } from './pages/principal-page/principal-page.component';

const routes: Routes = [
  { path: '',                             component: PrincipalPageComponent },
  { path: 'Game',                         component: PrincipalPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
