"use client";
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { MoonIcon } from "lucide-react";
import { SunDimIcon } from "lucide-react";

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
    setIsDark(!isDark); // Optimistic update
    console.log(`Theme changed to: ${newTheme}`);
  };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex items-center justify-end pr-4"
    >
      <span className="hidden md:inline-block px-2">
        {isDark ? "Dark" : "Light"}
      </span>
      <label className="relative transition-all duration-500 inline-flex items-center justify-end cursor-pointer w-10 h-5">
        <input
          type="checkbox"
          checked={isDark}
          onChange={handleToggle}
          className="sr-only peer"
        />

        {/* Track */}
        <div
          className={`
            ${hovered ? "w-10 h-[24px]" : "!w-0 !h-0"}
            w-10 h-[24px] glass
            bg-gray-200 dark:bg-white/[0.16]
            rounded-full
            transition-all
            duration-500
            shadow-inner
          `}
        ></div>

        {/* Knob with emoji */}
        <div
          className={`
            ${!hovered ? "!right-[0px] peer-checked:!right-[0px]" : ""}
            absolute right-[4px] top-[3px]
            w-[16px] h-[16px]
            flex items-center justify-center
            text-[10px]
            rounded-full
            shadow
            transition-all
            duration-500
            peer-checked:right-[16px]
            pointer-events-none
          `}
        >
          <div className="">
            {isDark ? <MoonIcon size={14} /> : <SunDimIcon size={14} />}
          </div>
        </div>
      </label>
    </div>
  );
};

export default ToggleTheme;
