"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const getLocations = async () => {
  try {
    const locations = await prisma.location.findMany({});
    return locations;
  } catch (error) {
    console.log("Error:", error);
  }
};

export const getLocationById = async (id) => {
  try {
    const location = await prisma.location.findUnique({
      where: { id },
    });
    return location;
  } catch (error) {
    console.log("Error:", error);
  }
};

export const createLocation = async (data) => {
  try {
    const location = await prisma.location.create({
      data: data,
    });
    revalidatePath(`/dashboard/locations`);
    return location;
  } catch (error) {
    console.log("Error:", error);
  }
};

export const editLocation = async ({ id, data }) => {
  try {
    console.log("Editing location:", id, data);
    const location = await prisma.location.update({
      where: { id },
      data: data,
    });
    revalidatePath(`/dashboard/locations`);
    return location;
  } catch (error) {
    console.log("Error:", error);
  }
};

export const deleteLocation = async ({ id }) => {
  try {
    const location = await prisma.location.delete({
      where: { id },
    });
    revalidatePath(`/dashboard/locations`);
    return location;
  } catch (error) {
    console.log("Error:", error);
  }
};
