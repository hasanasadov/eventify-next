"use server";

// import { BASE_URL } from "@/constants";
import prisma from "@/lib/prisma";

export const getEvents = async () => {
  try {
    const items = await prisma.event.findMany({
      include: {
        location: true,
      },
    });
    return items;
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
    return event;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const editEvent = async (id, data) => {
  try {
    const event = await prisma.event.update({
      where: { id },
      data,
    });
    return event;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const deleteEvent = async (id) => {
  try {
    const event = await prisma.event.delete({
      where: { id },
    });
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
