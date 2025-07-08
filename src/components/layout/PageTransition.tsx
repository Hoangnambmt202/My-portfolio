"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Loading from "@/components/ui/Loading";
import { useGlobalStore } from "@/lib/store/useGlobalStore";

const PageTransition = () => {
  const pathname = usePathname();
  const isLoading = useGlobalStore((s) => s.isLoading);
  const setLoading = useGlobalStore((s) => s.setLoading);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300); // delay nhỏ tránh nhấp nháy

    return () => clearTimeout(timer);
  }, [pathname, setLoading]);

  if (!isLoading) return null;

  return (
    <div className="fixed top-0 right-0 bottom-0 left-0 inset-0 bg-gray-400 flex items-center justify-center z-100">
      <Loading />
    </div>
  );
};

export default PageTransition;
