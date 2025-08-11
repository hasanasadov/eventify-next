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
    <div>
      {eventsPage && "Explore Events"}
      {eventItemPage && " Event Details"}
      {venuesPage && "Explore Venues"}
      {venueItemPage && " Venue Details"}
      {mapPage && "Explore Map"}
      {searchPage && "Search All"}
      <div className="flex md:hidden">{homePage && "Explore Events"}</div>
    </div>
  );
};

export default NavbarText;
