import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-game",
  templateUrl: "./game.component.html",
  styleUrls: ["./game.component.css"]
})
export class GameComponent implements OnInit {
  // Variables
  @Input() private numPiezas: number;
  @Input() private numBombas: number;

  // General Game
  public arrayPiezzas: any[] = [];
  constructor() { }

  ngOnInit() {
    this.prepararTablero()
   }

  private prepararTablero() {
    // Preparamos posiciones para bombas
    let posicionesBombas: number[] = this.posicionesBombas(this.numPiezas, this.numBombas);
    this.arrayPiezzas = this.prepararCampo(this.numPiezas, posicionesBombas);

    // TODO: Generar pantalla
  }

  /**
   * Obtiene las posiciones donde se colocaran las bombas
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

      posicionesBombas.push(posicionAleatoria);
    }

    // Posiciones para bombas establecidas
    console.log('Posiciones para bombas:', posicionesBombas);

    return posicionesBombas;
  }

  /**
   * 
   * @param numPiezas 
   * @param posicionesBombas 
   */
  private prepararCampo(numPiezas: number, posicionesBombas: number[]) {
    let tablero: number[] = new Array(numPiezas);

    // Coloca bombas
    for (let posicion of posicionesBombas) {
      tablero[posicion] = -1;
    }

    let cuadrado: number = Math.sqrt(numPiezas)

    // Analisis pieza
    for (let i = 0; i < numPiezas; i++) {
      let contadorBomba = 0;

      // Descartamos que sea una bomba
      if (tablero[i] != -1) {
        // No es bomba
        var izquierda = true, derecha = true, arriba = true, abajo = true;

        /* ANALISIS DE LIMITE */

        // Habilitamos izquierda ?
        if (Math.floor(i / cuadrado) != Math.floor((i - 1) / cuadrado)) {
          izquierda = false;
        }

        // Habilitamos derecha ?
        if (Math.floor(i / cuadrado) != Math.floor((i + 1) / cuadrado)) {
          derecha = false;
        }

        // Habilitamos arriba ?
        if (i - cuadrado == undefined) {
          arriba = false;
        }

        // Habilitamos abajo ?
        if (i + cuadrado == undefined) {
          abajo = false
        }

        /* FIN ANALISIS LIMITE */

        /* CHECK DIRECCIONES HABILITADAS */

        				// Izquierda
				if (izquierda && tablero[(i - 1)] == -1) { contadorBomba++ }
				// Derecha
				if (derecha && tablero[(i + 1)] == -1) { contadorBomba++ }
				// Arriba
				if (arriba && tablero[(i - cuadrado)] == -1) { contadorBomba++ }
				// Arriba Izquierda
				if (arriba && izquierda && tablero[(i - cuadrado - 1)] == -1) { contadorBomba++ }
				// Arriba Derecha
				if (arriba && derecha && tablero[(i - cuadrado + 1)] == -1) { contadorBomba++ }
				// Abajo
				if (abajo && tablero[(i + cuadrado)] == -1) { contadorBomba++ }
				// Abajo Izquierda
				if (abajo && izquierda && tablero[(i + cuadrado - 1)] == -1) { contadorBomba++ }
				// Abajo Derecha
				if (abajo && derecha && tablero[(i + cuadrado + 1)] == -1) { contadorBomba++ }

        /* FIN CHECK DIRECCIONES HABILITADAS */

      } else {
        // Es una bomba :O
        contadorBomba = -1;
      }

      tablero[i] = contadorBomba;
    }

    console.log('Checkeo bombas finalizado', tablero);
    return tablero;
  }

  /**
   * Obtiene un número aleatorio con mínimo y máximo
   * @param {number} min Número mínimo
   * @param {number} max Número máximo
   */
  private getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max + 1 - min) + min);
  }
}
