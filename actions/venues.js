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

export const editVenue = async (id, data) => {
  try {
    const item = await prisma.venue.update({
      where: { id },
      data,
    });
    return item;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const deleteVenue = async (id) => {
  try {
    const item = await prisma.venue.delete({
      where: { id },
    });
    return item;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const createVenue = async (data) => {
  try {
    const item = await prisma.venue.create({
      data,
    });
    return item;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const searchVenues = async (searchText) => {
  try {
    const venues = await prisma.venue.findMany({
      where: {
        OR: [
          { title: { contains: searchText, mode: "insensitive" } },
          { description: { contains: searchText, mode: "insensitive" } },
        ],
      },
    });
    return venues || [];
  } catch (error) {
    console.error(error);
    return [];
  }
};
