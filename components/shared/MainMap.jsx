"use client";

import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  DirectionsRenderer,
  useLoadScript,
} from "@react-google-maps/api";
import { getLocations } from "@/actions/location";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { Button } from "../ui/button";
import IsError from "./IsError";

const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

const MainMap = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });
  const [currentPosition, setCurrentPosition] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [directions, setDirections] = useState(null);
  const [showRoute, setShowRoute] = useState(false);

  // console.log("selectedLocation", locations);

  const { data: locations } = useQuery({
    queryKey: [QUERY_KEYS.LOCATIONS],
    queryFn: getLocations,
  });

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
          // console.error("Error fetching current position");
          setCurrentPosition(null);
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
            console.log(`Error fetching directions: ${status}`);
          }
        }
      );
    }
  }, [currentPosition, selectedLocation, showRoute, isLoaded]);

  const handleLocationClose = () => {
    setSelectedLocation(null);
    setShowRoute(true);
    // setDirections(null);
  };

  if (loadError) return <IsError text="Map" />;
  if (!isLoaded || !locations)
    return (
      <div className="w-full h-full animate-pulse bg-black bg-opacity-40 flex justify-center items-center">
        <p className="animate-ping">Loading Maps...</p>
      </div>
    );

  // console.log("locations", locations);
  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={12}
      center={
        currentPosition ||
        (locations[0] && {
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
      {locations?.map((location, idx) => (
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
          position={{
            lat: +selectedLocation.lat,
            lng: +selectedLocation.lng,
          }}
          onCloseClick={handleLocationClose}
          options={{
            maxWidth: 200,
          }}
        >
          <div className="flex flex-col gap-2">
            <h2 className="font-bold text-center text-lg">
              {selectedLocation.title}
            </h2>
            <img
              className="glass"
              src={selectedLocation?.imageURL || "@/assets/logo.png"}
              alt={selectedLocation.title}
            />
            {currentPosition && (
              <Button variant="glass" onClick={() => setShowRoute(true)}>
                Show Route
              </Button>
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
