import SideBarLeft from "@/components/shared/SideBarLeft";
import SideBarRight from "@/components/shared/SideBarRight";
import GoogleMap from "@/components/shared/GoogleMap";

export default async function Home() {
  return (
    <div className="flex justify-between flex-col md:flex-row p-8 w-full bg-gray-50">
      <SideBarLeft />
      <div className="flex-grow min-h-[40vh] rounded-xl overflow-hidden md:mx-6 my-6 md:my-0">
        <GoogleMap className={"bg-green-200 min-h-[40vh]"} />
      </div>
      <SideBarRight />
    </div>
  );
}
