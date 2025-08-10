import React from "react";

const AboutPage = () => {
  return (
    <div className="py-20  flex flex-col items-center justify-center p-4">
      <div className=" shadow-md rounded-lg p-6 max-w-3xl w-full">
        <h1 className="text-4xl font-bold text-center mb-4">About Us</h1>
        <p className="text-lg  text-center mb-6">
          We sell tickets for events and show event venues and their locations
          on a map.
        </p>
        <div>
          <h2 className="text-2xl font-semibold  mb-4">
            Our Services
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li className="text-lg ">Ticket Sales</li>
            <li className="text-lg ">Event Venues</li>
            <li className="text-lg ">Location Mapping</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
