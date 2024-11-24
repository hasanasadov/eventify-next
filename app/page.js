import SideBarLeft from "@/components/shared/SideBarLeft";
import SideBarRight from "@/components/shared/SideBarRight";
import GoogleMap from "@/components/shared/GoogleMap";

export default function Home() {
  return (
    <div>
      <div className="flex justify-between flex-col md:flex-row bg-gray-200  p-8 w-full">
        <SideBarLeft />
        <div className="flex-grow min-h-[40vh] rounded-xl overflow-hidden md:mx-6 my-6 md:my-0">
          <GoogleMap className={"bg-red-800 min-h-[40vh]"} />
        </div>
        <SideBarRight />
      </div>
    </div>
  );
}
