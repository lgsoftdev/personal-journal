import { useEffect, useLayoutEffect, useMemo, useRef } from 'react';
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
import VectorLayer from 'ol/layer/Vector';
import Select from 'ol/interaction/Select';
import { pointerMove } from 'ol/events/condition';
import Overlay from 'ol/Overlay';
import { Coordinate } from 'ol/coordinate';

interface MapViewProps {
  lat?: number;
  lng?: number;
  tooltipText?: string;
}

const MapView = ({ lat, lng, tooltipText }: MapViewProps) => {
  const mapRef = useRef<Map | undefined>(undefined);
  const infoRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    infoRef.current =
      (document.getElementById('info') as HTMLDivElement) || null;
  }, []);

  useEffect(() => {
    mapRef.current = new Map({
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

    return () => {
      if (mapRef.current) {
        mapRef.current.setTarget(undefined);
      }
    };
  }, [lat, lng]);

  useEffect(() => {
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
              color: 'dodgerblue',
            }),
            stroke: new Stroke({
              color: 'white',
              width: 2,
            }),
            radius: 10,
          }),
        }),
      });

      if (mapRef.current) {
        const select = new Select({
          condition: pointerMove,
          layers: [layer],
        });
        mapRef.current.addLayer(layer);
        mapRef.current.addInteraction(select);

        const overlay = new Overlay({
          element: infoRef.current || undefined,
          autoPan: true,
        });
        mapRef.current.addOverlay(overlay);

        select.on('select', function (event) {
          if (infoRef.current) {
            infoRef.current.innerHTML = '';
          }

          const features = event.target.getFeatures().getArray();
          features.map(
            (feature: {
              getGeometry: () => {
                (): unknown;
                getCoordinates: { (): Coordinate };
              };
            }) => {
              if (infoRef.current) {
                // Update tooltip content and position
                overlay.setPosition(feature.getGeometry().getCoordinates());
                infoRef.current.innerHTML = tooltipText || '';
              }
            }
          );
        });
      }
    };

    if (mapRef.current) {
      const layers = mapRef.current.getLayers();
      const vectorLayers = layers
        .getArray()
        .filter((layer) => layer instanceof VectorLayer);
      vectorLayers.map((layer) => {
        mapRef.current?.removeLayer(layer);
      });
      addMarker();
    }
  }, [lat, lng, tooltipText]);

  return (
    <div id="map" style={{ width: '70%', height: '600px' }}>
      <div
        id="info"
        ref={infoRef}
        style={{
          marginTop: -30,
          color: 'red',
          fontWeight: 'bold',
        }}
      ></div>
    </div>
  );
};

export default MapView;
