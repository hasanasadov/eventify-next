"use server";

import { BASE_URL } from "@/constants";

export async function handleRegister(values) {
  try {
    console.log("values", values);
    const response = await fetch(`${BASE_URL}/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    if (response.status < 400) {
      return {
        message: response.message,
        success: true,
      };
    }
    const data = await response.json();
    return {
      success: false,
      detail: data?.detail,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function handleLogin(values) {
  try {
    if (!(values instanceof FormData)) {
      throw new Error("Input values must be FormData");
    }

    const response = await fetch(`${BASE_URL}/auth/token`, {
      method: "POST",
      body: values,
    });
    const data = await response.json();
    if (response.status < 400) {
      return {
        success: true,
        message: "Login successful",
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
      };
    }
    return {
      success: false,
      message: data?.detail,
    };
  } catch (error) {
    console.error("Login error:", error);
    return {
      success: false,
    };
  }
}

export async function getCurrentUser(token) {
  try {
    const response = await fetch(`${BASE_URL}/auth/user`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (response.status < 400) {
      console.log("response", response);

      return {
        success: true,
        user: data,
      };
    }
    return {
      success: false,
      message: "User not found",
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}
