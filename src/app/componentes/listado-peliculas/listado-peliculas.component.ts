import { Component, OnInit } from '@angular/core';
import { Pelicula } from '../../clases/pelicula';
import { PeliculasService } from '../../servicios/peliculas.service';

@Component({
  selector: 'app-listado-peliculas',
  templateUrl: './listado-peliculas.component.html',
  styleUrls: ['./listado-peliculas.component.css']
})
export class ListadoPeliculasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
