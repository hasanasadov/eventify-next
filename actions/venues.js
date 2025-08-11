"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const getVenues = async () => {
  try {
    const items = await prisma.venue.findMany({
      include: {
        location: true,
        events: true,
      },
    });
    return items || [];
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
// actions/venues.ts

export const editVenue = async ({ id, data }) => {
  try {
    const { eventIds = [], locationId, ...rest } = data;

    const updateData = {
      ...rest, // title, description, type, openAT, closeAT, imageURL
    };

    // handle location relation
    if (typeof locationId === "string" && locationId.length > 0) {
      updateData.location = { connect: { id: locationId } };
    } else if (locationId === undefined) {
      // do nothing (don’t touch location)
    } else {
      // if you explicitly want to clear it when empty string/null is sent
      updateData.location = { disconnect: true };
    }

    // handle events relation
    if (Array.isArray(eventIds)) {
      updateData.events = {
        set: eventIds.map((id) => ({ id })),
      };
    }

    const item = await prisma.venue.update({
      where: { id },
      data: updateData,
      include: { location: true, events: true },
    });

    revalidatePath(`/dashboard/venues`);
    return item;
  } catch (error) {
    console.error(error);
    throw error; // bubble up so your UI shows the toast
  }
};

export const createVenue = async (data) => {
  try {
    const { eventIds = [], locationId, ...rest } = data;

    const createData = {
      ...rest, // title, description, type, openAT, closeAT, imageURL
    };

    if (typeof locationId === "string" && locationId.length > 0) {
      createData.location = { connect: { id: locationId } };
    }

    if (Array.isArray(eventIds) && eventIds.length > 0) {
      createData.events = { connect: eventIds.map((id) => ({ id })) };
    }

    const item = await prisma.venue.create({
      data: createData,
      include: { location: true, events: true },
    });

    revalidatePath(`/dashboard/venues`);
    return item;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteVenue = async (id) => {
  try {
    const item = await prisma.venue.delete({
      where: { id },
    });
    revalidatePath(`/dashboard/venues`);

    return item;
  } catch (error) {
    console.error(error);
    return null;
  }
};

// export const createVenue = async (data) => {
//   try {
//     const item = await prisma.venue.create({
//       data,
//     });
//     revalidatePath(`/dashboard/venues`);

//     return item;
//   } catch (error) {
//     console.error(error);
//     return null;
//   }
// };

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
