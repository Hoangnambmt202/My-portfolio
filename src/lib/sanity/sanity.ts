import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "v6npmypr",  // thay bằng Project ID 
  dataset: "production",  // hoặc dataset bạn dùng
  apiVersion: "2025-08-18", // ngày version API, nên để ngày hiện tại
  useCdn: true, // true = cache CDN (đọc nhanh), false = dữ liệu mới nhất
});
