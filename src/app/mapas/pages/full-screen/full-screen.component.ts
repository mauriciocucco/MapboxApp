import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl'; //importo toda la libreria como mapboxgl

@Component({
  selector: 'app-full-screnn',
  templateUrl: './full-screen.component.html',
  styles: [
    `
      #mapa {
        height: 100%;
        width: 100%;
      }
    `,
  ],
})
export class FullScreenComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    const map = new mapboxgl.Map({
      container: 'mapa', //div con el id 'mapa'
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-56.979186404612925, -37.26838446005901], //longitud y latitud
      zoom: 15,
    });
  }
}
