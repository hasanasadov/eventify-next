"use server";

import { BASE_URL } from "@/constants";

export const getVenues = async () => {
  const res = await fetch(`${BASE_URL}/venues`);
  const data = await res.json();
  return data;
};
export const getVenueById = async (id) => {
  const res = await fetch(`${BASE_URL}/venues/${id}`);
  const data = await res.json();
  return data;
};

export const getFavoriteVenues = async () => {
  const res = await fetch(`${BASE_URL}/favorite-venues`);
  const data = await res.json();
  return data;
};

export const addFavoriteVenue = async (id) => {
  const res = await fetch(`${BASE_URL}/favorite-venues`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });
  const data = await res.json();
  return data;
};

export const removeFavoriteVenue = async (id) => {
  const res = await fetch(`${BASE_URL}/favorite-venues/${id}`, {
    method: "DELETE",
  });
  const data = await res.json();
  return data;
};

export const searchVenues = async (searchText) => {
  const res = await fetch(`${BASE_URL}/venues/search/${searchText}`);

  const data = await res.json();
  return data;
};

export async function getVenueComments(id) {
  try {
    const response = await fetch(`${BASE_URL}/venues/${id}/comment`);
    const data = await response.json();
    if (!response.ok) {
      return [];
    }
    return data || [];
  } catch (error) {
    console.error("Error:", error);
  }
}
