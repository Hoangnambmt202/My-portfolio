import * as React from "react";

export function Table({ children }: { children: React.ReactNode }) {
  return (
    <table className="w-full border-collapse border border-gray-200 rounded-md overflow-hidden">
      {children}
    </table>
  );
}

export function TableHead({ children }: { children: React.ReactNode }) {
  return <thead className="bg-gray-100 text-left">{children}</thead>;
}

export function TableHeader({ children }: { children: React.ReactNode }) {
  return <th className="px-4 py-2 border-b">{children}</th>;
}

export function TableRow({ children }: { children: React.ReactNode }) {
  return <tr className="hover:bg-gray-50">{children}</tr>;
}

export function TableCell({ children, className }: { children: React.ReactNode, className?: string }) {
  return <td className={`"px-4 py-2 border-b " ${className}`}>{children}</td>;
}
