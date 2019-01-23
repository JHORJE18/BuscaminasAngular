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
	arrayPiezas = [[], []]

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
		var name = prompt("Introduce tu nombre");
		var piezas = prompt("Introduce el número de piezas");

		// Oculta botón Iniciar partida
		this.btnIniciar.nativeElement.style.display = "none";

		this.PreparePlantilla(piezas);
	}

	/**
	 * Metodo prepara la interfaz de la tabla
	 * @param {int} piezas Recibe el número de piezas que se mostraran
	 */
	PreparePlantilla(piezas) {
		let cuadrado = Math.sqrt(piezas);

		var tableBase = document.createElement('table');
		var tbody = document.createElement('tbody');
		var numPieza = 0;

		for (var i = 0; i < cuadrado; i++) {
			var fila = document.createElement('tr');

			for (var c = 0; c < cuadrado; c++) {
				var columna = document.createElement('td');
				columna.id = "piece" + numPieza;

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

	// Colocar bombas
	for (var i = 0; i < posicionesbombas.length; i++) {
		var cordenadabomba = cordenadaPieza(posicionesbombas[i],arrayPiezas.length)

		arrayPiezas[cordenadabomba[0]][cordenadabomba[1]] = -1;
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
 * 
 * @param piezas (el array bidimensional que contiene las casillas donde hay una bomba)
 * EL metodo comprueba cuantas bombas hay alrededor de cada pieza y lo registra con un numero.
 */
function checkBombs (piezas){
	//He tardado como 6-7 minutos, si esto funciona me vuelvo creyente :3

	for(var i=0; i<piezas.lenght; i++){

		for(var x=0; x<piezas[i].lenght; x++){
			var counter;

			if(piezas[i][x] != -1){
				if(piezas[i-1][x] != undefined && piezas[i-1][x] == -1){counter++;}
				if(piezas[i-1][x+1] != undefined && piezas[i-1][x+1] == -1){counter++;}
				if(piezas[i][x+1] != undefined && piezas[i][x+1] == -1){counter++;}
				if(piezas[i+1][x+1] != undefined && piezas[i+1][x+1] == -1){counter++;}
				if(piezas[i+1][x] != undefined && piezas[i+1][x] == -1){counter++;}
				if(piezas[i+1][x-1] != undefined && piezas[i+1][x-1] == -1){counter++;}
				if(piezas[i][x-1] != undefined && piezas[i][x-1] == -1){counter++;}
				if(piezas[i-1][x-1] != undefined && piezas[i-1][x-1] == -1){counter++;}
			}else{

				counter = -1

			}

			piezas[i][x] = counter;
		}
	

	}

	return piezas;

}