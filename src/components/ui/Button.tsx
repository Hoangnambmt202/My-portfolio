import * as React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline" | "danger";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
};

export function Button({
  children,
  variant = "default",
  size = "md",
  className = "",
  onClick,
  ...props
}: ButtonProps) {
  const base = "rounded-md font-medium transition-colors focus:outline-none";

  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-100",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };

  const sizes = {
    sm: "px-2 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
