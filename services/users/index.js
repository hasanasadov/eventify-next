"use server";

import { BASE_URL } from "@/constants";

export async function handleRegister(values) {
  try {
    console.log("values", values);
    const response = await fetch(`${BASE_URL}/auth/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    if (response.status === 201) {
      return response.json();
    }
    throw new Error("Failed to register");
  } catch (error) {
    console.error(error);
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
