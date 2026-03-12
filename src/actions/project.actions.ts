// src/actions/project.actions.ts
"use server";

import { revalidatePath } from "next/cache";

export async function revalidateProjectsData() {
  // Đường dẫn trỏ tới trang chứa danh sách project của bạn
  revalidatePath("/admin/projects");
}
