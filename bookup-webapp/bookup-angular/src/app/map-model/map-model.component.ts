import { Component, OnInit } from '@angular/core';

declare var ol: any;
@Component({
  selector: 'app-map-model',
  templateUrl: './map-model.component.html',
  styleUrls: ['./map-model.component.css']
})
export class MapModelComponent implements OnInit {
  latitude = 18.5204;
  longitude = 73.8567;
  destLat: number;
  destLong: number;
  kmDistance: any;
  map: any;
  vectorLayer: any;
  constructor() {}

  ngOnInit() {
    this.map = new ol.Map({
      target: 'map',
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        })
      ],
      view: new ol.View({
        center: ol.proj.fromLonLat([this.longitude, this.latitude]),
        zoom: 12
      })
    });
    this.map.on('click', args => {
      const x = args.coordinate;
      console.log(args.coordinate);
      const lonlat = ol.proj.transform(x, 'EPSG:3857', 'EPSG:4326');
      console.log(lonlat);
      const lon = lonlat[0];
      const lat = lonlat[1];
      this.add_map_point(lat, lon);
      if (this.destLat != null && this.destLong != null) {
        this.clearMapV();
      }
      this.destLat = lat;
      this.destLong = lon;
    });
    this.add_map_point(this.latitude, this.longitude);
  }

  setCenter() {
    this.kmDistance = this.distance(this.destLat, this.destLong);
  }

  add_map_point(lat, lng) {
    this.vectorLayer = new ol.layer.Vector({
      source: new ol.source.Vector({
        features: [
          new ol.Feature({
            geometry: new ol.geom.Point(
              ol.proj.transform(
                [parseFloat(lng), parseFloat(lat)],
                'EPSG:4326',
                'EPSG:3857'
              )
            )
          })
        ]
      }),
      style: new ol.style.Style({
        image: new ol.style.Icon({
          anchor: [0.5, 0.5],
          anchorXUnits: 'fraction',
          anchorYUnits: 'fraction',
          src: 'https://upload.wikimedia.org/wikipedia/commons/e/ec/RedDot.svg'
        })
      })
    });

    this.map.addLayer(this.vectorLayer);
    this.vectorLayer.set('name', 'selectvector');
  }

  distance(lat1, lon1) {
    if (lat1 === this.latitude && lon1 === this.longitude) {
      return 0;
    } else {
      const radlat1 = (Math.PI * lat1) / 180;
      const radlat2 = (Math.PI * this.latitude) / 180;
      const theta = lon1 - this.longitude;
      const radtheta = (Math.PI * theta) / 180;
      let dist =
        Math.sin(radlat1) * Math.sin(radlat2) +
        Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = (dist * 180) / Math.PI;
      dist = dist * 60 * 1.1515;
      dist = dist * 1.609344;
      return dist;
    }
  }
  clearMapV() {
    const layersToRemove = [];
    this.map.getLayers().forEach(layer => {
      if (
        layer.get('name') !== undefined &&
        layer.get('name') === 'selectvector'
      ) {
        layersToRemove.push(layer);
      }
    });

    const len = layersToRemove.length;
    this.map.removeLayer(layersToRemove[len - 2]);
  }
}
