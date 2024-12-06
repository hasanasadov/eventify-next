"use server";

import { BASE_URL } from "@/constants";
import axios from "axios";

export async function handleRegister(values) {
  try {
    console.log("values", values);
    const response = await axios.post(`${BASE_URL}/auth`, values, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("response", response.json());
    if (response?.detail) {
      console.log("response.detail", response.detail);
      return response.json();
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function handleLogin(values) {
  try {
    console.log("values", values);
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    if (response.status === 200) {
      return response.json();
    }
    throw new Error("Failed to login");
  } catch (error) {
    console.error(error);
  }
}

export async function getCurrentUser() {
  // const token = localStorage.getItem("access_token");
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJtdXJhZCIsImlkIjoyOCwiZXhwIjoxNzMyOTQ3MDMwfQ.TZ6vMWR6dXzFbbKkd4XEN6V6GmdsMqH-4Ii7isjbWpM";
  try {
    const response = await fetch(`${BASE_URL}/auth/user`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (response.status < 400) {
      console.log("response", response);
      //localStorage.setItem("access_token", "eyJhbGciOiJI...");

      return response.json();
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}
