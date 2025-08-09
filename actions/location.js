"use server";

import prisma from "@/lib/prisma";

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

export const createLocation = async (values) => {
  try {
    const location = await prisma.location.create({
      data: values,
    });
    return location;
  } catch (error) {
    console.log("Error:", error);
  }
};

export const editLocation = async (id, values) => {
  try {
    const location = await prisma.location.update({
      where: { id },
      data: values,
    });
    return location;
  } catch (error) {
    console.log("Error:", error);
  }
};

export const deleteLocation = async (id) => {
  try {
    const location = await prisma.location.delete({
      where: { id },
    });
    return location;
  } catch (error) {
    console.log("Error:", error);
  }
};
