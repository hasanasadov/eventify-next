"use server";

// import { BASE_URL } from "@/constants";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const getEvents = async () => {
  try {
    const items = await prisma.event.findMany({
      include: {
        location: true,
      },
    });
    return items || [];
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getEventById = async (id) => {
  try {
    const event = await prisma.event.findUnique({
      where: { id },
      include: {
        location: true,
      },
    });
    return event;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const createEvent = async (data) => {
  try {
    const event = await prisma.event.create({
      data,
    });
    revalidatePath(`/dashboard/events`);

    return event;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const editEvent = async ({ id, data }) => {
  try {
    console.log("Editing event:", id, data);
    const event = await prisma.event.update({
      where: { id },
      data,
    });
    revalidatePath(`/dashboard/events`);
    return event;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const deleteEvent = async ({ id }) => {
  try {
    const event = await prisma.event.delete({
      where: { id },
    });
    revalidatePath(`/dashboard/events`);
    return event;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const searchEvents = async (searchText) => {
  try {
    const events = await prisma.event.findMany({
      where: {
        OR: [
          { title: { contains: searchText, mode: "insensitive" } },
          { description: { contains: searchText, mode: "insensitive" } },
        ],
      },
    });
    return events || [];
  } catch (error) {
    console.error(error);
    return [];
  }
};
