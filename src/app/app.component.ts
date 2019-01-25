import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

let arrayPiezzasGlobal;
let numPiezasDescubiertas;
let scorePlayer = 0;

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	// Variables
	title = 'BuscaminasAngular';
	namePlayer = "Sin nombre";
	scorePlayer = "0";
	timePlayer = "00:00";
	dificultadPlayer = 0;
	contenido: String = "";
	arrayPiezas = [];

	// Link
	@ViewChild('contenido') contenedor: ElementRef;
	@ViewChild('btnIniciar') btnIniciar: ElementRef;
	@ViewChild('configuracion') panelConfiguracion: ElementRef;
	@ViewChild('botonera') panelBotonera: ElementRef;

	/**
	 * Muestra la configuración inicial del juego
	 */
	MostrarConfiguracion() {
		this.btnIniciar.nativeElement.style.visibility = "hidden";
		this.panelConfiguracion.nativeElement.style.visibility = "visible";
	}

	StartGameEvent(dificultad: number) {
		this.panelConfiguracion.nativeElement.style.visibility = "hidden";
		this.panelBotonera.nativeElement.style.visibility = "visible";

		var piezas;
		var bombas;

		switch (dificultad) {
			case 0:
				// Facil
				piezas = 25;
				bombas = 5;
				break;
			case 1:
				// Normal
				piezas = 49;
				bombas = 7;
				break;
			case 2:
				// Dificil
				piezas = 64;
				bombas = 10;
				break;
		}

		// Inicializamos Array
		var arrayPiezas = new Array(piezas);
		arrayPiezas = this.colocarBombas(arrayPiezas, bombas);
		arrayPiezas = this.checkBombs(arrayPiezas, piezas);
		console.log("RESULTADO");
		console.log(arrayPiezas);

		// Guardamos partida actual en Global (Para acceder desde el Controladorcelda)
		arrayPiezzasGlobal = arrayPiezas;

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
				columna.addEventListener("click", ControladorCelda);
				columna.style.backgroundImage = "url(\"assets/Mario/Bloque1.gif\")"
				columna.style.backgroundSize = "contain";

				numPieza++;
				fila.appendChild(columna);
			}

			tbody.appendChild(fila);
		}
		tableBase.appendChild(tbody);
		this.contenedor.nativeElement.appendChild(tableBase);
	}

	/**
	 * Metodo realiza la colocación aleatoria de las bombas
	 * @param {array} arrayPiezas 
	 * @param {int} numBombas 
	 */
	colocarBombas(arrayPiezas, numBombas) {

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
	cordenadaPieza(numPieza, totalPiezas) {
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
	checkBombs(arrayPiezas, numPiezas) {
		// Comenzamos comprobación
		let cuadrado = Math.sqrt(numPiezas);

		// Analizamos cada pieza 
		for (var i = 0; i < arrayPiezas.length; i++) {
			var contadorBomba = 0;

			// Descartamos que sea bomba
			if (arrayPiezas[i] != -1) {
				// No hay bomba bro
				var izquierda: boolean = true, derecha: boolean = true, arriba: boolean = true, abajo: boolean = true;

				// Habilitamos izquierda ?
				if (Math.floor(i / cuadrado) != Math.floor((i - 1) / cuadrado)) {
					izquierda = false;
					console.log("#" + i + " Izquierda desactivado\n" + Math.floor(i / cuadrado) + " vs " + Math.floor((i - 1) / cuadrado));
				}

				// Habilitamos derecha ?
				if (Math.floor(i / cuadrado) != Math.floor((i + 1) / cuadrado)) {
					derecha = false;
					console.log("#" + i + " Derecha desactivado\n" + Math.floor(i / cuadrado) + " vs " + Math.floor((i + 1) / cuadrado));
				}

				// Habilitamos arriba ?
				if ((i - cuadrado) == undefined) {
					arriba = false;
					console.log("#" + i + " Arriba desactivado");
				}

				// Habilitamos abajo ?
				if ((i + cuadrado) == undefined) {
					abajo = false;
					console.log("#" + i + " Abajo desactivado");
				}

				// Checkea en todas las direcciones habilitadas

				// Izquierda
				if (izquierda && arrayPiezas[(i - 1)] == -1) { contadorBomba++ }
				// Derecha
				if (derecha && arrayPiezas[(i + 1)] == -1) { contadorBomba++ }
				// Arriba
				if (arriba && arrayPiezas[(i - cuadrado)] == -1) { contadorBomba++ }
				// Arriba Izquierda
				if (arriba && izquierda && arrayPiezas[(i - cuadrado - 1)] == -1) { contadorBomba++ }
				// Arriba Derecha
				if (arriba && derecha && arrayPiezas[(i - cuadrado + 1)] == -1) { contadorBomba++ }
				// Abajo
				if (abajo && arrayPiezas[(i + cuadrado)] == -1) { contadorBomba++ }
				// Abajo Izquierda
				if (abajo && izquierda && arrayPiezas[(i + cuadrado - 1)] == -1) { contadorBomba++ }
				// Abajo Derecha
				if (abajo && derecha && arrayPiezas[(i + cuadrado + 1)] == -1) { contadorBomba++ }
			} else {
				// Es la bomba :O
				contadorBomba = -1;
			}

			arrayPiezas[i] = contadorBomba;
		}

		return arrayPiezas;
	}
}

/**
 * Controlador de la piezza con sus metodos y comprobaciones
 */
function ControladorCelda() {
	console.log(this.id);
	// Obtenemos número de la pieza
	let numeroPieza = this.id.replace("piece", "");

	// BOMBA
	let listadoBombas = [];

	// Posiciones de las bombas
	for (let b = 0; b < arrayPiezzasGlobal.length; b++) {
		// Sacar las piezas donde hay bomba realmente
		if (arrayPiezzasGlobal[b] == -1) {
			listadoBombas.push(b);
		}
	}

	// Realizamos comprobaciones
	if (arrayPiezzasGlobal[numeroPieza] == -1) {
		// Aplicar bomba a las piezas
		for (let a = 0; a < listadoBombas.length; a++) {
			document.getElementById("piece" + listadoBombas[a]).style.backgroundImage = "url(\"assets/Mario/explosion.gif\")";
			document.getElementById("piece" + listadoBombas[a]).style.backgroundSize = "contain";
		}

		// Eliminar todos los click
		let celdas = document.getElementsByTagName("td");
		for (let i = 0; i < celdas.length; i++) {
			celdas[i].removeEventListener("click", ControladorCelda);
		}

		// Fin
		document.getElementsByClassName("neon")[0].textContent = "Has";
		document.getElementsByClassName("flux")[0].textContent = "Perdido";
	} else {
		scorePlayer+= arrayPiezzasGlobal[numeroPieza] * 2;
		document.getElementById("puntuacion").textContent = "Puntuación: " + scorePlayer;	

		this.textContent = arrayPiezzasGlobal[numeroPieza];
		this.style.backgroundImage = "url(\"assets/Mario/bloque2.png\")"
		this.style.backgroundSize = "contain";
		this.style.fontSize = "2em";

		// Comprobamos que ha ganado
		if (numPiezasDescubiertas == (arrayPiezzasGlobal.length - listadoBombas.length)){
			// Ya ha ganado
			document.getElementsByClassName("neon")[0].textContent = "Has";
			document.getElementsByClassName("flux")[0].textContent = "Ganado";	
			document.getElementById("puntuacion").innerHTML = "Fin | " + scorePlayer;	
		}
	}

	// Quitamos propiedad click
	this.removeEventListener("click", ControladorCelda);
	this.removeEventListener("contextmenu", ControladorCelda);
}