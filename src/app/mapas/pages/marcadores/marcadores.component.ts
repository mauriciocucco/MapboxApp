import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl'; //importo toda la libreria como mapboxgl

interface ColorfulMarker {
  color: string;
  marker?: mapboxgl.Marker;
  center?: [number, number];
}

@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styles: [
    `
      li {
        cursor: pointer;
      }
      .mapa-container {
        height: 100%;
        width: 100%;
      }
      .list-group {
        position: fixed;
        right: 20px;
        top: 20px;
        z-index: 10000;
      }
    `,
  ],
})
export class MarcadoresComponent implements AfterViewInit {
  mapa!: mapboxgl.Map;
  @ViewChild('mapa') divMapa!: ElementRef;
  zoomLevel: number = 15;
  center: [number, number] = [-56.979186404612925, -37.26838446005901];
  markers: ColorfulMarker[] = [];

  constructor() {}

  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement, //div con la referencia local 'mapa'
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center, //longitud y latitud
      zoom: 15,
    });

    // const markerDiv: HTMLElement = document.createElement('div');
    // markerDiv.innerHTML = 'Hola Mundo';

    // const marker = new mapboxgl.Marker({
    //   element: markerDiv,
    // })
    //   .setLngLat(this.center)
    //   .addTo(this.mapa);
    this.readMarkers();
  }

  agregarMarker() {
    const color = '#xxxxxx'.replace(/x/g, (
      y //color hexadecimal aleatorio
    ) => ((Math.random() * 16) | 0).toString(16));

    const newMarker = new mapboxgl.Marker({
      draggable: true,
      color,
    })
      .setLngLat(this.center)
      .addTo(this.mapa);

    this.markers.push({ color, marker: newMarker });
    this.saveMarkers();

    newMarker.on('dragend', () => {
      this.saveMarkers();
    });
  }

  goMarker(marker: mapboxgl.Marker) {
    this.mapa.flyTo({
      center: marker!.getLngLat(),
    });
  }

  saveMarkers() {
    const simpleMarkers: ColorfulMarker[] = this.markers.map((m) => {
      const color = m.color;
      const { lng, lat } = m.marker!.getLngLat();

      return { color, center: [lng, lat] };
    });

    localStorage.setItem('markers', JSON.stringify(simpleMarkers));
  }

  readMarkers() {
    if (!localStorage.getItem('markers')) {
      return;
    }

    const savedMarkers: ColorfulMarker[] = JSON.parse(
      localStorage.getItem('markers')!
    );

    savedMarkers.forEach((marker) => {
      const newMarker = new mapboxgl.Marker({
        draggable: true,
        color: marker.color,
      })
        .setLngLat(marker.center!)
        .addTo(this.mapa);

      this.markers.push({
        marker: newMarker,
        color: marker.color,
      });

      newMarker.on('dragend', () => {
        this.saveMarkers();
      });
    });
  }

  deleteMarker(i: number) {
    this.markers[i].marker?.remove();
    this.markers.splice(i, 1);
    this.saveMarkers();
  }
}
