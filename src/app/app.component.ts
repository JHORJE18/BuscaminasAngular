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
	 * 
	 * @param {array} arrayPiezas 
	 * @param {int} numBombas 
	 */
	colocarBombas(arrayPiezas, numBombas) {
		let arrayMezclado = []

		while (arrayPiezas.length > 0) {

			let aleatorio = Math.floor((Math.random() * arrayPiezas.length));
			arrayMezclado.push(arrayPiezas[aleatorio]);     // Crea copia
			arrayPiezas.splice(aleatorio, 1);      // Elimina del array

		}
		return arrayMezclado;
	}

	/**
	 * Metodo prepara la interfaz de la tabla
	 * @param {int} piezas Recibe el número de piezas que se mostraran
	 */
	PreparePlantilla(piezas) {
		var tableBase = document.createElement('table');
		var tbody = document.createElement('tbody');

		for (var i = 0; i < piezas; i++) {
			var fila = document.createElement('tr');

			for (var c = 0; c < piezas; c++) {
				var columna = document.createElement('td');

				fila.appendChild(columna);
			}

			tbody.appendChild(fila);
		}
		tableBase.appendChild(tbody);
		this.contenedor.nativeElement.appendChild(tableBase);
	}
}
