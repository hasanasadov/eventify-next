"use server";

import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { z } from "zod";
import crypto from "crypto";
import { addMinutes } from "date-fns";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// helper: session user
export async function getSessionUser() {
  const session = await getServerSession(authOptions);
  return session?.user || null; // {id,email,role}
}

export async function getUsers() {
  return prisma.user.findMany({
    select: { id: true, email: true, username: true, name: true, role: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function getUserById(id) {
  return prisma.user.findUnique({
    where: { id },
  });
}

const registerSchema = z.object({
  username: z.string().min(3).max(50).optional().nullable(),
  first_name: z.string().min(1).optional(),
  last_name: z.string().min(1).optional(),
  email: z.string().email(),
  password: z.string().min(8),
  is_organizer: z.boolean().optional().default(false),
});

export async function handleRegister(values) {
  try {
    const data = registerSchema.parse(values);

    const exists = await prisma.user.findFirst({
      where: {
        OR: [
          { email: data.email },
          ...(data.username ? [{ username: data.username }] : []),
        ],
      },
      select: { id: true },
    });
    if (exists) return { success: false, detail: "User already exists" };

    const hash = await bcrypt.hash(data.password, 12);
    const name =
      (data.first_name ? data.first_name : "") +
      (data.last_name ? " " + data.last_name : "");

    await prisma.user.create({
      data: {
        email: data.email,
        username: data.username || null,
        name: name.trim() || null,
        passwordHash: hash,
        role: data.is_organizer ? "ORGANISER" : "USER",
      },
    });

    return { success: true };
  } catch (e) {
    console.error(e);
    return { success: false, detail: "Registration failed" };
  }
}

export const editUser = async ({ id, data }) => {
  try {
    console.log("Editing User:", id, data);
    const user = await prisma.user.update({
      where: { id },
      data: data,
    });
    revalidatePath(`/dashboard/users`);
    return user;
  } catch (error) {
    console.log("Error:", error);
  }
};

export async function deleteUser(id) {
  try {
    await prisma.user.delete({ where: { id } });
    revalidatePath("/dashboard/users");
  } catch (error) {
    console.log("Error:", error);
  }
}

export async function setUserRoleAction(formData) {
  const id = formData.get("id");
  const role = formData.get("role");

  const parsedId = idSchema.parse(String(id));
  const parsedRole = z.enum(["USER", "ADMIN", "ORGANISER"]).parse(String(role));

  await prisma.user.update({
    where: { id: parsedId },
    data: { role: parsedRole },
  });

  revalidatePath("/dashboard/users");
  revalidatePath(`/dashboard/users/edit/${parsedId}`);
}
