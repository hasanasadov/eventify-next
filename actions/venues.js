"use server";

import prisma from "@/lib/prisma";

export const getVenues = async () => {
  try {
    const items = await prisma.venue.findMany({
      include: {
        location: true,
        events: true,
      },
    });
    return items;
  } catch (error) {
    console.error(error);
    return null;
  }
};
export const getVenueById = async (id) => {
  try {
    const item = await prisma.venue.findUnique({
      where: { id },
      include: {
        location: true,
        events: true,
      },
    });
    return item;
  } catch (error) {
    console.error(error);
    return null;
  }
};
