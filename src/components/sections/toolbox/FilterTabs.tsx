import { SkillGroup } from "@/types/features/skill";

interface FilterTabsProps {
  groups: SkillGroup[];
  activeGroupId: string | null;
  onChange: (groupId: string | null) => void;
}

export default function FilterTabs({
  groups,
  activeGroupId,
  onChange,
}: FilterTabsProps) {
  return (
    <div className="mb-10 overflow-x-auto scrollbar-hide sm:mx-0 w-full custom-scrollbar pb-2">
      <div className="flex w-full border-b border-[#137fec]/10 px-4 sm:px-0">
        <button
          onClick={() => onChange(null)}
          className={[
            "px-4 py-3 text-sm font-bold whitespace-nowrap transition-colors duration-200 border-b-2 -mb-px",
            activeGroupId === null
              ? "border-[#137fec] text-[#137fec]"
              : "border-transparent text-slate-500 hover:text-[#137fec]",
          ].join(" ")}
        >
          All Tools
        </button>
        {groups.map((group) => (
          <button
            key={group.id}
            onClick={() => onChange(group.id)}
            className={[
              "px-4 py-3 text-sm font-bold whitespace-nowrap transition-colors duration-200 border-b-2 -mb-px",
              activeGroupId === group.id
                ? "border-[#137fec] text-[#137fec]"
                : "border-transparent text-slate-500 hover:text-[#137fec]",
            ].join(" ")}
          >
            {group.name}
          </button>
        ))}
      </div>
    </div>
  );
}
