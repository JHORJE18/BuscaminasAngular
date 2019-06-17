import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.scss']
})
export class GamePageComponent implements OnInit {

  numeroPiezas: number = 0;
  numeroBombas: number = 0;
  username: string = '';
  email: string = '';
  score: number = 0;
  play: boolean = false;
  constructor() { }

  ngOnInit() {
  }

  startGame(event: any) {
    this.numeroPiezas = event.numPiezas;
    this.numeroBombas = event.numBombas;
    this.username = event.name;
    this.email = event.email;

    if (event.start) {
      this.play = true;
    }
    console.log('Iniciar partida', event)
  }

  exitGame(event: any) {
    this.play = false;
  }
}
