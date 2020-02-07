import { Component, OnInit } from "@angular/core";
import { LocationService } from '../location.service';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

declare var ol: any;
@Component({
  selector: "app-map-model",
  templateUrl: "./map-model.component.html",
  styleUrls: ["./map-model.component.css"]
})
export class MapModelComponent implements OnInit {
  latitude = 12.9716;
  longitude = 77.5946;
  destLat: number;
  destLong: number;
  kmDistance: any;
  map: any;
  vectorLayer: any;
  address: any;
  destination: any;
  choice: FormGroup;
  constructor(private location: LocationService, fb:FormBuilder) {
    this.choice = fb.group({
      enterLocation: new FormControl('')
    });
  }

  ngOnInit() {
    this.map = new ol.Map({
      target: "map",
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
    this.map.on("click", args => {
      const x = args.coordinate;
      console.log(args.coordinate);
      const lonlat = ol.proj.transform(x, "EPSG:3857", "EPSG:4326");
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
    this.source_map_point(this.latitude, this.longitude);
  }

  setCenter() {
    if(!Object.values(this.choice.value).includes('')){
     this.location.getLocationByName(this.choice.value).subscribe( data =>{
          this.SaveTableAsync(data[0]);
          this.choice.reset();
        });      
    } else {
      console.log('else part')
      this.kmDistance = this.distance(this.destLat, this.destLong);
        /* Adding line in the map*/
        var lonlat = ol.proj.fromLonLat([this.longitude, this.latitude]);
        var location2 = ol.proj.fromLonLat([this.destLong, this.destLat]);
        
        var linie2style = [
          // linestring
          new ol.style.Style({
            stroke: new ol.style.Stroke({
            color: '#000000',
            width: 2
            })
          })
          ];
                
        var linie2 = new ol.layer.Vector({
            source: new ol.source.Vector({
            features: [new ol.Feature({
              geometry: new ol.geom.LineString([lonlat, location2]),
              name: 'Line',
            })]
          })
        });
        
        linie2.setStyle(linie2style);
        this.map.addLayer(linie2);
        linie2.set('name','path');
    }
        /* end*/
        // this.reverseGeocode();
        this.location.getLocationName(this.destLong, this.destLat).subscribe( data =>{
          this.address = data.address;
          console.log(Object.values(this.address));
          this.destination = Object.values(this.address);
        });
  }

  SaveTableAsync(data){
    this.destLat = data.lat;
    this.destLong = data.lon;
    console.log(this.destLat + '' +this.destLong);

    this.add_map_point(this.destLat,this.destLong);
    this.kmDistance = this.distance(this.destLat, this.destLong);
  /* Adding line in the map*/
  var lonlat = ol.proj.fromLonLat([this.longitude, this.latitude]);
  var location2 = ol.proj.fromLonLat([this.destLong,this.destLat]);
  
  var linie2style = [
    // linestring
    new ol.style.Style({
      stroke: new ol.style.Stroke({
      color: '#000000',
      width: 2
      })
    })
    ];
          
  var linie2 = new ol.layer.Vector({
      source: new ol.source.Vector({
      features: [new ol.Feature({
        geometry: new ol.geom.LineString([lonlat, location2]),
        name: 'Line',
      })]
    })
  });
  
  linie2.setStyle(linie2style);
  this.map.addLayer(linie2);
  linie2.set('name','path');
  }
  add_map_point(lat, lng) {
    this.vectorLayer = new ol.layer.Vector({
      source: new ol.source.Vector({
        features: [
          new ol.Feature({
            geometry: new ol.geom.Point(
              ol.proj.transform(
                [parseFloat(lng), parseFloat(lat)],
                "EPSG:4326",
                "EPSG:3857"
              )
            )
          })
        ]
      }),
      style: new ol.style.Style({
        image: new ol.style.Icon({
          anchor: [0.5, 0.5],
          anchorXUnits: "fraction",
          anchorYUnits: "fraction",
          src: "https://upload.wikimedia.org/wikipedia/commons/e/ec/RedDot.svg"
        })
      })
    });

    this.map.addLayer(this.vectorLayer);
    this.vectorLayer.set("name", "selectvector");
  }

  // for calculating the distance between the points
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
    const pathToReomove = [];
    this.map.getLayers().forEach(layer => {
      if (
        layer.get("name") !== undefined &&
        layer.get("name") === "selectvector"
      ) {
        layersToRemove.push(layer);
      }
    });

    this.map.getLayers().forEach(layer => {
      if (
        layer.get("name") !== undefined &&
        layer.get("name") === "path"
      ) {
        pathToReomove.push(layer);
      }
    });


    const len = layersToRemove.length;
    // if(len > 2){
    //   for(let i = len-1; i >=2; i--){
    //     this.map.removeLayer(layersToRemove[i]);
    //   }
    // } else{
      this.map.removeLayer(layersToRemove[len - 2]);
    // }

    const len1 = pathToReomove.length;
    this.map.removeLayer(pathToReomove[len1-1]);
  }


  // for by default points in the map for source
  source_map_point(lat, lng) {
    this.vectorLayer = new ol.layer.Vector({
      source: new ol.source.Vector({
        features: [
          new ol.Feature({
            geometry: new ol.geom.Point(
              ol.proj.transform(
                [parseFloat(lng), parseFloat(lat)],
                "EPSG:4326",
                "EPSG:3857"
              )
            )
          })
        ]
      }),
      style: new ol.style.Style({
        image: new ol.style.Icon({
          anchor: [0.5, 0.5],
          anchorXUnits: "fraction",
          anchorYUnits: "fraction",
          src: "assets/green.svg"
        })
      })
    });

    this.map.addLayer(this.vectorLayer);
    this.vectorLayer.set("name", "selectvector");
  }
}
