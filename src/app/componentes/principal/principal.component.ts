import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Peliculas } from '../../clases/peliculas';
import { PeliculasService } from '../../servicios/peliculas.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit, OnDestroy {
 public status: any = {
    isFirstOpen: true,
    isFirstDisabled: false
  };
  public peliculas: Peliculas;
  public items: MenuItem[];
  public listaPeliculas = true;
  private subscriptions: Subscription[] = [];
  public pagina = 1;

  constructor(
    public authService: AuthService,
    public peliculasService: PeliculasService
    ) { }

  ngOnInit() {
    this.subscriptions.push(
      this.peliculasService.getPeliculas(this.pagina)
      .subscribe((peliculas) =>
      {
// console.log(peliculas);
        this.peliculas = peliculas;
        // Elimina los duplicados que se generan al suscribir después de desloguearse, no lo pude resolver de una forma más elegante
        this.peliculas.results = this.peliculas.results.filter((test, index, array) =>
          index === array.findIndex((findTest) =>
           findTest.id === test.id
          )
        );
      })
    );

    this.items = [
      {label: 'Peliculas', command: () => {this.mostrarListaProductos(); }},
    ];
  }

  ngOnDestroy()
  {
    this.subscriptions.forEach((unaSubscription) =>
    {
      unaSubscription.unsubscribe();
    });
    /*this.usuarios = null;
    this.sucursales = null;
    this.peliculas = null;*/
  }

  private mostrarListaProductos(): void
  {
    this.listaPeliculas = true;
  }
}
