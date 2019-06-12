import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.scss']
})
export class GamePageComponent implements OnInit {

  private numeroPiezas: number = 0;
  private numeroBombas: number = 0;
  private play: boolean = false;
  constructor() { }

  ngOnInit() {
  }

  startGame(event: any) {
    this.numeroPiezas = event.numPiezas;
    this.numeroBombas = event.numBombas;
    if (event.start) {
      this.play = true;
    }
    console.log('Iniciar partida', event)
  }

  exitGame(event: any) {
    this.play = false;
  }
}
