/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import {
  Plus,
  Search,
  Filter,
  TrendingUp,
  Clock,
  ThumbsUp,
  Edit3,
  ExternalLink,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Mail,
  MoreVertical,
  X,
} from "lucide-react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
);
import { Line } from "react-chartjs-2";
import { Post } from "@/types/post";

const BlogManagement = ({ posts }: { posts: Post[] }) => {
  const [activeTab, setActiveTab] = useState("All Posts");
  const [openActionId, setOpenActionId] = useState<string | null>(null);

  const toggleAction = (id: string) => {
    setOpenActionId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-blue-500/30">
      {/* Top Gradient Accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-blue-600/10 blur-[120px] pointer-events-none" />

      <main className="max-w-[1600px] mx-auto px-3 sm:px-5 lg:px-7 py-4 md:py-6 relative z-10 space-y-4">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-xl md:text-2xl font-black text-white tracking-tight uppercase">
              Blog Intelligence
            </h1>
            <p className="text-slate-500 font-medium mt-0.5 text-xs md:text-sm">
              Track content performance and manage your digital library.
            </p>
          </div>
          <button className="flex items-center justify-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold transition-all shadow-lg shadow-blue-900/40 active:scale-95 group w-full sm:w-auto text-sm">
            <Plus
              size={15}
              className="group-hover:rotate-90 transition-transform"
            />
            <span>Create New Post</span>
          </button>
        </div>

        {/* Analytics Overview Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
          {/* Chart Card */}
          <div className="lg:col-span-8 bg-slate-900/50 border border-slate-800 rounded-xl p-4 backdrop-blur-sm">
            <div className="flex items-center justify-between gap-2 mb-3">
              <div>
                <h3 className="text-sm font-bold text-white">
                  Views Over Time
                </h3>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="flex items-center text-[10px] font-bold text-emerald-400 bg-emerald-400/10 px-1.5 py-0.5 rounded">
                    <TrendingUp size={10} className="mr-1" /> +12.5%
                  </span>
                  <span className="text-[10px] text-slate-500">
                    vs last 30 days
                  </span>
                </div>
              </div>
              <select className="bg-slate-950 border border-slate-800 text-[10px] font-bold rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500/20 transition-all">
                <option>Last 30 Days</option>
                <option>Last 7 Days</option>
              </select>
            </div>

            <div className="h-28 md:h-36 w-full">
              <svg
                className="w-full h-full"
                viewBox="0 0 1000 300"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="chartGrad" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#2563eb" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0,280 Q100,240 200,100 T400,150 T600,80 T800,40 T1000,20 L1000,300 L0,300 Z"
                  fill="url(#chartGrad)"
                />
                <path
                  d="M0,280 Q100,240 200,100 T400,150 T600,80 T800,40 T1000,20"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="lg:col-span-4 grid grid-cols-3 lg:grid-cols-1 gap-2 md:gap-3">
            <StatCard
              icon={<Clock className="text-indigo-400" size={15} />}
              label="Avg. Read Time"
              value="4m 32s"
            />
            <StatCard
              icon={<Mail className="text-emerald-400" size={15} />}
              label="Subscribers"
              value="8,540"
            />
            <StatCard
              icon={<ThumbsUp className="text-orange-400" size={15} />}
              label="Engagement"
              value="12.8%"
            />
          </div>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 p-3 bg-slate-900/30 border border-slate-800 rounded-xl">
          {/* Search */}
          <div className="relative flex-1 group">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-blue-400 transition-colors"
              size={14}
            />
            <input
              type="text"
              placeholder="Search by title, tags or slug..."
              className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-xs focus:border-blue-500 focus:outline-none transition-all"
            />
          </div>

          {/* Tabs + Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide">
            {["All Posts", "Published", "Drafts", "Scheduled"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-2.5 py-1.5 rounded-md text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                  activeTab === tab
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20"
                    : "text-slate-500 hover:text-slate-300 hover:bg-slate-800"
                }`}
              >
                {tab}
              </button>
            ))}
            <div className="h-4 w-px bg-slate-800 mx-1 hidden sm:block" />
            <button className="flex items-center gap-1 px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded-md text-[10px] font-bold text-slate-400 hover:text-white transition-all shrink-0">
              <Filter size={11} />
              <span className="hidden sm:inline">Filters</span>
            </button>
          </div>
        </div>

        {/* Posts Table — Desktop */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden backdrop-blur-sm">
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-950/50 text-[9px] font-black text-slate-500 uppercase tracking-[0.15em] border-b border-slate-800">
                  <th className="px-4 xl:px-6 py-3">Post Information</th>
                  <th className="px-3 xl:px-4 py-3">Status</th>
                  <th className="px-3 xl:px-4 py-3">Activity (7d)</th>
                  <th className="px-3 xl:px-4 py-3 text-right">Reach</th>
                  <th className="px-3 xl:px-4 py-3 text-right">Publish Date</th>
                  <th className="px-4 xl:px-6 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {posts.map((post) => (
                  <tr
                    key={post._id}
                    className="group hover:bg-slate-800/30 transition-colors"
                  >
                    <td className="px-4 xl:px-6 py-3">
                      <div className="flex items-center gap-3">
                        <div className="size-8 rounded-lg bg-gradient-to-br from-slate-700 to-slate-800 shrink-0 shadow" />
                        <div className="min-w-0">
                          <h4 className="font-bold text-white text-xs truncate max-w-[160px] xl:max-w-xs group-hover:text-blue-400 transition-colors">
                            {post.title}
                          </h4>
                          <p className="text-[9px] text-slate-500 font-mono mt-0.5 truncate max-w-[160px] xl:max-w-xs">
                            {post.slug?.current}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 xl:px-4 py-3">
                      <StatusBadge status={post.status} />
                    </td>
                    <td className="px-3 xl:px-4 py-3">
                      <div className="h-8 w-20">
                        <Sparkline
                          data={[12, 18, 14, 22, 19, 26, 30]}
                          color="#3b82f6"
                        />
                      </div>
                    </td>
                    <td className="px-3 xl:px-4 py-3 text-right">
                      <span className="text-xs font-black text-slate-300">
                        {post.views}
                      </span>
                    </td>
                    <td className="px-3 xl:px-4 py-3 text-right">
                      <span className="text-[10px] font-bold text-slate-500">
                        {post.date?.current}
                      </span>
                    </td>
                    <td className="px-4 xl:px-6 py-3">
                      <div className="flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-all transform translate-x-1 group-hover:translate-x-0">
                        <ActionButton icon={<Edit3 size={13} />} label="Edit" />
                        <ActionButton
                          icon={<ExternalLink size={13} />}
                          label="Preview"
                        />
                        <ActionButton
                          icon={<Trash2 size={13} />}
                          label="Delete"
                          danger
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card List */}
          <div className="md:hidden divide-y divide-slate-800/50">
            {posts.map((post) => (
              <div
                key={post._id}
                className="px-4 py-4 flex items-center gap-3 relative"
              >
                <div className="size-10 rounded-xl bg-gradient-to-br from-slate-700 to-slate-800 shrink-0 shadow-lg" />
                <div className="min-w-0 flex-1">
                  <h4 className="font-bold text-white text-sm truncate">
                    {post.title}
                  </h4>
                  <div className="flex items-center gap-2 mt-1">
                    <StatusBadge status={post.status} />
                    <span className="text-[10px] text-slate-600">
                      {post.date?.current}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="text-xs text-slate-400 font-bold">
                      {post.views} views
                    </span>
                    <div className="h-6 w-16">
                      <Sparkline
                        data={[12, 18, 14, 22, 19, 26, 30]}
                        color="#3b82f6"
                      />
                    </div>
                  </div>
                </div>
                {/* Mobile action dropdown */}
                <div className="relative shrink-0">
                  <button
                    onClick={() => toggleAction(post._id)}
                    className="p-2 rounded-lg text-slate-500 hover:text-white hover:bg-slate-800 transition-all"
                  >
                    <MoreVertical size={16} />
                  </button>
                  {openActionId === post._id && (
                    <div className="absolute right-0 top-9 z-20 bg-slate-900 border border-slate-700 rounded-xl shadow-xl w-36 overflow-hidden">
                      <button
                        onClick={() => setOpenActionId(null)}
                        className="absolute top-2 right-2 text-slate-600 hover:text-slate-300"
                      >
                        <X size={12} />
                      </button>
                      {[
                        { icon: <Edit3 size={14} />, label: "Edit" },
                        { icon: <ExternalLink size={14} />, label: "Preview" },
                        {
                          icon: <Trash2 size={14} />,
                          label: "Delete",
                          danger: true,
                        },
                      ].map(({ icon, label, danger }) => (
                        <button
                          key={label}
                          className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-bold transition-colors ${
                            danger
                              ? "text-slate-400 hover:text-red-400 hover:bg-red-400/10"
                              : "text-slate-400 hover:text-blue-400 hover:bg-blue-400/10"
                          }`}
                        >
                          {icon}
                          {label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="px-4 py-3 flex items-center justify-between bg-slate-950/30 border-t border-slate-800">
            <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">
              Page 1 of 5
            </p>
            <div className="flex gap-1.5">
              <button
                className="p-1.5 rounded-md border border-slate-800 text-slate-600 hover:text-white hover:border-slate-600 transition-all disabled:opacity-30"
                disabled
              >
                <ChevronLeft size={14} />
              </button>
              <button className="p-1.5 rounded-md border border-slate-800 text-slate-400 hover:text-white hover:border-slate-600 transition-all">
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// --- Sub-components ---

const StatCard = ({
  icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: string;
}) => (
  <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-3 flex items-center justify-between group hover:border-slate-700 transition-all">
    <div className="min-w-0">
      <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest truncate">
        {label}
      </p>
      <h4 className="text-base md:text-lg font-black text-white mt-0.5">
        {value}
      </h4>
    </div>
    <div className="size-7 md:size-8 rounded-lg bg-slate-950 flex items-center justify-center border border-slate-800 group-hover:scale-110 transition-transform shrink-0 ml-2">
      {icon}
    </div>
  </div>
);

const StatusBadge = ({ status }: { status: string }) => {
  const styles: any = {
    Published: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    Scheduled: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    Draft: "bg-slate-500/10 text-slate-500 border-slate-500/20",
  };
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-tight border ${styles[status] ?? styles.Draft}`}
    >
      <span
        className={`size-1.5 rounded-full ${status === "Published" ? "bg-emerald-400 animate-pulse" : "bg-current opacity-50"}`}
      />
      {status}
    </span>
  );
};

const Sparkline = ({ data, color }: { data: number[]; color: string }) => (
  <Line
    data={{
      labels: data.map((_, i) => i.toString()),
      datasets: [
        {
          data,
          borderColor: color,
          backgroundColor: "transparent",
          tension: 0.4,
          pointRadius: 0,
          borderWidth: 2,
        },
      ],
    }}
    options={{
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false }, tooltip: { enabled: false } },
      scales: { x: { display: false }, y: { display: false } },
    }}
  />
);

const ActionButton = ({
  icon,
  label,
  danger = false,
}: {
  icon: any;
  label: string;
  danger?: boolean;
}) => (
  <button
    title={label}
    className={`p-1.5 xl:p-2 rounded-lg transition-all ${
      danger
        ? "text-slate-500 hover:text-red-400 hover:bg-red-400/10"
        : "text-slate-500 hover:text-blue-400 hover:bg-blue-400/10"
    }`}
  >
    {icon}
  </button>
);

export default BlogManagement;
