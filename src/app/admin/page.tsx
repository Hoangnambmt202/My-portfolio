// src/app/(admin)/page.tsx
import { redirect } from "next/navigation";

export default async function AdminRoot() {

  redirect("/admin/dashboard");
}
