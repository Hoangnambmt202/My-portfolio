import { Metadata } from "next";
import SettingsClient from "./SettingsClient";

export const metadata: Metadata = {
  title: "CoderToData | Settings",
  description: "Manage your settings page",
};

export default function PortfolioSettingsPage() {
  return <SettingsClient />;
}
