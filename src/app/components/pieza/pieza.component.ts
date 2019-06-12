import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pieza',
  templateUrl: './pieza.component.html',
  styleUrls: ['./pieza.component.scss']
})
export class PiezaComponent implements OnInit {

  @Input() public numBomba: number // Numero de bombas al rededor ( -1 Si es bomba )
  @Input() public numPieza: number
  @Output() public notificar = new EventEmitter<any>();

  private mostrarBandera: boolean = false;
  private showNumber: boolean = false;
  private pressed: boolean = false;
  private styleShow: string = 'picture';
  private imagenShow: string = '../../../assets/Mario/Bloque1.gif';
  constructor() { }

  ngOnInit() {
    if (this.numBomba == -1) {
      this.imagenShow = './assets/Mario/Bloque1.gif';
    }
  }

  revelarPieza() {
    if (!this.pressed) {
      this.mostrarBandera = false;
      this.pressed = true;
      this.styleShow = 'picture_selected';

      if (this.numBomba != -1) {
        this.showNumber = true;
        this.imagenShow = './assets/Mario/bloque2.png';
      } else {
        this.imagenShow = './assets/Mario/explosion.gif';
      }

      this.notificar.emit({ piece: this.numPieza, numero: this.numBomba })
    }
  }

  posibleBomba() {
    if (!this.pressed) this.mostrarBandera = true;
  }

}
