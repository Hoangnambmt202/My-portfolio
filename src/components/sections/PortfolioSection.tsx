import { GithubRepo } from "@/types/portfolio";
import PortfolioClient from "../client/PortfolioClient";

// Hàm fetch API chạy trên Server
async function getGithubProjects(): Promise<GithubRepo[]> {
  const username = process.env.GITHUB_USERNAME;
  const token = process.env.GITHUB_TOKEN;

  try {
    const res = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=8`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Dùng Token để tăng limit lên 5000 request/giờ
          Accept: "application/vnd.github.v3+json",
        },
        // Tự động fetch lại dữ liệu mới mỗi 1 tiếng (3600 giây)
        next: { revalidate: 3600 },
      },
    );

    if (!res.ok) throw new Error("Failed to fetch Github repos");

    const data = await res.json();
    return data.filter((repo: GithubRepo) => !repo.fork); // Lọc bỏ code fork
  } catch (error) {
    console.error("Lỗi khi fetch Github:", error);
    return []; // Trả về mảng rỗng nếu lỗi để không sập trang
  }
}

export default async function PortfolioSection() {
  // Fetch dữ liệu ở Server
  const projects = await getGithubProjects();

  // Truyền dữ liệu xuống Client Component
  return <PortfolioClient projects={projects} />;
}
