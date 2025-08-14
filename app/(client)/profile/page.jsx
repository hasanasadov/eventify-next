// app/profile/page.tsx
import { getServerSession } from "next-auth";
import Profile from "./Profile";
import { authOptions } from "@/lib/auth";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  return <Profile user={session.user} />;
}
