/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import TrafficChart from "@/components/admin/dashboard/TrafficChart";
import {
  Check,
  ChevronRight,
  Eye,
  Mail,
  PackagePlus,
  TrendingUp,
  Users,
  Wrench,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface StatCard {
  icon: any;
  iconBg: string;
  title: string;
  value: string;
  changeIcon: any;
  changePercent: string;
  progressPercent: number;
  progressColor: string;
}

interface ActivityItem {
  icon: any;
  iconBg: string;
  title: string;
  subtitle: string;
  category: string;
  status: string;
  statusBg: string;
  statusBorder: string;
  statusText: string;
  time: string;
}

const statCards: StatCard[] = [
  {
    icon: Users,
    iconBg: "bg-[#3b82f61a]",
    title: "Total Visitors",
    value: "12,405",
    changeIcon: TrendingUp,
    changePercent: "+12%",
    progressPercent: 74.99,
    progressColor: "bg-[#137fec]",
  },
  {
    icon: Eye,
    iconBg: "bg-[#a855f71a]",
    title: "Project Views",
    value: "8,200",
    changeIcon: TrendingUp,
    changePercent: "+5%",
    progressPercent: 60.0,
    progressColor: "bg-purple-500",
  },
  {
    icon: Mail,
    iconBg: "bg-[#f973161a]",
    title: "Contact Inquiries",
    value: "45",
    changeIcon: TrendingUp,
    changePercent: "+2%",
    progressPercent: 45.0,
    progressColor: "bg-orange-500",
  },
];

const activityItems: ActivityItem[] = [
  {
    icon: Wrench,
    iconBg: "bg-[#3b82f61a]",
    title: "Updated Project: E-commerce App",
    subtitle: "Added new screenshots",
    category: "Portfolio",
    status: "Published",
    statusBg: "bg-[#10b9811a]",
    statusBorder: "border-[#10b98133]",
    statusText: "text-emerald-500",
    time: "2 mins ago",
  },
  {
    icon: PackagePlus,
    iconBg: "bg-[#a855f71a]",
    title: "New Draft: React Hooks Deep Dive",
    subtitle: "Created by Admin",
    category: "Blog",
    status: "Draft",
    statusBg: "bg-[#33415580]",
    statusBorder: "border-slate-600",
    statusText: "text-slate-300",
    time: "1 hour ago",
  },
  {
    icon: Check,
    iconBg: "bg-[#f973161a]",
    title: "Testimonial Approved: John Doe",
    subtitle: "From TechCorp Inc.",
    category: "Testimonials",
    status: "Live",
    statusBg: "bg-[#10b9811a]",
    statusBorder: "border-[#10b98133]",
    statusText: "text-emerald-500",
    time: "Yesterday",
  },
  {
    icon: Wrench,
    iconBg: "bg-[#3b82f61a]",
    title: "SEO Settings Updated",
    subtitle: "Global metadata refresh",
    category: "Settings",
    status: "Completed",
    statusBg: "bg-[#3b82f61a]",
    statusBorder: "border-[#3b82f633]",
    statusText: "text-blue-400",
    time: "2 days ago",
  },
];

export default function AdminDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState<
    "30days" | "7days" | "24hours"
  >("30days");

  return (
    <div className="relative flex-1 self-stretch grow bg-[#111a22] overflow-y-auto">
      <div className="flex flex-col max-w-[1200px] w-full items-start gap-8 p-8 relative h-full ">
        <header className="flex flex-col items-start gap-1 relative self-stretch w-full flex-[0_0_auto]">
          <nav
            className="flex pt-0 pb-2 px-0 self-stretch w-full flex-[0_0_auto] flex-col items-start relative"
            aria-label="Breadcrumb"
          >
            <ol className="flex items-center gap-2 relative self-stretch w-full flex-[0_0_auto]">
              <li className="inline-flex flex-col items-start relative flex-[0_0_auto]">
                <Link
                  href="/"
                  className="relative flex items-center justify-center w-[37.88px] h-5 mt-[-1.00px] [font-family:'Manrope-Regular',Helvetica] font-normal text-[#92adc9] text-sm tracking-[0] leading-5 whitespace-nowrap"
                >
                  Home
                </Link>
              </li>

              <li
                className="inline-flex flex-col items-start relative flex-[0_0_auto]"
                aria-hidden="true"
              >
                <ChevronRight size={20} color="gray" />
              </li>

              <li className="inline-flex flex-col items-start relative flex-[0_0_auto]">
                <span
                  className="relative flex items-center justify-center w-[71.48px] h-5 mt-[-1.00px] [font-family:'Manrope-Medium',Helvetica] font-medium text-white text-sm tracking-[0] leading-5 whitespace-nowrap"
                  aria-current="page"
                >
                  Dashboard
                </span>
              </li>
            </ol>
          </nav>

          <div className="flex items-center justify-between relative self-stretch w-full flex-[0_0_auto]">
            <div className="inline-flex flex-col items-start gap-1 relative flex-[0_0_auto]">
              <div className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
                <h1 className="relative flex items-center justify-center w-[131.77px] h-9 mt-[-1.00px] [font-family:'Manrope-ExtraBold',Helvetica] font-extrabold text-white text-3xl tracking-[-0.75px] leading-9 whitespace-nowrap">
                  Overview
                </h1>
              </div>

              <div className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
                <p className="relative flex items-center justify-center w-[477.5px] h-6 mt-[-1.00px] [font-family:'Manrope-Regular',Helvetica] font-normal text-[#92adc9] text-base tracking-[0] leading-6 whitespace-nowrap">
                  Welcome back. Here&#39;s what&#39;s happening with your
                  portfolio today.
                </p>
              </div>
            </div>

            <div className="inline-flex items-start relative flex-[0_0_auto]">
              <button
                className="all-[unset] box-border inline-flex h-10 gap-2 px-4 py-0 flex-[0_0_auto] bg-[#233648] rounded-lg border border-solid border-slate-700 items-center justify-center relative cursor-pointer hover:bg-[#2a3f54] transition-colors"
                type="button"
              >
                <div className="inline-flex flex-col items-center relative flex-[0_0_auto]">
                  <Eye />
                </div>

                <span className="inline-flex flex-col items-center relative flex-[0_0_auto]">
                  <span className="relative flex items-center justify-center w-[92.13px] h-5 mt-[-1.00px] [font-family:'Manrope-Bold',Helvetica] font-bold text-white text-sm text-center tracking-[0] leading-5 whitespace-nowrap">
                    View Live Site
                  </span>
                </span>
              </button>
            </div>
          </div>
        </header>

        <section
          className="flex items-start justify-center gap-4 relative self-stretch w-full flex-[0_0_auto]"
          aria-label="Statistics Overview"
        >
          {statCards.map((card, index) => (
            <article
              key={index}
              className="flex flex-col w-[309.33px] items-start p-5 relative self-stretch bg-[#1a2632] rounded-xl border border-solid border-slate-800 shadow-[0px_1px_2px_#0000000d]"
            >
              <div className="flex flex-col items-start pt-0 pb-4 px-0 relative self-stretch w-full flex-[0_0_auto]">
                <div className="flex items-start justify-between pl-0 pr-[0.01px] py-0 relative self-stretch w-full flex-[0_0_auto]">
                  <div
                    className={`inline-flex flex-col items-start p-2 relative flex-[0_0_auto] ${card.iconBg} rounded-lg`}
                  >
                    <card.icon size={24} color="white" />
                  </div>

                  <div className="inline-flex items-center px-2 py-1 relative flex-[0_0_auto] bg-[#10b9811a] rounded-full">
                    <div className="inline-flex pl-0 pr-0.5 py-0 flex-[0_0_auto] flex-col items-start relative">
                      <card.changeIcon size={16} color="green" />
                    </div>

                    <span className="relative flex items-center justify-center h-4 mt-[-1.00px] ml-[-1.78e-14px] [font-family:'Manrope-Bold',Helvetica] font-bold text-emerald-500 text-xs tracking-[0] leading-4 whitespace-nowrap">
                      {card.changePercent}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-start gap-1 relative self-stretch w-full flex-[0_0_auto]">
                <div className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
                  <h2 className="relative flex items-center justify-center self-stretch mt-[-1.00px] [font-family:'Manrope-Medium',Helvetica] font-medium text-[#92adc9] text-sm tracking-[0] leading-5">
                    {card.title}
                  </h2>
                </div>

                <div className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
                  <p className="relative flex items-center justify-center self-stretch mt-[-1.00px] [font-family:'Manrope-Bold',Helvetica] font-bold text-white text-3xl tracking-[0] leading-9">
                    {card.value}
                  </p>
                </div>
              </div>

              <div className="flex h-5 pt-4 pb-0 px-0 self-stretch w-full flex-col items-start relative">
                <div
                  className="relative self-stretch w-full h-1 bg-slate-800 rounded-full overflow-hidden"
                  role="progressbar"
                  aria-valuenow={card.progressPercent}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <div
                    className={`h-full ${card.progressColor} rounded-full`}
                    style={{ width: `${card.progressPercent}%` }}
                  />
                </div>
              </div>
            </article>
          ))}
        </section>

        <section
          className="flex flex-col items-start gap-6 p-6 relative self-stretch w-full flex-[0_0_auto] bg-[#1a2632] rounded-xl border border-solid border-slate-800"
          aria-labelledby="traffic-overview-heading"
        >
          <div className="flex items-center justify-between relative self-stretch w-full flex-[0_0_auto]">
            <div className="inline-flex flex-col items-start relative flex-[0_0_auto]">
              <div className="flex self-stretch w-full flex-col items-start relative flex-[0_0_auto]">
                <h2
                  id="traffic-overview-heading"
                  className="relative flex items-center justify-center w-[140.52px] h-7 mt-[-1.00px] [font-family:'Manrope-Bold',Helvetica] font-bold text-white text-lg tracking-[0] leading-7 whitespace-nowrap"
                >
                  Traffic Overview
                </h2>
              </div>

              <div className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
                <p className="relative flex items-center justify-center w-[210.7px] h-5 mt-[-1.00px] [font-family:'Manrope-Regular',Helvetica] font-normal text-[#92adc9] text-sm tracking-[0] leading-5 whitespace-nowrap">
                  Visitor trends for the last 30 days
                </p>
              </div>
            </div>

            <div
              className="inline-flex items-center gap-2 p-1 relative flex-[0_0_auto] bg-[#111a22] rounded-lg border border-solid border-slate-800"
              role="group"
              aria-label="Time period selection"
            >
              <button
                className={`all-[unset] box-border inline-flex flex-col px-3 py-1.5 flex-[0_0_auto] rounded-md shadow-[0px_1px_2px_#0000000d] items-center justify-center relative cursor-pointer transition-colors ${
                  selectedPeriod === "30days"
                    ? "bg-[#137fec]"
                    : "hover:bg-[#1a2632]"
                }`}
                type="button"
                onClick={() => setSelectedPeriod("30days")}
                aria-pressed={selectedPeriod === "30days"}
              >
                <span
                  className={`relative flex items-center justify-center w-[44.05px] h-4 mt-[-1.00px] [font-family:'Manrope-Medium',Helvetica] font-medium text-xs text-center tracking-[0] leading-4 whitespace-nowrap ${
                    selectedPeriod === "30days"
                      ? "text-white"
                      : "text-[#92adc9]"
                  }`}
                >
                  30 Days
                </span>
              </button>

              <button
                className={`all-[unset] box-border inline-flex flex-col items-center justify-center px-3 py-1.5 relative flex-[0_0_auto] cursor-pointer transition-colors ${
                  selectedPeriod === "7days"
                    ? "bg-[#137fec] rounded-md shadow-[0px_1px_2px_#0000000d]"
                    : "hover:bg-[#1a2632] rounded-md"
                }`}
                type="button"
                onClick={() => setSelectedPeriod("7days")}
                aria-pressed={selectedPeriod === "7days"}
              >
                <span
                  className={`relative flex items-center justify-center w-[35.94px] h-4 mt-[-1.00px] [font-family:'Manrope-Medium',Helvetica] font-medium text-xs text-center tracking-[0] leading-4 whitespace-nowrap ${
                    selectedPeriod === "7days" ? "text-white" : "text-[#92adc9]"
                  }`}
                >
                  7 Days
                </span>
              </button>

              <button
                className={`all-[unset] box-border inline-flex flex-col items-center justify-center px-3 py-1.5 relative flex-[0_0_auto] cursor-pointer transition-colors ${
                  selectedPeriod === "24hours"
                    ? "bg-[#137fec] rounded-md shadow-[0px_1px_2px_#0000000d]"
                    : "hover:bg-[#1a2632] rounded-md"
                }`}
                type="button"
                onClick={() => setSelectedPeriod("24hours")}
                aria-pressed={selectedPeriod === "24hours"}
              >
                <span
                  className={`relative flex items-center justify-center w-[49.69px] h-4 mt-[-1.00px] [font-family:'Manrope-Medium',Helvetica] font-medium text-xs text-center tracking-[0] leading-4 whitespace-nowrap ${
                    selectedPeriod === "24hours"
                      ? "text-white"
                      : "text-[#92adc9]"
                  }`}
                >
                  24 Hours
                </span>
              </button>
            </div>
          </div>

          <div className="flex flex-col h-[312px] items-start justify-center pt-2 pb-0 px-0 relative self-stretch w-full">
            <div className="relative self-stretch w-full h-80 mt-[-8.00px] mb-[-8.00px]">
              <TrafficChart period={selectedPeriod} />

              <div className="absolute w-[7.50%] h-[10.00%] top-[20.00%] left-[58.75%] flex bg-[url(/vector-8.svg)] bg-[100%_100%]">
                <div className="mt-[7.7px] w-[29.43px] ml-[34.1px] flex">
                  <span className="flex items-center justify-center w-[29.43px] h-[17.48px] [font-family:'Manrope-Regular',Helvetica] font-normal text-white text-[12.8px] tracking-[0] leading-[normal]">
                    12.4k
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          className="flex flex-col gap-4 w-full"
          aria-labelledby="recent-activity-heading"
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <h2
              id="recent-activity-heading"
              className="font-bold text-white text-lg"
            >
              Recent Activity
            </h2>

            <button
              type="button"
              className="text-sm font-medium text-[#137fec] hover:underline cursor-pointer"
            >
              View All
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-xl border border-slate-800 bg-[#1a2632]">
            <table className="w-full border-collapse">
              <thead className="bg-[#15202b] border-b border-slate-800">
                <tr className="text-left text-xs font-bold tracking-wider text-[#92adc9]">
                  <th className="px-4 py-3">ACTION</th>
                  <th className="px-4 py-3">CATEGORY</th>
                  <th className="px-4 py-3">STATUS</th>
                  <th className="px-4 py-3 text-right">TIME</th>
                </tr>
              </thead>

              <tbody>
                {activityItems.map((item, index) => (
                  <tr
                    key={index}
                    className="border-t border-slate-800 hover:bg-white/5 transition"
                  >
                    {/* ACTION */}
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 flex items-center justify-center rounded-lg ${item.iconBg}`}
                        >
                          <item.icon color="white" size={16} />
                        </div>

                        <div>
                          <p className="text-sm font-medium text-white">
                            {item.title}
                          </p>
                          <p className="text-xs text-[#92adc9]">
                            {item.subtitle}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* CATEGORY */}
                    <td className="px-4 py-4 text-sm text-[#92adc9]">
                      {item.category}
                    </td>

                    {/* STATUS */}
                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full border ${item.statusBg} ${item.statusBorder}`}
                      >
                        <span
                          className={`text-xs font-medium ${item.statusText}`}
                        >
                          {item.status}
                        </span>
                      </span>
                    </td>

                    {/* TIME */}
                    <td className="px-4 py-4 text-right font-mono text-sm text-[#92adc9]">
                      {item.time}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <footer className="flex-col pt-8 pb-4 px-0 flex items-start relative self-stretch w-full flex-[0_0_auto]">
          <div className="justify-center flex items-start relative self-stretch w-full flex-[0_0_auto]">
            <div className="inline-flex flex-col items-start relative self-stretch flex-[0_0_auto]">
              <p className="relative flex items-center justify-center w-[255.28px] h-4 mt-[-1.00px] [font-family:'Manrope-Regular',Helvetica] font-normal text-[#92adc9] text-xs tracking-[0] leading-4 whitespace-nowrap">
                © 2023 DevPortfolio Admin. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
