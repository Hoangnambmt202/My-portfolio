export default function PostTableSkeleton() {
  return (
    <div className="flex items-center gap-4 px-5 py-4 border-b border-slate-700/40 animate-pulse">
      <div className="flex-1 h-4 bg-slate-700/50 rounded" />
      <div className="w-28 h-4 bg-slate-700/40 rounded" />
      <div className="w-32 h-4 bg-slate-700/30 rounded" />
      <div className="w-20 h-4 bg-slate-700/20 rounded" />
    </div>
  );
}
