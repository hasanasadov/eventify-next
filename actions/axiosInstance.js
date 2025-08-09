"use server";

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
