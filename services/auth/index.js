"use server";

const { BASE_URL } = require("@/constants");
const axios = require("axios");

export async function getCurrentUser() {
  return (await axios.get(`${BASE_URL}/auth/current-user`)) || null;
}
