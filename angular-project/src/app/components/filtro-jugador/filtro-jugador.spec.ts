import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroJugador } from './filtro-jugador';

describe('FiltroJugador', () => {
  let component: FiltroJugador;
  let fixture: ComponentFixture<FiltroJugador>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltroJugador]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiltroJugador);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
