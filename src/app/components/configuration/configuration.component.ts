import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit {

  public name: String = '';
  public email: String = '';
  private numPiezas: Number = 0;
  private numBombas: Number = 0;
  btnFacilClass: String = 'activated';
  btnMedioClass: String = 'no-activated';
  btnDificilClass: String = 'no-activated';
  @Output() public start = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }

  iniciarPartida() {
    this.start.emit({ start: true, name: this.name, email: this.email, numPiezas: this.numPiezas, numBombas: this.numBombas })
  }

  setDificultad(valor: number) {
    switch (valor) {
      case 1:
        // Facil
        this.numBombas = 5;
        this.numPiezas = 25;
        this.btnFacilClass = 'bounceIn activated'
        this.btnMedioClass = 'no-activated'
        this.btnDificilClass = 'no-activated'
        break;
      case 2:
        // Medio
        this.numBombas = 7;
        this.numPiezas = 49;
        this.btnFacilClass = 'no-activated'
        this.btnMedioClass = 'bounceIn activated'
        this.btnDificilClass = 'no-activated'
        break;
      case 3:
        // Dificil
        this.numBombas = 10;
        this.numPiezas = 64;
        this.btnFacilClass = 'no-activated'
        this.btnMedioClass = 'no-activated'
        this.btnDificilClass = 'bounceIn activated'
        break;
    }
  }
}