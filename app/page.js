import SideBarLeft from "@/components/shared/SideBarLeft";
import SideBarRight from "@/components/shared/SideBarRight";
import GoogleMap from "@/components/shared/GoogleMap";

export default function Home() {
  return (
    <div>
      <div className="flex justify-between flex-col md:flex-row bg-gray-200  p-8 w-full">
        <SideBarLeft />
        <div className="flex-grow rounded-xl overflow-hidden mx-6 ">
          <GoogleMap />
        </div>
        <SideBarRight />
      </div>
    </div>
  );
}
