import type { Input } from "@/types/common";

export function Input({ className = "", ...props }: Input) {
  return (
    <input
      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      {...props}
    />
  );
}
