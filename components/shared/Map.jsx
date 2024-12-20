import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  DirectionsRenderer,
  useLoadScript,
} from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100%",
  height: "400px",
};

const Map = ({ imageSource, title, location }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });
  const [currentPosition, setCurrentPosition] = useState(null);
  const [directions, setDirections] = useState(null);
  const [showInfo, setShowInfo] = useState(false);
  const [routeVisible, setRouteVisible] = useState(false);

  // Get current position
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentPosition({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => {
          console.error("Error fetching current position");
        }
      );
    }
  }, []);

  useEffect(() => {
    if (currentPosition && routeVisible && isLoaded) {
      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin: currentPosition,
          destination: location && {
            lat: +location.lat,
            lng: +location.lng,
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
  }, [currentPosition, routeVisible, isLoaded, location]);

  if (!location ||
      !location.lat ||
      !location.lng ||
      Number.isNaN(+location.lat) ||
      Number.isNaN(+location.lng)
  ) {
    return null;
  }

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps...</div>;

  const destination = {
    lat: +location.lat,
    lng: +location.lng,
  };

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={15}
      center={destination}
    >
      <Marker position={destination} onClick={() => setShowInfo(true)} />

      {showInfo && (
        <InfoWindow
          position={destination}
          onCloseClick={() => setShowInfo(false)}
        >
          <div style={{ maxWidth: "200px" }}>
            <img
              src={imageSource}
              alt="Location"
              style={{ width: "100%", borderRadius: "5px" }}
            />
            <p>{title}</p>
            <button
              style={{
                background: "#007bff",
                color: "#fff",
                padding: "8px 12px",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                marginTop: "10px",
              }}
              onClick={() => setRouteVisible(true)}
            >
              Show Route
            </button>
          </div>
        </InfoWindow>
      )}

      {routeVisible && directions && (
        <DirectionsRenderer directions={directions} />
      )}
    </GoogleMap>
  );
};

export default Map;