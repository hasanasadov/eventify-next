import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  DirectionsRenderer,
  useLoadScript,
} from "@react-google-maps/api";
import { Button } from "../ui/button";
import IsError from "./IsError";

const mapContainerStyle = {
  width: "100%",
  height: "400px",
};

const Map = ({ location }) => {
  const title = location?.title || "No Title";
  const imageSource = location?.imageURL || "";
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
          console.log("Error fetching current position");
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
            console.log(`Error fetching directions: ${status}`);
          }
        }
      );
    }
  }, [currentPosition, routeVisible, isLoaded, location]);

  if (
    !location ||
    !location.lat ||
    !location.lng ||
    Number.isNaN(+location.lat) ||
    Number.isNaN(+location.lng)
  ) {
    return null;
  }

  if (loadError) return <IsError text="Map" />;
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
          position={{
            lat: +location.lat,
            lng: +location.lng,
          }}
          options={{
            maxWidth: 200,
          }}
        >
          <div className="flex flex-col gap-2">
            <h2 className="font-bold text-center text-lg">{title}</h2>
            <img
              className="glass"
              src={imageSource || "@/assets/logo.png"}
              alt={title}
            />
            {currentPosition && (
              <Button variant="glass" onClick={() => setRouteVisible(true)}>
                Show Route
              </Button>
            )}
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
