"use client";

import { MapContainer, Popup, TileLayer, useMap, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const iconUrl =
  "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png";
const markerIcon = L.icon({
  iconUrl: iconUrl,
  iconSize: [20, 30],
});

function MapLandmark() {
  return (
    <MapContainer
      className="w-full h-[400px] rounded-lg z-0 mt-4"
      center={[13, 100]}
      zoom={13}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={[13, 100]} icon={markerIcon}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export default MapLandmark;
