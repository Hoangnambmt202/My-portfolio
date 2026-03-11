/* eslint-disable @typescript-eslint/no-explicit-any */
export default function StatCard({
  label,
  value,
  Icon,
  color,
  glow,
  iconBg,
}: {
  label: string;
  value: number;
  Icon: any;
  color: string;
  glow: string;
  iconBg: string;
}) {
  return (
    <div className="relative flex-1 flex items-center justify-between p-6 bg-slate-800/40 rounded-xl border border-white/[0.06]">
      <div className="flex flex-col gap-0.5">
        <span className={`text-sm font-medium ${color} opacity-80`}>
          {label}
        </span>
        <span className={`text-3xl font-extrabold ${color}`}>{value}</span>
      </div>

      <div className={`p-3 rounded-lg ${iconBg}`}>
        <Icon className={`w-5 h-5 ${color}`} />
      </div>

      <div
        className={`absolute -right-6 -bottom-6 w-24 h-24 rounded-full blur-2xl ${glow}`}
      />
    </div>
  );
}
