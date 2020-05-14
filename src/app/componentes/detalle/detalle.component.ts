import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ConfigService } from '../../servicios/config.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {
  @Input() dato: any;
  @Output() cerrarEvent = new EventEmitter<void>();

  constructor(private config: ConfigService) { }

  ngOnInit(): void {
  }

  public cerrarCard(): void {
    this.cerrarEvent.emit();
  }

  public getUrlImg(img: string): string {
    return this.config.getUrlImg(img, 500);
  }
}
