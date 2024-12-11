import React from "react";

const AboutPage = () => {
  return (
    <div className="py-20 bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-3xl w-full">
        <h1 className="text-4xl font-bold text-center mb-4">About Us</h1>
        <p className="text-lg text-gray-700 text-center mb-6">
          We sell tickets for events and show event venues and their locations
          on a map.
        </p>
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Our Services
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li className="text-lg text-gray-700">Ticket Sales</li>
            <li className="text-lg text-gray-700">Event Venues</li>
            <li className="text-lg text-gray-700">Location Mapping</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
