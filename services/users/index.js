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

import axios from "axios";

export async function handleLogin(values) {
  try {
    if (!(values instanceof FormData)) {
      throw new Error("Input values must be FormData");
    }

    const response = await axios.post(`${BASE_URL}/auth/login`, values, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("response", response);

    if (response.status < 400) {
      const data = response.data;
      console.log("data", data);

      if (data.access_token) {
        localStorage.setItem("access_token", data.access_token);
      } else {
        throw new Error("Access token is missing in response");
      }

      return data;
    }

    throw new Error("Failed to login");
  } catch (error) {
    console.error("Login error:", error);

    if (error.response) {
      const message = error.response.data.message || "Failed to login";
      throw new Error(message);
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
}

export async function getCurrentUser() {
  const token = localStorage.getItem("access_token");
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
