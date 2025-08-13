import React from "react";
import Image from "next/image";

const DownloadButtons = () => {
  const iOSAppUrl = "https://apps.apple.com/us/app/your-app-name/id123456789"; // Replace with your App Store URL
  const androidAppUrl =
    "https://play.google.com/store/apps/details?id=com.yourcompany.yourapp"; // Replace with your Google Play URL

  return (
    <div className="flex flex-col w-full gap-4 ">
      <a href={iOSAppUrl} target="_blank" rel="noopener noreferrer">
        <img
          src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" // Store this in /public/badges/
          alt="Download on the App Store"
          className="hover:opacity-50   transition-all dark:inver"
        />
      </a>

      <a href={androidAppUrl} target="_blank" rel="noopener noreferrer">
        <img
          src="/badges/gpmarket.png" // Store this in /public/badges/
          alt="Get it on Google Play"
          className="hover:opacity-50 max-w-36  transition-all dark:invertt"
        />
      </a>
    </div>
  );
};

export default DownloadButtons;
