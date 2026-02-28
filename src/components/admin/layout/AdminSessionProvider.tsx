"use client";

import { useEffect } from "react";
import { useAdminSessionStore, AdminUser } from "@/stores/admin-session.store";

export default function AdminSessionProvider({ user }: { user: AdminUser }) {
  const setUser = useAdminSessionStore((s) => s.setUser);

  useEffect(() => {
    if (user) {
      setUser(user);
    }
  }, [user, setUser]);

  return null; // chỉ làm nhiệm vụ hydrate
}
