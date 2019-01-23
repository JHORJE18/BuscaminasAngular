import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';


@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	// Variables
	title = 'BuscaminasAngular';
	name = "";
	contenido: String = "";
	arrayPiezas = [];

	// Link
	@ViewChild('contenido') contenedor: ElementRef;
	@ViewChild('btnIniciar') btnIniciar: ElementRef;
	@ViewChild('configuracion') panelConfiguracion: ElementRef;

	/**
	 * Muestra la configuración inicial del juego
	 */
	MostrarConfiguracion() {
		this.btnIniciar.nativeElement.style.visibility = "hidden";
		this.panelConfiguracion.nativeElement.style.visibility = "visible";
	}

	StartGameEvent() {
		// Obtenemos valores del Nombre y la dificultad seleccionada
		// TODO: Cargar valores y no usar uno predeteminado
		var nombre = "Jorge";
		var dificultad = 1;
		var piezas;

		switch (dificultad) {
			case 0:
				// Facil
				piezas = 16;
				break;
			case 1:
				// Normal
				piezas = 25;
				break;
			case 2:
				// Dificil
				piezas = 36;
				break;
		}

		// Inicializamos Array
		var arrayPiezas = new Array(piezas);
		arrayPiezas = colocarBombas(arrayPiezas, 5);
		arrayPiezas = checkBombs(arrayPiezas, piezas);
		console.log("RESULTADO");
		console.log(arrayPiezas);

		// Oculta botón Iniciar partida
		this.btnIniciar.nativeElement.style.display = "none";

		this.PreparePlantilla(arrayPiezas);
	}

	/**
	 * Metodo prepara la interfaz de la tabla
	 * @param {array} arrayPiezas Recibe el número de piezas que se mostraran
	 */
	PreparePlantilla(arrayPiezas) {
		let cuadrado = Math.sqrt(arrayPiezas.length);

		var tableBase = document.createElement('table');
		var tbody = document.createElement('tbody');
		var numPieza = 0;

		for (var i = 0; i < cuadrado; i++) {
			var fila = document.createElement('tr');

			for (var c = 0; c < cuadrado; c++) {
				var columna = document.createElement('td');
				columna.id = "piece" + numPieza;
				if (arrayPiezas[numPieza] == -1){
					columna.textContent = "BOM";
				} else {
					columna.textContent = arrayPiezas[numPieza];
				}
				numPieza++;
				fila.appendChild(columna);
			}

			tbody.appendChild(fila);
		}
		tableBase.appendChild(tbody);
		this.contenedor.nativeElement.appendChild(tableBase);
	}
}

/**
 * Metodo realiza la colocación aleatoria de las bombas
 * @param {array} arrayPiezas 
 * @param {int} numBombas 
 */
function colocarBombas(arrayPiezas, numBombas) {

	// Generar posicones de bombas
	var posicionesbombas = [];
	for (var i = 0; i < numBombas; i++) {
		let aleatorio = -1;
		var valido = false;

		while (!valido) {
			aleatorio = Math.floor((Math.random() * arrayPiezas.length));

			if (!posicionesbombas.includes(aleatorio)) {
				valido = true;
			}
		}

		posicionesbombas.push(aleatorio);
	}

	console.log("Coloco bombas en las posiciones: " + posicionesbombas);

	// Colocar bombas
	for (var i = 0; i < posicionesbombas.length; i++) {
		arrayPiezas[posicionesbombas[i]] = -1;
	}

	return arrayPiezas;
}

/**
 * Metodo devuelve en que cordenada se encuentra una pieza
 * @param {int} numPieza Número de la pieza del puzzle
 * @param {int} totalPiezas Número total de piezzas del puzle
 * @returns {array} Número Fila x Columna-
 */
function cordenadaPieza(numPieza, totalPiezas) {
	let cuadrado = Math.sqrt(totalPiezas);

	// Calculamos la fila y la columna
	let fila = Math.round(numPieza / cuadrado);
	let columna = Math.round(numPieza % cuadrado);

	let posicion = [];
	posicion[0] = fila;   // FILA ~ Alto
	posicion[1] = columna;   // COLUMNA ~ Ancho

	return posicion;
}


/**
 * EL metodo comprueba cuantas bombas hay alrededor de cada pieza y lo registra con un numero.
 * @param piezas Array con las piezzas
 * @returns {Array} Devuelve un array de 2 dimensiones con todas los valores resultantes
 */
function checkBombs(arrayPiezas, numPiezas) {
	// Comenzamos comprobación
	let cuadrado = Math.sqrt(numPiezas);

	// Analizamos cada pieza 
	for (var i = 0 ; i < arrayPiezas.length; i++){
		var contadorBomba = 0;

		// Descartamos que sea bomba
		if (arrayPiezas[i] != -1){
			// No hay bomba bro
			
			// Izquierda
			if (arrayPiezas[(i-1)] != undefined && arrayPiezas[(i-1)] == -1){ contadorBomba++ }
			// Derecha
			if (arrayPiezas[(i+1)] != undefined && arrayPiezas[(i+1)] == -1){ contadorBomba++ }
			// Arriba
			if (arrayPiezas[(i-cuadrado)] != undefined && arrayPiezas[(i-cuadrado)] == -1){ contadorBomba++ }
			// Arriba Izquierda
			if (arrayPiezas[(i-cuadrado-1)] != undefined && arrayPiezas[(i-cuadrado-1)] == -1){ contadorBomba++ }
			// Arriba Derecha
			if (arrayPiezas[(i-cuadrado+1)] != undefined && arrayPiezas[(i-cuadrado+1)] == -1){ contadorBomba++ }
			// Abajo
			if (arrayPiezas[(i+cuadrado)] != undefined && arrayPiezas[(i+cuadrado)] == -1){ contadorBomba++ }
			// Abajo Izquierda
			if (arrayPiezas[(i+cuadrado-1)] != undefined && arrayPiezas[(i+cuadrado-1)] == -1){ contadorBomba++ }
			// Abajo Derecha
			if (arrayPiezas[(i+cuadrado+1)] != undefined && arrayPiezas[(i+cuadrado+1)] == -1){ contadorBomba++ }
		} else {
			// Es la bomba :O
			contadorBomba = -1;
		}

		arrayPiezas[i] = contadorBomba;
	}

	return arrayPiezas;
}