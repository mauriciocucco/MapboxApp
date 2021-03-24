import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-mini-mapa',
  templateUrl: './mini-mapa.component.html',
  styles: [
    `
      div {
        height: 150px;
        margin: 0px;
        width: 100%;
      }
    `,
  ],
})
export class MiniMapaComponent implements AfterViewInit {
  @Input() lngLat: [number, number] = [0, 0];
  @ViewChild('mapa') divMapa!: ElementRef;

  constructor() {}

  ngAfterViewInit(): void {
    const mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement, //div con el id 'mapa'
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.lngLat, //longitud y latitud
      zoom: 13,
      interactive: false,
    });

    new mapboxgl.Marker().setLngLat(this.lngLat).addTo(mapa);
  }
}
