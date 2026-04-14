import "@/styles/globals.css";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Login | codertodata",
  description: "Login page",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
