"use client";

import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  DirectionsRenderer,
  useLoadScript,
} from "@react-google-maps/api";
import { getLocations } from "@/services/location";

const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

const MainMap = () => {
  const [locations, setLocations] = useState([]);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });
  const [currentPosition, setCurrentPosition] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [directions, setDirections] = useState(null);
  const [showRoute, setShowRoute] = useState(false);

  console.log("selectedLocation", locations);

  useEffect(() => {
    getLocations().then((locations) => setLocations(locations));
  }, []);

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

  // Effect for calculating route
  useEffect(() => {
    if (currentPosition && selectedLocation && showRoute && isLoaded) {
      const directionsService = new window.google.maps.DirectionsService();

      directionsService.route(
        {
          origin: currentPosition,
          destination: {
            lat: +selectedLocation.lat,
            lng: +selectedLocation.lng,
          },
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setDirections(result);
          } else {
            console.error(`Error fetching directions: ${status}`);
          }
        }
      );
    }
  }, [currentPosition, selectedLocation, showRoute, isLoaded]);

  const handleLocationClose = () => {
    setSelectedLocation(null);
    setShowRoute(false);
    setDirections(null);
  };

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps...</div>;

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={14}
      center={
        currentPosition
        ||
        (locations[1] && {
          lat: +locations[0].lat,
          lng: +locations[0].lng,
        })
      }
    >
      {/* Current location marker */}
      {currentPosition && (
        <Marker
          position={currentPosition}
          icon={{
            url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
          }}
        />
      )}

      {/* Location markers */}
      {locations.map((location, idx) => (
        <Marker
          key={idx}
          position={{ lat: +location.lat, lng: +location.lng }}
          onClick={() => {
            setSelectedLocation(location);
            setShowRoute(false);
            setDirections(null);
          }}
        />
      ))}

      {/* Info window */}
      {selectedLocation && (
        <InfoWindow
          position={{ lat: +selectedLocation.lat, lng: +selectedLocation.lng }}
          onCloseClick={handleLocationClose}
        >
          <div style={{ maxWidth: "200px" }}>
            <img
              src={selectedLocation?.image || "@/assets/logo.png"}
              alt={selectedLocation.name}
              style={{ width: "100%", borderRadius: "5px" }}
            />
            <h4>{selectedLocation.name}</h4>
            {currentPosition && (
              <button
                onClick={() => setShowRoute(true)}
                style={{
                  background: "#007bff",
                  color: "#fff",
                  padding: "8px 12px",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  marginTop: "10px",
                  width: "100%",
                }}
              >
                Show Route
              </button>
            )}
          </div>
        </InfoWindow>
      )}

      {/* Route display */}
      {directions && <DirectionsRenderer directions={directions} />}
    </GoogleMap>
  );
};

export default MainMap;
