// components/GlassPanel.jsx
import React from "react";
import clsx from "clsx";

export const GlassPanel = ({
  as: Tag = "div",
  className,
  children,
  ...props
}) => {
  return (
    <Tag className={clsx("glass-panel glass-tint ", className)} {...props}>
      {children}
    </Tag>
  );
};
