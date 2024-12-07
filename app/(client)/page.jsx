import SideBarLeft from "@/components/shared/SideBarLeft";
import SideBarRight from "@/components/shared/SideBarRight";
import GoogleMap from "@/components/shared/GoogleMap";
import { getCurrentUser } from "@/services/users";

export default async function Home() {
  const user = await getCurrentUser();
  console.log("user", user);
  return (
    <div>
      <div className="flex justify-between flex-col md:flex-row p-8 w-full">
        <SideBarLeft />
        <div className="flex-grow min-h-[40vh] rounded-xl overflow-hidden md:mx-6 my-6 md:my-0">
          <GoogleMap className={"bg-green-200 min-h-[40vh]"} />
        </div>
        <SideBarRight />
      </div>
    </div>
  );
}
