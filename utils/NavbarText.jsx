import { usePathname } from "next/navigation";
import React from "react";

const NavbarText = () => {
  const pathName = usePathname();
  const homePage = pathName == "/";
  const eventsPage = pathName == "/events";
  const eventItemPage = pathName.includes("/events/");
  const venuesPage = pathName == "/venues";
  const venueItemPage = pathName.includes("/venues/");
  const mapPage = pathName.includes("/map");
  const searchPage = pathName.includes("/search");
  return (
    <div className="whitespace-nowrap overflow-hidden text-ellipsis">
      {eventsPage && "Explore Events"}
      {eventItemPage && " Event Detail"}
      {venuesPage && "Explore Venues"}
      {venueItemPage && " Venue Detail"}
      {mapPage && "Explore Map"}
      {searchPage && "Search All"}
      <div className="flex lg:hidden">{homePage && "Explore"}</div>
    </div>
  );
};

export default NavbarText;
