 const InputGroup = ({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) => (
  <div className="group space-y-1.5">
    <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] group-focus-within:text-blue-400 transition-colors">
      {label}
    </label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
    />
  </div>
);

// ─── IconInputGroup ────────────────────────────────
export const IconInputGroup = ({
  label,
  icon,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  icon: React.ReactNode;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) => (
  <div className="group space-y-1.5">
    <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.15em] group-focus-within:text-blue-400 transition-colors">
      {label}
    </label>
    <div className="relative">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
        {icon}
      </div>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder:text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
      />
    </div>
  </div>
);
export default InputGroup;