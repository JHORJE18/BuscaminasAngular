import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-game",
  templateUrl: "./game.component.html",
  styleUrls: ["./game.component.scss"]
})
export class GameComponent implements OnInit {
  // Variables
  @Input() numPiezas: number;
  @Input() numBombas: number;
  @Input() username: string;
  @Input() puntuacion: number;
  @Output() public exit = new EventEmitter<any>();

  // General Game
  public arrayPiezzas: any[] = [];
  public cuadrado: number = 2;
  public listaCeldas: any[] = [];
  public revelado: number = 0;
  public timeGame: string = '00:00';
  constructor() { }

  ngOnInit() {
    console.log('Preparando tablero', this.username, this.puntuacion)
    this.prepararTablero()
   }

   back() {
    this.exit.emit(true)
   }

  private prepararTablero() {
    // Preparamos posiciones para bombas
    let posicionesBombas: number[] = this.posicionesBombas(this.numPiezas, this.numBombas);
    this.arrayPiezzas = this.prepararCampo(this.numPiezas, posicionesBombas);
    this.cuadrado = Math.sqrt(this.numPiezas)

    // TODO: Generar pantalla
    let numPiezaTEMP = 0;
    for (let i = 0; i < this.cuadrado ; i++) {
      let fila = [];

      for (let a = 0; a < this.cuadrado ; a++) {
        let celda = {numPieza: numPiezaTEMP, numBomba: this.arrayPiezzas[numPiezaTEMP]}
        fila.push(celda)
        numPiezaTEMP++;
      }

      this.listaCeldas.push(fila)
    }
    console.log('LISTO', this.listaCeldas)
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

  notificacion(event:any) {
    console.log('Aviso recibido de parte de la bomba '+ event.piece)
    // Era bomba ?
    if (event.numero == -1) {
      console.log('LOSER')
    } else {
      this.puntuacion += event.numero;
      
      // Comprueba si ya ha ganado
      this.revelado++;

      if (this.revelado == (this.numPiezas - this.numBombas)) alert('Has ganado!')
    }
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
