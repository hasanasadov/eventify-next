import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Profile from "./Profile";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  return <Profile user={session.user} />;
}
