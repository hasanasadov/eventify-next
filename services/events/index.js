"use server";

import { BASE_URL } from "@/constants";

export const getEvents = async () => {
  const res = await fetch(`${BASE_URL}/events`);
  const data = await res.json();
  return data;
};

export const getEventById = async (id) => {
  const res = await fetch(`${BASE_URL}/events/${id}`);
  const data = await res.json();
  return data;
};

export const getFavoriteEvents = async () => {
  const res = await fetch(`${BASE_URL}/favorite-events`);
  const data = await res.json();
  return data;
};

export const addFavoriteEvent = async (id) => {
  const res = await fetch(`${BASE_URL}/favorite-events`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });
  const data = await res.json();
  return data;
};
export const createEvent = async (inputData) => {
  try {
    const response = await fetch("http://localhost:8000/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error:", error);
  }
};

export const removeFavoriteEvent = async (id) => {
  const res = await fetch(`${BASE_URL}/favorite-events/${id}`, {
    method: "DELETE",
  });
  const data = await res.json();
  return data;
};
