"use client";

import {
  MapContainer,
  Popup,
  TileLayer,
  Marker,
  useMapEvents,
  LayersControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useState, useEffect } from "react";

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

// ฟังก์ชันดักจับการคลิกเพื่อย้ายหมุด (ใช้เฉพาะตอนกดสร้าง/แก้ไข)
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

type MapLandmarkProps = {
  location?: { lat: number; lng: number };
  isViewOnly?: boolean; // 🟢 เพิ่ม Prop สำหรับโหมดดูอย่างเดียว
};

const MapLandmark = ({ location, isViewOnly = false }: MapLandmarkProps) => {
  const defaultLocation: LatLag = [14, 101];

  // คำนวณหาพิกัดเริ่มต้น
  const initialCenter: LatLag = location
    ? [location.lat, location.lng]
    : defaultLocation;

  const [position, setPosition] = useState<LatLag | null>(initialCenter);

  // อัปเดตตำแหน่งหากพิกัดจากภายนอกเปลี่ยนไป (เช่น ตอนดึงข้อมูลโหลดเสร็จ)
  useEffect(() => {
    if (location) {
      setPosition([location.lat, location.lng]);
    }
  }, [location]);

  return (
    <>
      {/* ถ้าเป็นโหมดดูอย่างเดียว เปลี่ยนหัวข้อให้เหมาะสม หรือซ่อนไปเลยก็ได้ครับ */}
      <h1 className="mt-4 font-semibold">
        {isViewOnly ? "Landmark Location" : "Where are you?"}
      </h1>

      {/* ซ่อนอินพุตไว้เฉพาะตอนที่ไม่ใช่โหมด ViewOnly */}
      {!isViewOnly && (
        <>
          <input type="hidden" name="lat" value={position ? position[0] : ""} />
          <input type="hidden" name="lng" value={position ? position[1] : ""} />
        </>
      )}

      <MapContainer
        className="w-full h-[400px] rounded-lg z-0 mt-4"
        center={initialCenter}
        zoom={isViewOnly ? 13 : 7} // ถ้าดูรายละเอียด แนะนำให้ซูมเข้าไปใกล้ๆ หน่อยครับ (เช่น ซูมระดับ 13)
        scrollWheelZoom={true}
      >
        {isViewOnly ? (
          // โหมดดูอย่างเดียว: ปักหมุดนิ่งๆ จิ้มแผนที่แล้วจะไม่เกิดอะไรขึ้น
          position && <Marker position={position} icon={markerIcon} />
        ) : (
          // โหมดสร้าง/แก้ไข: สามารถจิ้มเปลี่ยนที่ได้ตามปกติ
          <LocationMarker setPosition={setPosition} position={position} />
        )}

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
