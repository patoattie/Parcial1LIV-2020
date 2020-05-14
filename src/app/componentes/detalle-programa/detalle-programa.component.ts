import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Programa } from '../../clases/programa';
import { ProgramasService } from '../../servicios/programas.service';

@Component({
  selector: 'app-detalle-programa',
  templateUrl: './detalle-programa.component.html',
  styleUrls: ['./detalle-programa.component.css']
})
export class DetalleProgramaComponent implements OnInit, OnDestroy {
  public programa: Programa;
  private desuscribirEvent = new Subject<void>();

  constructor(
    private programas: ProgramasService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.programas.getPrograma(this.route.snapshot.paramMap.get('id'))
    .pipe(takeUntil(this.desuscribirEvent))
    .subscribe(elPrograma => this.programa = elPrograma);
  }

  ngOnDestroy(): void {
    this.desuscribirEvent.next();
    this.desuscribirEvent.complete();
  }

  public cerrarCard(): void {
    this.router.navigate(['../../Programas'], {relativeTo: this.route});
  }

  public getUrlImg(img: string): string {
    return this.programas.getUrlImg(img, 500);
  }
}
