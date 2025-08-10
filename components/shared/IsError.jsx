"use client";

import React from "react";
import { Button } from "../ui/button";

const IsError = ({ text }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-4 p-4">
      <svg
        className="w-12 h-12 text-red-500 mb-2"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 48 48"
      >
        <circle cx="24" cy="24" r="22" strokeWidth="4" />
        <line x1="16" y1="16" x2="32" y2="32" strokeWidth="4" />
        <line x1="32" y1="16" x2="16" y2="32" strokeWidth="4" />
      </svg>
      <h2 className="text-lg font-semibold text-center text-red-600">
        Unable to load {text}
      </h2>
      <p className="text-sm text-center text-gray-500">
        There was a problem fetching the {text}. Please check your connection
        and try again.
      </p>
      <Button
        variant="glass"
        className="mt-2 px-4 py-2 !bg-red-500 text-white rounded hover:!bg-red-600 transition"
        onClick={() => window.location.reload()}
      >
        Retry
      </Button>
    </div>
  );
};

export default IsError;
