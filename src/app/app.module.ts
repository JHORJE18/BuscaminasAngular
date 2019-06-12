import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { GameComponent } from './components/game/game.component';
import { HeaderComponent } from './components/header/header.component';
import { PrincipalPageComponent } from './pages/principal-page/principal-page.component';
import { PiezaComponent } from './components/pieza/pieza.component';
import { GamePageComponent } from './pages/game-page/game-page.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AboutMeComponent } from './pages/about-me/about-me.component';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    HeaderComponent,
    PrincipalPageComponent,
    PiezaComponent,
    GamePageComponent,
    NotFoundComponent,
    AboutMeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
