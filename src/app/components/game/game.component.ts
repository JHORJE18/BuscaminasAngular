import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-game",
  templateUrl: "./game.component.html",
  styleUrls: ["./game.component.css"]
})
export class GameComponent implements OnInit {
  // Variables
  @Input() private piezas: number;
  @Input() private bombas: number;

  // General Game
  public arrayPiezzas: any[] = [];
  constructor() {}

  ngOnInit() {}

  private prepararTablero() {
    // Preparamos posiciones para bombas
    let posicionesBombas: number[] = this.posicionesBombas(this.piezas, this.bombas);
    let arrayPartida: number[] = this.
  }

  /**
   * Establece las posiciones para las bombas
   */
  private posicionesBombas(numPiezas: number, numBombas: number): number[] {
    var posicionesBombas: number[] = [];

    for (let i = 0; i < numBombas; i++) {
      let posicionAleatoria: number = -1;
      let valido: boolean = false;

      while (!valido) {
        posicionAleatoria = this.getRandomNumber(0, numPiezas);

        if (!posicionesBombas.includes(posicionAleatoria)) {
          valido = true;
        }
      }
    }

    // Posiciones para bombas establecidas
    console.log('Posiciones para bombas:', posicionesBombas);

    return posicionesBombas;
  }

  private getRandomNumber(min: number, max: number): number {
    return Math.random() * (max + 1 - min) + min;
  }
}
