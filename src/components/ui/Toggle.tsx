const Toggle = ({
  active,
  onChange,
}: {
  active: boolean;
  onChange: (v: boolean) => void;
}) => (
  <button
    onClick={() => onChange(!active)}
    className={`relative w-11 h-6 rounded-full transition-colors ${active ? "bg-blue-600" : "bg-slate-800"}`}
  >
    <div
      className={`absolute top-1 left-1 size-4 bg-white rounded-full shadow transition-transform ${active ? "translate-x-5" : ""}`}
    />
  </button>
);

export default Toggle;