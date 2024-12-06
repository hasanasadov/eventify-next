"use client";

import React, { useEffect, useRef } from "react";

const GoogleMap = () => {
  const mapRef = useRef(null); // Ref for the map container

  useEffect(() => {
    const loadGoogleMapsAPI = () => {
      return new Promise((resolve) => {
        if (
          typeof window.google === "object" &&
          typeof window.google.maps === "object"
        ) {
          resolve();
          return;
        }

        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBTbx_7I-5Iq_bINF4e48cFLs3fEhDzMzY&libraries=places&callback=initMap`;
        script.async = true;
        script.defer = true;
        script.onload = resolve;
        document.head.appendChild(script);
      });
    };

    const initMap = () => {
      const myloc = { lat: 40.38127583822331, lng: 49.86776630483177 };

      const map = new google.maps.Map(mapRef.current, {
        zoom: 12,
        center: myloc,
      });

      new google.maps.Marker({
        position: myloc,
        map: map,
        title: "You are here",
        icon: {
          url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
          scaledSize: new google.maps.Size(50, 50),
        },
      });

      const infoWindow = new google.maps.InfoWindow();
      const directionsService = new google.maps.DirectionsService();
      const directionsRenderer = new google.maps.DirectionsRenderer();
      directionsRenderer.setMap(map);

      const fetchNearbyPlaces = (location) => {
        const service = new google.maps.places.PlacesService(map);
        const request = {
          location: location,
          radius: "500",
          type: "museum",
        };

        service.nearbySearch(request, processResults);
      };

      const processResults = (results, status, pagination) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          for (let i = 0; i < results.length; i++) {
            createMarker(results[i]);
          }

          if (pagination && pagination.hasNextPage) {
            setTimeout(() => {
              pagination.nextPage();
            }, 2000);
          }
        } else {
          console.error("Places request failed due to " + status);
        }
      };

      const createMarker = (place) => {
        const marker = new google.maps.Marker({
          position: place.geometry.location,
          map: map,
          title: place.name,
          icon: {
            url: "https://maps.google.com/mapfiles/ms/icons/green-dot.png",
            scaledSize: new google.maps.Size(50, 50),
          },
        });

        marker.addListener("click", () => {
          map.setZoom(15);
          map.setCenter(place.geometry.location);

          const infoWindowContent = `
            <div style="position: relative; width: 300px; height: 300px; padding-top: 30px;">
                <button id="show-description" style="
                    position: absolute;
                    top: 5px;
                    left: 5px;
                    padding: 5px 10px;
                    background-color: #007bff;
                    color: white;
                    border: none;
                    border-radius: 3px;
                    cursor: pointer;
                ">Show Description</button>

                <button id="show-route" style="
                    position: absolute;
                    top: 40px;
                    left: 5px;
                    padding: 5px 10px;
                    background-color: #4CAF50;
                    color: white;
                    border: none;
                    border-radius: 3px;
                    cursor: pointer;
                ">Show Route</button>

                <h3 style="margin: 0; font-size: 16px; padding-left: 10px; padding-top: 75px">${place.name}</h3>
                <p style="margin: 5px 0; font-size: 14px; padding-left: 10px;">${place.vicinity}</p>
                <div id="mini-map" style="width: 300px; height: 200px; margin-top: 10px;"></div>
            </div>
          `;

          infoWindow.setContent(infoWindowContent);
          infoWindow.open(map, marker);

          google.maps.event.addListenerOnce(infoWindow, "domready", () => {
            document
              .getElementById("show-route")
              .addEventListener("click", () => {
                drawRoute(place);
                infoWindow.close();
              });

            document
              .getElementById("show-description")
              .addEventListener("click", () => {
                console.log(`Description for ${place.name}`);
              });
          });
        });
      };

      const drawRoute = (place) => {
        const destination = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };

        const request = {
          origin: myloc,
          destination: destination,
          travelMode: "DRIVING",
        };

        directionsService.route(request, (result, status) => {
          if (status === "OK") {
            directionsRenderer.setDirections(result);
          } else {
            console.error("Directions request failed due to " + status);
          }
        });
      };

      fetchNearbyPlaces(myloc);
    };

    loadGoogleMapsAPI().then(() => {
      initMap();
    });

    return () => {
      // Clean up script
      const script = document.querySelector(
        'script[src^="https://maps.googleapis.com/maps/api/js"]'
      );
      if (script) script.remove();
    };
  }, []);

  return (
    <div
      id="map"
      ref={mapRef}
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
      }}
    />
  );
};

export default GoogleMap;
