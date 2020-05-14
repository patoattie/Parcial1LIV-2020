import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from '../../servicios/config.service';
import { FavoritosService } from '../../servicios/favoritos.service';

@Component({
  selector: 'app-tabla-datos',
  templateUrl: './tabla-datos.component.html',
  styleUrls: ['./tabla-datos.component.css']
})
export class TablaDatosComponent implements OnInit {
  @Input() datos: Observable<any>;
  @Input() cols: any[];
  @Input() pagina: number;
  @Input() colImg: string;
  @Input() colDate: string;
  @Input() colLang: string;
  @Output() detalleEvent = new EventEmitter<any>();

  constructor(private config: ConfigService, private favoritos: FavoritosService) { }

  ngOnInit(): void { }

  public muestraDetalle(dato: any): void {
    this.detalleEvent.emit(dato);
  }

  public getUrlImg(img: string): string {
    return this.config.getUrlImg(img, 500);
  }

  public guardarFav(dato: any): void {
    this.favoritos.guardar(dato);
  }
}
