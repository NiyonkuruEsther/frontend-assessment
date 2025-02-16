"use client";
import React from "react";

interface ButtonProps {
  variant: "blue" | "outlined";
  children: React.ReactNode;
  onClick?: () => void;
  prefixIcon: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ variant, children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`
                ${variant === "blue"
                  ? "bg-blue-500 text-white"
                  : "bg-white border border-blue-500 text-blue-500"}
                p-5 text-[16px] font-gilroy
                hover:opacity-80 transition-opacity
            `}
    >
      {children}
    </button>
  );
};

export default Button;
