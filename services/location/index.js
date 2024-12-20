"use server";

import { BASE_URL } from "@/constants";

export const getLocations = async () => {
  try {
    const res = await fetch(`${BASE_URL}/events`);
    const res2 = await fetch(`${BASE_URL}/venues`);
    const data = await res.json();
    const data2 = await res2.json();
    const locations = data.map((event) => ({
      id: event.id,
      name: event.title,
      lat: event.lat,
      lng: event.lng,
      image: event.poster_image_link,
    }));
    const locations2 = data2.map((venue) => ({
      id: venue.id,
      name: venue.name,
      lat: venue.lat,
      lng: venue.lng,
      image: venue.image,
    }));
    locations.push(...locations2);

    return locations;
  } catch (error) {
    console.log("Error:", error);
  }
};
