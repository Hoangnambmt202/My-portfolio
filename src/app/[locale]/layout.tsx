import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { NextIntlClientProvider } from "next-intl";
import { routing } from "@/i18n/routing";
import { getMessages } from "next-intl/server";

export const metadata: Metadata = {
  title: "My Portfolio",
  description: "Personal portfolio website showcasing my projects and skills",
   viewport: "width=device-width, initial-scale=1",
};

type Props = {
  children: React.ReactNode;
  params:  Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  // Kiểm tra locale hợp lệ
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  const messages = await getMessages();
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <main className="min-h-screen">{children}</main>
    </NextIntlClientProvider>
  );
}
