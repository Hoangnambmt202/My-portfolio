"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

type Props = {
  homeLabel?: string;
  className?: string;
  transformLabel?: (segment: string) => string;
};

export default function Breadcrumb({
  homeLabel = "Home",
  className,
  transformLabel,
}: Props) {
  const pathname = usePathname();
  const HIDDEN_SEGMENTS = ["admin"];

  const segments = pathname
    .split("/")
    .filter(Boolean)
    .filter((segment) => !HIDDEN_SEGMENTS.includes(segment));

  const buildHref = (index: number) =>
    "/" + segments.slice(0, index + 1).join("/");

  return (
    <nav aria-label="Breadcrumb" className={`text-sm ${className}`}>
      <ol className="flex items-center flex-wrap gap-1 text-gray-500">
        {/* Home */}
        <li className="flex items-center gap-1">
          <Link
            href="/admin/dashboard"
            className="font-bold uppercase tracking-widest text-xs hover:text-slate-200"
          >
            {homeLabel}
          </Link>
        </li>

        {segments.map((segment, index) => {
          const isLast = index === segments.length - 1;
          const label = transformLabel
            ? transformLabel(segment)
            : decodeURIComponent(segment);

          return (
            <li key={index} className="flex items-center gap-1">
              <ChevronRight className="h-4 w-4 text-gray-400" />

              {isLast ? (
                <span className=" flex items-center gap-2 text-xs font-bold text-blue-500 uppercase tracking-widest">
                  {label}
                </span>
              ) : (
                <Link
                  href={buildHref(index)}
                  className="text-slate-500 hover:text-slate-200"
                >
                  {label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
//
// Cách sử dụng, Auto path route
// VD: /projects/12/edit
//
// Home > projects > 12 > edit
//
