"use server";

import crypto from "crypto";
import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";
import { z } from "zod";
import { sendResetEmail } from "@/lib/email";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function forgotPasswordAction(prevState, formData) {
  try {
    const raw = (formData.get("email") || formData.get("username") || "")
      .toString()
      .trim();

    if (!raw)
      return {
        ok: true,
        message: "Əgər hesab mövcuddursa, e-poçt göndərildi.",
      };

    const where = raw.includes("@") ? { email: raw } : { username: raw };
    const user = await prisma.user.findFirst({ where });
    if (!user)
      return {
        ok: true,
        message: "Əgər hesab mövcuddursa, e-poçt göndərildi.",
      };

    await prisma.passwordResetToken.updateMany({
      where: { userId: user.id, used: false, expires: { gt: new Date() } },
      data: { used: true },
    });

    const token = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 45 * 60 * 1000);

    await prisma.passwordResetToken.create({
      data: { token, userId: user.id, expires },
    });

    const url = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}`;
    await sendResetEmail(user.email, url).catch(() => {});

    return { ok: true, message: "Əgər hesab mövcuddursa, e-poçt göndərildi." };
  } catch (e) {
    console.error(e);
    return { ok: true, message: "Əgər hesab mövcuddursa, e-poçt göndərildi." };
  }
}

export async function resetPasswordAction(prevState, formData) {
  try {
    const schema = z.object({
      token: z.string().min(10),
      newPassword: z.string().min(8),
    });

    const token = (formData.get("token") || "").toString();
    const newPassword = (formData.get("newPassword") || "").toString();

    const { token: t, newPassword: pw } = schema.parse({ token, newPassword });

    const row = await prisma.passwordResetToken.findUnique({
      where: { token: t },
    });
    if (!row || row.used || row.expires < new Date()) {
      return { ok: false, error: "Token etibarsız və ya vaxtı keçib." };
    }

    const hash = await bcrypt.hash(pw, 12);

    await prisma.$transaction([
      prisma.user.update({
        where: { id: row.userId },
        data: { passwordHash: hash },
      }),
      prisma.passwordResetToken.update({
        where: { token: t },
        data: { used: true },
      }),
    ]);

    return { ok: true, message: "Şifrəniz yeniləndi." };
  } catch (e) {
    console.error(e);
    return { ok: false, error: "Şifrəni yeniləmək alınmadı." };
  }
}

export async function changePasswordAction(prevState, formData) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return { ok: false, error: "İcazə yoxdur. Xahiş olunur daxil olun." };
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { id: true, passwordHash: true },
    });
    if (!user) return { ok: false, error: "İstifadəçi tapılmadı." };

    const currentPassword = (formData.get("currentPassword") || "").toString();
    const newPassword = (formData.get("newPassword") || "").toString();
    const confirm = (formData.get("confirm") || "").toString();

    if (newPassword.length < 8) {
      return { ok: false, error: "Yeni şifrə minimum 8 simvol olmalıdır." };
    }
    if (newPassword !== confirm) {
      return { ok: false, error: "Şifrələr eyni olmalıdır." };
    }

    // Əgər istifadəçinin şifrəsi var isə - cari şifrəni təsdiqlə
    if (user.passwordHash) {
      const ok = await bcrypt.compare(currentPassword, user.passwordHash);
      if (!ok) return { ok: false, error: "Cari şifrə yanlışdır." };
    }
    // Google ilə qeydiyyat olubsa və şifrə yoxdursa, cari şifrə tələb etmədən yeni təyin edirik

    const hash = await bcrypt.hash(newPassword, 12);
    await prisma.user.update({
      where: { id: user.id },
      data: { passwordHash: hash },
    });

    return { ok: true, message: "Şifrəniz yeniləndi." };
  } catch (e) {
    console.error(e);
    return { ok: false, error: "Şifrəni dəyişmək alınmadı." };
  }
}
