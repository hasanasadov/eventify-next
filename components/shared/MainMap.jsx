"use client";

import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useLoadScript,
} from "@react-google-maps/api";
import { getLocations } from "@/services/location";

const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

const MainMap = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    getLocations().then((locations) => setLocations(locations));
  }, []);

  console.log(locations);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  const [currentPosition, setCurrentPosition] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentPosition({
            lat: +position.coords.latitude,
            lng: +position.coords.longitude,
          });
        },
        () => {
          console.error("Error fetching current position");
        }
      );
    }
  }, []);

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps...</div>;

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={14}
      center={currentPosition || locations[0]}
    >
      {locations.map((location, idx) => (
        <Marker
          key={idx}
          position={{ lat: +location.lat, lng: +location.lng }}
          onClick={() => setSelectedLocation(location)}
        />
      ))}

      {selectedLocation && (
        <InfoWindow
          position={{ lat: +selectedLocation.lat, lng: +selectedLocation.lng }}
          onCloseClick={() => setSelectedLocation(null)}
        >
          <div style={{ maxWidth: "200px" }}>
            <img
              src={selectedLocation.image}
              alt={selectedLocation.name}
              style={{ width: "100%", borderRadius: "5px" }}
            />
            <h4>{selectedLocation.name}</h4>
            <p>Latitude: {+selectedLocation.lat}</p>
            <p>Longitude: {+selectedLocation.lng}</p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
};

export default MainMap;
