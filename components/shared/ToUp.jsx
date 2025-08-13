"use client";

import React, { useEffect, useState } from "react";
import { IoArrowUpCircle } from "react-icons/io5";

const ToUp = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      const scrolled = document.documentElement.scrollTop;
      setIsVisible(scrolled > 300);
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div>
      {" "}
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="!fixed glass-border lg:!bottom-8 !bottom-24 !right-8 text-green-400 hover:text-green-600 transition-all p-3 z-50"
        >
          <IoArrowUpCircle size={24} />
        </button>
      )}
    </div>
  );
};

export default ToUp;
