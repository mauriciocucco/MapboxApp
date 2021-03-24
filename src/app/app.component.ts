import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl'; //importo toda la libreria como mapboxgl
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  ngOnInit() {
    (mapboxgl as any).accessToken = environment.mapboxToken; //lo pongo acá para hacerlo general a toda la aplicación
  }
}
