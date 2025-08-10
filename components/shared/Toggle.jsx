"use client";
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";

const ToggleTheme = () => {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [hovered, setHovered] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (resolvedTheme) {
      setIsDark(resolvedTheme === "dark");
    }
  }, [resolvedTheme]);

  if (!mounted) return null;

  const handleToggle = () => {
    const newTheme = isDark ? "light" : "dark";
    setTheme(newTheme);
    setIsDark(!isDark); // Optimistically update
    console.log(`Theme changed to: ${newTheme}`);
  };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex items-center justify-end "
    >
      <label className="relative transition-all duration-500 inline-flex items-center justify-end cursor-pointer w-10 h-5">
        <input
          type="checkbox"
          checked={isDark}
          onChange={handleToggle}
          className="sr-only peer"
        />
        <div
          className={`
            ${hovered ? "w-8 h-[18px]" : "!w-0 !h-0"} "}
            w-8 h-[18px]
            bg-gray-200 dark:bg-white/[0.16]
            rounded-full
            transition-all
            duration-500
            shadow-inner
          `}
        ></div>
        <div
          className={`
            ${!hovered ? "!right-[0px] peer-checked:!right-[0px]" : ""}
            absolute right-[2px] top-[3px]
            w-[14px] h-[14px]
            dark:bg-white bg-black
            rounded-full
            shadow
            transition-all
            duration-500
            peer-checked:right-[16px]
            pointer-events-none
          `}
        ></div>
      </label>
    </div>
  );
};

export default ToggleTheme;
