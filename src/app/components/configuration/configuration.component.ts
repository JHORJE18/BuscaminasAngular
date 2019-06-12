import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MDCTextField } from '@material/textfield';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit {

  private name: string = "";
  private email: string = "";
  private numPiezas: number = 0;
  private numBombas: number = 0;
  @Output() public start = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }

  iniciarPartida() {
    this.numPiezas = 25;
    this.numBombas = 5;
    this.start.emit({ start: true, name: this.name, email: this.email, numPiezas: this.numPiezas, numBombas: this.numBombas })
  }
}