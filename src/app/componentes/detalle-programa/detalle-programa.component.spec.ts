import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleProgramaComponent } from './detalle-programa.component';

describe('DetalleProgramaComponent', () => {
  let component: DetalleProgramaComponent;
  let fixture: ComponentFixture<DetalleProgramaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleProgramaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleProgramaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
