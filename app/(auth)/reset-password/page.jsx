import prisma from "@/lib/prisma";
import ResetForm from "./ResetForm";
import { resetPasswordAction, changePasswordAction } from "@/actions/auth";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function ResetPasswordPage({ searchParams }) {
  const token = searchParams?.token || "";
  const session = await getServerSession(authOptions);

  // Rejim seçimi:
  // token varsa -> forgot flow
  // token yoxdursa və loginlidirsə -> change flow
  const mode = token ? "token" : session?.user?.id ? "authed" : "forbidden";

  // Authed rejimində "cari şifrə tələb olunurmu?" bayrağı
  let requiresCurrent = false;
  if (mode === "authed") {
    const dbUser = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { passwordHash: true },
    });
    requiresCurrent = !!dbUser?.passwordHash;
  }

  if (mode === "forbidden") {
    return (
      <div className="p-6 text-red-500">
        Bu səhifə üçün əvvəlcə daxil olmalısınız və ya email linkindən
        keçməlisiniz.
      </div>
    );
  }

  const actionFn =
    mode === "token" ? resetPasswordAction : changePasswordAction;

  return (
    <div className="w-full p-6">
      <div className="text-2xl mb-4 relative font-extrabold">
        {mode === "token" ? "Reset password" : "Change password"}
        <div className="absolute left-0 bottom-0 h-[3px] w-6 bg-cyan-500" />
      </div>

      <ResetForm
        mode={mode}
        token={token}
        requiresCurrent={requiresCurrent}
        actionFn={actionFn}
      />
    </div>
  );
}
