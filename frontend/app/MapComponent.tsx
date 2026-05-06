"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { useEffect } from "react";

// 🔥 Auto-zoom component
function FlyToRegion({ selectedRegion }: any) {
  const map = useMap();

  useEffect(() => {
    if (selectedRegion) {
      map.flyTo([selectedRegion.lat, selectedRegion.lon], 4, {
        duration: 1.5,
      });
    }
  }, [selectedRegion, map]);

  return null;
}

export default function MapComponent({ data, selectedRegion }: any) {

  // 🔥 Safety check
  if (!data || data.length === 0) {
    return <p className="text-white p-4">Loading map...</p>;
  }

  // 🔥 Marker color logic
  const getMarkerColor = (risk: string) => {
    if (risk === "High Risk") return "red";
    if (risk === "Medium Risk") return "orange";
    return "green";
  };

  return (
    <MapContainer
      center={[20, 0]}
      zoom={2}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* 🔥 Auto Zoom */}
      <FlyToRegion selectedRegion={selectedRegion} />

      {/* 🔥 Markers */}
      {data.map((item: any, index: number) => {
        const color = getMarkerColor(item.risk_level);
        const isSelected = selectedRegion?.region === item.region;

        const icon = new L.Icon({
          iconUrl: `https://maps.google.com/mapfiles/ms/icons/${color}-dot.png`,
          iconSize: isSelected ? [45, 45] : [32, 32],
        });

        return (
          <Marker
            key={index}
            position={[item.lat, item.lon]}
            icon={icon}
          >
            <Popup>
              <div className="text-sm">
                <strong className="text-lg">{item.region}</strong><br />
                <span className="text-gray-400">Risk:</span> {item.risk_level}<br />
                <span className="text-gray-400">Score:</span> {item.risk_score}
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}