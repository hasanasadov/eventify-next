import React from "react";

const ServicesPage = () => {
  return (
    <div className="py-20 bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Our Services
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Venues Details */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Venues Details
            </h2>
            <p className="text-gray-600 mb-4">
              Discover the best venues for your events. We provide detailed
              information about various venues to help you choose the perfect
              location.
            </p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Learn More
            </button>
          </div>

          {/* Events Details */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Events Details
            </h2>
            <p className="text-gray-600 mb-4">
              Get all the details about upcoming events. From concerts to
              conferences, we have all the information you need to stay updated.
            </p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Learn More
            </button>
          </div>

          {/* Selling Tickets */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Selling Tickets
            </h2>
            <p className="text-gray-600 mb-4">
              Easily sell tickets for your events through our platform. We
              provide a seamless experience for both organizers and attendees.
            </p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
