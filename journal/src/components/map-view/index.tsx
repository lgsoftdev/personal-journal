import { useEffect } from 'react';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Vector from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { fromLonLat } from 'ol/proj';
import { Style, Circle, Stroke, Fill } from 'ol/style';

interface MapViewProps {
  lat?: number;
  lng?: number;
}

const MapView = ({ lat, lng }: MapViewProps) => {
  useEffect(() => {
    const map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
    });

    const addMarker = () => {
      if (!lat || !lng) {
        return;
      }
      const layer = new Vector({
        source: new VectorSource({
          features: [
            new Feature({
              geometry: new Point(fromLonLat([lat, lng])),
            }),
          ],
        }),
        style: new Style({
          image: new Circle({
            fill: new Fill({
              color: [77, 219, 105, 0.6],
            }),
            stroke: new Stroke({
              color: [6, 125, 34, 1],
              width: 2,
            }),
            radius: 12,
          }),
        }),
      });
      map.addLayer(layer);
    };

    addMarker();

    return () => {
      map.setTarget(undefined);
    };
  }, [lat, lng]);

  return <div id="map" style={{ width: '70%', height: '600px' }} />;
};

export default MapView;
