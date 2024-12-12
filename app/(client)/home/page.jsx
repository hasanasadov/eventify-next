import SideBarLeft from "@/components/shared/SideBarLeft";
import SideBarRight from "@/components/shared/SideBarRight";
import GoogleMap from "@/components/shared/GoogleMap";

export default async function HomePage() {
  return (
    <div className="flex justify-between flex-col md:flex-row p-8 w-full bg-gray-50">
      <SideBarLeft />  {/* IT HASSS HYDRATIONN PROBLEMM  IT IS NOT ISSUE BUT IT IS.  */}
      <div className="flex-grow min-h-[70vh] rounded-xl overflow-hidden md:mx-6 my-6 md:my-0">
        <GoogleMap />
      </div>
      <SideBarRight /> {/* IT HASSS HYDRATIONN PROBLEMM  IT IS NOT ISSUE BUT IT IS.  */}

    </div>
  );
}
