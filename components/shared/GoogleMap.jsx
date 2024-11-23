import React from "react";

const GoogleMap = () => {
  return (
    // Google Map component
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.415204084762!2d-73.9864876845944!3d40.69308697933692!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c258a3d4a7b1b1%3A0x6e4a4a4b6a8b8e6f!2sBrooklyn%20Bridge!5e0!3m2!1sen!2sus!4v1629297526542!5m2!1sen!2sus"
      width="100%"
      height="100%"
      style={{ border: "20px" }}
      allowFullScreen=""
      loading="lazy"
    ></iframe>
  );
};

export default GoogleMap;
