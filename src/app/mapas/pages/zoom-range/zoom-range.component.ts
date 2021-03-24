import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import * as mapboxgl from 'mapbox-gl'; //importo toda la libreria como mapboxgl

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styles: [
    `
      .mapa-container {
        height: 100%;
        width: 100%;
      }
      .row {
        background-color: white;
        border-radius: 5px;
        bottom: 50px;
        left: 50px;
        padding: 10px;
        position: fixed;
        width: 370px;
        z-index: 10000;
      }
    `,
  ],
})
export class ZoomRangeComponent implements OnInit, AfterViewInit, OnDestroy {
  mapa!: mapboxgl.Map;
  @ViewChild('mapa') divMapa!: ElementRef; //ElementRef es un envoltorio para un elemento del DOM
  zoomLevel: number = 15;
  center: [number, number] = [-56.979186404612925, -37.26838446005901];

  constructor() {
    // console.log('DIVMAPA CONSTRUCTOR: ', this.divMapa); //es undefined
  }

  ngOnInit(): void {
    //console.log('DIVMAPA ONINIT: ', this.divMapa); //es undefined
  }

  ngAfterViewInit(): void {
    //console.log('DIVMAPA AFTERVIEWINIT: ', this.divMapa); //aparece el div dentro de nativeElement

    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement, //div con la referencia local 'mapa'
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center, //longitud y latitud
      zoom: 15,
    });

    this.mapa.on('zoom', (ev) => (this.zoomLevel = this.mapa.getZoom()));

    this.mapa.on('zoomend', (ev) => {
      if (this.mapa.getZoom() > 18) {
        this.mapa.zoomTo(18);
      }
    });

    this.mapa.on('move', (ev) => {
      const { lng, lat } = ev.target.getCenter();

      this.center = [lng, lat];
    });
  }

  ngOnDestroy(): void {
    this.mapa.off('zoom', () => {}); //hay que destruir todos los listeners
    this.mapa.off('zoomend', () => {});
    this.mapa.off('move', () => {});
  }

  zoomIn() {
    this.mapa.zoomIn();
  }

  zoomOut() {
    //console.log('DIVMAPA ZOOMOUT: ', this.divMapa); //aparece el div dentro de nativeElement
    this.mapa.zoomOut();
  }

  zoomChange(zoomValue: string) {
    this.mapa.zoomTo(Number(zoomValue));
  }
}
