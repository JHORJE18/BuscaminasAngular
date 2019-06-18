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

  mostrarBandera: boolean = false;
  showNumber: boolean = false;
  pressed: boolean = false;
  styleShow: string = 'picture';
  imagenShow: string = '../../../assets/Mario/Bloque1.gif';
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
      let audio = new Audio();

      if (this.numBomba != -1) {
        this.showNumber = true;
        this.imagenShow = './assets/Mario/bloque2.png';
        audio.src = '../../../assets/Sounds/block_small.wav';
      } else {
        this.imagenShow = './assets/Mario/explosion.gif';
        audio.src = '../../../assets/Sounds/Bomb_small.mp3';
      }

      audio.load();
      audio.play();
    
      this.notificar.emit({ piece: this.numPieza, numero: this.numBomba })
    }
  }

  posibleBomba() {
    if (!this.pressed) this.mostrarBandera = true;
  }

}
