"use client";

import {
  MapContainer,
  Popup,
  TileLayer,
  useMap,
  Marker,
  useMapEvents,
  LayersControl,
  LayerGroup,
  FeatureGroup,
  Rectangle,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useState } from "react";
import { Circle } from "lucide-react";

const iconUrl =
  "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png";

const markerIcon = L.icon({
  iconUrl: iconUrl,
  iconSize: [20, 30],
});

type LatLag = [number, number];

type LocationMarkerProps = {
  position: LatLag | null;
  setPosition: (position: LatLag) => void;
};

function LocationMarker({ setPosition, position }: LocationMarkerProps) {
  const map = useMapEvents({
    click(e) {
      const newLocation: LatLag = [e.latlng.lat, e.latlng.lng];

      setPosition(newLocation);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return position === null ? null : (
    <Marker position={position} icon={markerIcon}>
      <Popup>You are here</Popup>
    </Marker>
  );
}

const MapLandmark = ({
  location,
}: {
  location?: { lat: number; lng: number };
}) => {
  const defaultLocation: LatLag = [14, 101];

  const [position, setPosition] = useState<LatLag | null>(defaultLocation);

  return (
    <>
      <h1 className="mt-4 font-semibold">Where are you?</h1>
      <input type="hidden" name="lat" value={position ? position[0] : ""} />
      <input type="hidden" name="lng" value={position ? position[1] : ""} />

      <MapContainer
        className="w-full h-[400px] rounded-lg z-0 mt-4"
        center={location || defaultLocation}
        zoom={7}
        scrollWheelZoom={true}
      >
        <LocationMarker setPosition={setPosition} position={position} />

        <LayersControl>
          <LayersControl.BaseLayer name="Openstreetmap" checked>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>

          <LayersControl.BaseLayer name="ESRI Imagery">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            />
          </LayersControl.BaseLayer>
        </LayersControl>
      </MapContainer>
    </>
  );
};

export default MapLandmark;
