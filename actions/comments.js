// app/actions/comments.ts
"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getSessionUser } from "./users";

// CREATE (EVENT) — derive author from session, trim content
export const createEventComment = async ({ data }) => {
  const user = await getSessionUser();
  const content = (data?.content ?? "").trim();

  if (!user?.id || !content || !data?.eventId) return null;

  try {
    const comment = await prisma.comment.create({
      data: {
        content,
        author: { connect: { id: user.id } },
        event: { connect: { id: data.eventId } },
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            username: true,
            email: true,
            image: true,
          },
        },
      },
    });

    revalidatePath(`/events/${data.eventId}`);
    return comment;
  } catch (error) {
    console.error(error);
    return null;
  }
};

// CREATE (VENUE) — derive author from session, trim content
export const createVenueComment = async ({ data }) => {
  const user = await getSessionUser();
  const content = (data?.content ?? "").trim();

  if (!user?.id || !content || !data?.venueId) return null;

  try {
    const comment = await prisma.comment.create({
      data: {
        content,
        author: { connect: { id: user.id } },
        venue: { connect: { id: data.venueId } },
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            username: true,
            email: true,
            image: true,
          },
        },
      },
    });
    console.log("Created venue comment:", comment);
    revalidatePath(`/venues/${data.venueId}`);
    return comment;
  } catch (error) {
    console.error(error);
    return null;
  }
};

// DELETE (EVENT) — already checks ownership
export const deleteEventComment = async ({ commentId }) => {
  try {
    const user = await getSessionUser();
    console.log("Deleting comment:", user.role);
    if (!user?.id) return { ok: false, error: "UNAUTHORIZED" };

    const existing = await prisma.comment.findUnique({
      where: { id: commentId },
      select: { id: true, authorId: true, eventId: true },
    });

    if (!existing) return { ok: false, error: "NOT_FOUND" };
    if (existing.authorId !== user.id && user.role !== "ADMIN")
      return { ok: false, error: "FORBIDDEN" };

    await prisma.comment.delete({ where: { id: commentId } });

    if (existing.eventId) revalidatePath(`/events/${existing.eventId}`);
    // revalidatePath(`/dashboard/events/edit/${existing.eventId}`);
    return { ok: true, id: commentId, eventId: existing.eventId };
  } catch (e) {
    console.error(e);
    return { ok: false, error: "SERVER_ERROR" };
  }
};

// DELETE (VENUE) — already checks ownership
export const deleteVenueComment = async ({ commentId }) => {
  try {
    const user = await getSessionUser();
    if (!user?.id) return { ok: false, error: "UNAUTHORIZED" };

    const existing = await prisma.comment.findUnique({
      where: { id: commentId },
      select: { id: true, authorId: true, venueId: true },
    });

    if (!existing) return { ok: false, error: "NOT_FOUND" };
    if (existing.authorId !== user.id && user.role !== "ADMIN")
      return { ok: false, error: "FORBIDDEN" };

    await prisma.comment.delete({ where: { id: commentId } });

    if (existing.venueId) revalidatePath(`/venues/${existing.venueId}`);
    return { ok: true, id: commentId, venueId: existing.venueId };
  } catch (e) {
    console.error(e);
    return { ok: false, error: "SERVER_ERROR" };
  }
};
