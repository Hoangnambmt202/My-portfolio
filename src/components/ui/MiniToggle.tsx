const MiniToggle = ({
  active,
  onChange,
}: {
  active: boolean;
  onChange: () => void;
}) => (
  <button
    onClick={onChange}
    className="relative shrink-0 rounded-full transition-colors"
    style={{ height: "20px", width: "36px", background: active ? "#2563eb" : "#334155" }}
  >
    <div
      className="absolute top-[3px] left-[3px] size-[14px] bg-white rounded-full shadow transition-transform"
      style={{ transform: active ? "translateX(16px)" : "translateX(0)" }}
    />
  </button>
);

export default MiniToggle;