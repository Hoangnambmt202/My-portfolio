"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import {
  Search, Plus, GripVertical, Edit3, Trash2,
  LayoutGrid, List, FolderOpen, Layers,
  ChevronRight, RefreshCw, Star, X,
} from "lucide-react";
import Breadcrumb from "@/components/ui/Breadcrumb";
import SkillModal from "@/components/admin/skill/SkillModal";
import GroupModal from "@/components/admin/skill/GroupModal";
import SkillCard from "@/components/admin/skill/SkillCard";
import SkillRow from "@/components/admin/skill/SkillRow";
import DeleteConfirmModal from "@/components/admin/skill/DeleteConfirmModal";
import { skillsApi } from "@/lib/api/skills";
import { Skill, SkillGroup } from "@/types/features/skill";

type ViewMode = "grid" | "list";
type ModalType =
  | "createSkill"
  | "editSkill"
  | "createGroup"
  | "editGroup"
  | "deleteSkill"
  | "deleteGroup"
  | null;

// ─── Drag-and-Drop hook (no external lib) ────────────────────────────────────
function useDragSort<T extends { id: string; order: number }>(
  items: T[],
  onReorder: (items: T[]) => Promise<void>
) {
  const [list, setList] = useState<T[]>(items);
  const draggingId = useRef<string | null>(null);

  useEffect(() => {
    setList(items);
  }, [items]);

  const onDragStart = (id: string) => {
    draggingId.current = id;
  };

  const onDragOver = (e: React.DragEvent, overId: string) => {
    e.preventDefault();
    if (!draggingId.current || draggingId.current === overId) return;
    setList((prev) => {
      const from = prev.findIndex((i) => i.id === draggingId.current);
      const to = prev.findIndex((i) => i.id === overId);
      if (from === -1 || to === -1) return prev;
      const next = [...prev];
      const [moved] = next.splice(from, 1);
      next.splice(to, 0, moved);
      return next;
    });
  };

  const onDrop = async () => {
    draggingId.current = null;
    const reordered = list.map((item, idx) => ({ ...item, order: idx }));
    setList(reordered);
    await onReorder(reordered);
  };

  return { list, onDragStart, onDragOver, onDrop };
}

// ─── Group Sidebar ────────────────────────────────────────────────────────────
function GroupSidebar({
  groups,
  activeGroupId,
  onSelectGroup,
  onEditGroup,
  onDeleteGroup,
  onCreateGroup,
  onDragStart,
  onDragOver,
  onDrop,
}: {
  groups: SkillGroup[];
  activeGroupId: string | null;
  onSelectGroup: (id: string | null) => void;
  onEditGroup: (g: SkillGroup) => void;
  onDeleteGroup: (g: SkillGroup) => void;
  onCreateGroup: () => void;
  onDragStart: (id: string) => void;
  onDragOver: (e: React.DragEvent, id: string) => void;
  onDrop: () => Promise<void>;
}) {
  return (
    <section className="w-72 border-r border-slate-800/60 flex flex-col bg-slate-950/40">
      <div className="p-5 border-b border-slate-800/60">
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">
            Skill Groups
          </h2>
          <button
            onClick={onCreateGroup}
            className="flex items-center gap-1 text-[10px] font-bold text-blue-400 hover:text-white transition-colors px-2 py-1 rounded-lg hover:bg-blue-600/10 cursor-pointer"
          >
            <Plus size={12} /> New
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-1">
        {/* All skills */}
        <button
          onClick={() => onSelectGroup(null)}
          className={`w-full flex items-center justify-between p-3 rounded-xl transition-all cursor-pointer ${
            activeGroupId === null
              ? "bg-blue-600/10 border border-blue-500/20"
              : "hover:bg-slate-900 border border-transparent"
          }`}
        >
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${activeGroupId === null ? "bg-blue-600/20 text-blue-400" : "bg-slate-900 text-slate-500"}`}>
              <Layers size={15} />
            </div>
            <div className="text-left">
              <p className={`text-sm font-bold ${activeGroupId === null ? "text-white" : "text-slate-400"}`}>
                All Skills
              </p>
            </div>
          </div>
          {activeGroupId === null && <div className="size-1.5 rounded-full bg-blue-500 animate-pulse" />}
        </button>

        {/* Ungrouped */}
        <button
          onClick={() => onSelectGroup("ungrouped")}
          className={`w-full flex items-center justify-between p-3 rounded-xl transition-all cursor-pointer ${
            activeGroupId === "ungrouped"
              ? "bg-blue-600/10 border border-blue-500/20"
              : "hover:bg-slate-900 border border-transparent"
          }`}
        >
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${activeGroupId === "ungrouped" ? "bg-blue-600/20 text-blue-400" : "bg-slate-900 text-slate-500"}`}>
              <FolderOpen size={15} />
            </div>
            <div className="text-left">
              <p className={`text-sm font-bold ${activeGroupId === "ungrouped" ? "text-white" : "text-slate-400"}`}>
                Ungrouped
              </p>
            </div>
          </div>
          {activeGroupId === "ungrouped" && <div className="size-1.5 rounded-full bg-blue-500 animate-pulse" />}
        </button>

        {groups.length > 0 && (
          <div className="pt-2 pb-1">
            <p className="text-[9px] font-bold text-slate-700 uppercase tracking-widest px-2 mb-1">Groups</p>
          </div>
        )}

        {/* Groups list (draggable) */}
        {groups.map((group) => {
          const count = (group._count as { skills: number } | undefined)?.skills ?? 0;
          return (
            <div
              key={group.id}
              draggable
              onDragStart={() => onDragStart(group.id)}
              onDragOver={(e) => onDragOver(e, group.id)}
              onDrop={onDrop}
              className="group/item"
            >
              <button
                onClick={() => onSelectGroup(group.id)}
                className={`w-full flex items-center justify-between p-3 rounded-xl transition-all cursor-pointer ${
                  activeGroupId === group.id
                    ? "bg-blue-600/10 border border-blue-500/20"
                    : "hover:bg-slate-900 border border-transparent"
                }`}
              >
                <div className="flex items-center gap-3">
                  <GripVertical
                    size={14}
                    className="text-slate-700 group-hover/item:text-slate-500 cursor-grab shrink-0"
                  />
                  <div
                    className="size-8 rounded-lg flex items-center justify-center shrink-0"
                    style={{
                      backgroundColor: `${group.color}18`,
                      border: `1px solid ${group.color}30`,
                    }}
                  >
                    <div className="size-2 rounded-full" style={{ backgroundColor: group.color }} />
                  </div>
                  <div className="text-left min-w-0">
                    <p className={`text-sm font-bold truncate ${activeGroupId === group.id ? "text-white" : "text-slate-400"}`}>
                      {group.name}
                    </p>
                    <p className="text-[10px] text-slate-600">{count} skill{count !== 1 ? "s" : ""}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover/item:opacity-100 transition-opacity">
                  <span
                    onClick={(e) => { e.stopPropagation(); onEditGroup(group); }}
                    className="p-1 hover:bg-slate-800 rounded-md text-slate-500 hover:text-blue-400 transition-colors cursor-pointer"
                  >
                    <Edit3 size={11} />
                  </span>
                  <span
                    onClick={(e) => { e.stopPropagation(); onDeleteGroup(group); }}
                    className="p-1 hover:bg-slate-800 rounded-md text-slate-500 hover:text-red-400 transition-colors cursor-pointer"
                  >
                    <Trash2 size={11} />
                  </span>
                </div>
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function SkillsManagement() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [groups, setGroups] = useState<SkillGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [search, setSearch] = useState("");
  const [activeGroupId, setActiveGroupId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [modal, setModal] = useState<ModalType>(null);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<SkillGroup | null>(null);

  // ── Data fetching ──
  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const [skillsRes, groupsRes] = await Promise.all([
        skillsApi.getAll(),
        skillsApi.getAllGroups(),
      ]);
      if (skillsRes.success) setSkills(skillsRes.data);
      if (groupsRes.success) setGroups(groupsRes.data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  // ── Filtered skills ──
  const filteredSkills = skills.filter((s) => {
    const matchSearch = search
      ? s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.whenToUse?.toLowerCase().includes(search.toLowerCase()) ||
        s.whyItMatters?.toLowerCase().includes(search.toLowerCase())
      : true;
    const matchGroup =
      activeGroupId === null
        ? true
        : activeGroupId === "ungrouped"
        ? !s.groupId
        : s.groupId === activeGroupId;
    return matchSearch && matchGroup;
  });

  // ── Drag & drop for skills ──
  const {
    list: sortedSkills,
    onDragStart: onSkillDragStart,
    onDragOver: onSkillDragOver,
    onDrop: onSkillDrop,
  } = useDragSort(filteredSkills, async (reordered) => {
    await skillsApi.reorder(reordered.map((s, i) => ({ id: s.id, order: i })));
  });

  // ── Drag & drop for groups ──
  const {
    list: sortedGroups,
    onDragStart: onGroupDragStart,
    onDragOver: onGroupDragOver,
    onDrop: onGroupDrop,
  } = useDragSort(groups, async (reordered) => {
    await skillsApi.reorderGroups(reordered.map((g, i) => ({ id: g.id, order: i })));
  });

  // ── Handlers: Skills ──
  const handleCreateSkill = async (fd: FormData) => {
    await skillsApi.create(fd);
    await fetchAll();
  };

  const handleUpdateSkill = async (fd: FormData) => {
    if (!selectedSkill) return;
    await skillsApi.update(selectedSkill.id, fd);
    await fetchAll();
  };

  const handleDeleteSkill = async () => {
    if (!selectedSkill) return;
    setDeleting(true);
    try {
      await skillsApi.delete(selectedSkill.id);
      await fetchAll();
      setModal(null);
    } finally {
      setDeleting(false);
    }
  };

  // ── Handlers: Groups ──
  const handleCreateGroup = async (data: {
    name: string; description?: string; color?: string; icon?: string;
  }) => {
    await skillsApi.createGroup(data);
    await fetchAll();
  };

  const handleUpdateGroup = async (data: {
    name?: string; description?: string; color?: string; icon?: string;
  }) => {
    if (!selectedGroup) return;
    await skillsApi.updateGroup(selectedGroup.id, data);
    await fetchAll();
  };

  const handleDeleteGroup = async () => {
    if (!selectedGroup) return;
    setDeleting(true);
    try {
      await skillsApi.deleteGroup(selectedGroup.id);
      if (activeGroupId === selectedGroup.id) setActiveGroupId(null);
      await fetchAll();
      setModal(null);
    } finally {
      setDeleting(false);
    }
  };

  // ── Active group label ──
  const activeGroupLabel = (() => {
    if (activeGroupId === null) return "All Skills";
    if (activeGroupId === "ungrouped") return "Ungrouped";
    return groups.find((g) => g.id === activeGroupId)?.name ?? "Skills";
  })();

  const activeGroupColor = (() => {
    if (!activeGroupId || activeGroupId === "ungrouped") return "#3b82f6";
    return groups.find((g) => g.id === activeGroupId)?.color ?? "#3b82f6";
  })();

  return (
    <div className="flex h-screen bg-slate-950 text-slate-200 font-sans selection:bg-blue-500/30 overflow-hidden">
      <main className="flex-1 flex flex-col overflow-hidden bg-[radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.05),transparent_60%)]">

        {/* ── Header ── */}
        <header className="h-16 border-b border-slate-800/60 flex items-center justify-between px-6 bg-slate-950/70 backdrop-blur-xl z-20 shrink-0 gap-4">
          <Breadcrumb />

          {/* Search */}
          <div className="relative flex-1 max-w-sm group">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors"
              size={15}
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search skills, contexts..."
              className="w-full bg-slate-900/60 border border-slate-800 rounded-full py-2 pl-9 pr-9 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500/30 focus:border-blue-500 transition-all placeholder:text-slate-600"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
              >
                <X size={13} />
              </button>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={fetchAll}
              className="p-2 text-slate-500 hover:text-white hover:bg-slate-800 rounded-lg transition-all"
              title="Refresh"
            >
              <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
            </button>
            <button
              onClick={() => { setSelectedGroup(null); setModal("createGroup"); }}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl text-xs font-bold transition-all border border-slate-700"
            >
              <Layers size={14} /> New Group
            </button>
            <button
              onClick={() => { setSelectedSkill(null); setModal("createSkill"); }}
              className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all active:scale-95 shadow-lg shadow-blue-900/20"
            >
              <Plus size={15} /> Add Skill
            </button>
          </div>
        </header>

        <div className="flex-1 flex overflow-hidden">
          {/* ── Group Sidebar ── */}
          <GroupSidebar
            groups={sortedGroups}
            activeGroupId={activeGroupId}
            onSelectGroup={setActiveGroupId}
            onEditGroup={(g) => { setSelectedGroup(g); setModal("editGroup"); }}
            onDeleteGroup={(g) => { setSelectedGroup(g); setModal("deleteGroup"); }}
            onCreateGroup={() => { setSelectedGroup(null); setModal("createGroup"); }}
            onDragStart={onGroupDragStart}
            onDragOver={onGroupDragOver}
            onDrop={onGroupDrop}
          />

          {/* ── Skills Panel ── */}
          <section className="flex-1 flex flex-col overflow-hidden">
            {/* Panel header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800/60 shrink-0">
              <div className="flex items-center gap-3">
                <div
                  className="size-2 rounded-full shrink-0"
                  style={{ backgroundColor: activeGroupColor }}
                />
                <div>
                  <h1 className="text-lg font-black text-white tracking-tight">
                    {activeGroupLabel}
                  </h1>
                  <p className="text-xs text-slate-500">
                    {filteredSkills.length} skill{filteredSkills.length !== 1 ? "s" : ""}
                    {search && ` matching "${search}"`}
                  </p>
                </div>
              </div>

              {/* View mode toggle */}
              <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                    viewMode === "grid" ? "bg-slate-700 text-white shadow-sm" : "text-slate-500 hover:text-slate-300"
                  }`}
                >
                  <LayoutGrid size={13} /> Grid
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                    viewMode === "list" ? "bg-slate-700 text-white shadow-sm" : "text-slate-500 hover:text-slate-300"
                  }`}
                >
                  <List size={13} /> List
                </button>
              </div>
            </div>

            {/* Skills content */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
              {loading ? (
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="h-36 bg-slate-800/40 rounded-2xl animate-pulse" />
                  ))}
                </div>
              ) : filteredSkills.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-center gap-3">
                  <div className="size-16 rounded-2xl bg-slate-900 flex items-center justify-center text-slate-700">
                    <Star size={28} />
                  </div>
                  <p className="text-slate-400 font-bold">
                    {search ? `No skills match "${search}"` : "No skills in this group"}
                  </p>
                  <p className="text-sm text-slate-600 max-w-xs">
                    {search ? "Try a different search term" : "Add your first skill to get started"}
                  </p>
                  {!search && (
                    <button
                      onClick={() => { setSelectedSkill(null); setModal("createSkill"); }}
                      className="mt-2 flex items-center gap-2 px-4 py-2 bg-blue-600/10 hover:bg-blue-600 text-blue-400 hover:text-white border border-blue-500/30 hover:border-blue-500 rounded-xl text-sm font-bold transition-all"
                    >
                      <Plus size={15} /> Add Skill
                    </button>
                  )}
                </div>
              ) : viewMode === "grid" ? (
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                  {sortedSkills.map((skill) => (
                    <div
                      key={skill.id}
                      draggable
                      onDragStart={() => onSkillDragStart(skill.id)}
                      onDragOver={(e) => onSkillDragOver(e, skill.id)}
                      onDrop={onSkillDrop}
                    >
                      <SkillCard
                        skill={skill}
                        onEdit={(s) => { setSelectedSkill(s); setModal("editSkill"); }}
                        onDelete={(s) => { setSelectedSkill(s); setModal("deleteSkill"); }}
                        dragHandleProps={{
                          draggable: true,
                          onDragStart: () => onSkillDragStart(skill.id),
                        }}
                      />
                    </div>
                  ))}
                  {/* Add new placeholder */}
                  <button
                    onClick={() => { setSelectedSkill(null); setModal("createSkill"); }}
                    className="group border-2 border-dashed border-slate-800 rounded-2xl p-6 flex flex-col items-center justify-center gap-3 hover:border-blue-500/50 hover:bg-blue-600/5 transition-all min-h-[120px] cursor-pointer"
                  >
                    <div className="size-11 rounded-full bg-slate-900 flex items-center justify-center text-slate-600 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-xl">
                      <Plus size={22} />
                    </div>
                    <p className="text-sm font-bold text-slate-500 group-hover:text-white transition-colors">
                      Add Skill
                    </p>
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  {sortedSkills.map((skill) => (
                    <div
                      key={skill.id}
                      draggable
                      onDragStart={() => onSkillDragStart(skill.id)}
                      onDragOver={(e) => onSkillDragOver(e, skill.id)}
                      onDrop={onSkillDrop}
                    >
                      <SkillRow
                        skill={skill}
                        onEdit={(s) => { setSelectedSkill(s); setModal("editSkill"); }}
                        onDelete={(s) => { setSelectedSkill(s); setModal("deleteSkill"); }}
                        dragHandleProps={{
                          draggable: true,
                          onDragStart: () => onSkillDragStart(skill.id),
                        }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Stats footer */}
            {!loading && skills.length > 0 && (
              <div className="border-t border-slate-800/60 px-6 py-3 flex items-center gap-6 text-[11px] text-slate-600 shrink-0">
                <span>{skills.length} total skills</span>
                <span className="flex items-center gap-1">
                  <Star size={10} className="text-amber-400" fill="currentColor" />
                  {skills.filter((s) => s.isHighlighted).length} highlighted
                </span>
                <span>{groups.length} groups</span>
                <span className="ml-auto flex items-center gap-1 text-slate-700">
                  <GripVertical size={11} /> Drag to reorder
                  <ChevronRight size={11} />
                </span>
              </div>
            )}
          </section>
        </div>
      </main>

      {/* ── Modals ── */}
      <SkillModal
        isOpen={modal === "createSkill" || modal === "editSkill"}
        onClose={() => setModal(null)}
        onSave={modal === "editSkill" ? handleUpdateSkill : handleCreateSkill}
        groups={groups}
        skill={modal === "editSkill" ? selectedSkill : null}
      />

      <GroupModal
        isOpen={modal === "createGroup" || modal === "editGroup"}
        onClose={() => setModal(null)}
        onSave={modal === "editGroup" ? handleUpdateGroup : handleCreateGroup}
        group={modal === "editGroup" ? selectedGroup : null}
      />

      <DeleteConfirmModal
        isOpen={modal === "deleteSkill"}
        onClose={() => setModal(null)}
        onConfirm={handleDeleteSkill}
        loading={deleting}
        title="Delete Skill?"
        description={`"${selectedSkill?.name}" will be permanently removed. This cannot be undone.`}
      />

      <DeleteConfirmModal
        isOpen={modal === "deleteGroup"}
        onClose={() => setModal(null)}
        onConfirm={handleDeleteGroup}
        loading={deleting}
        title="Delete Group?"
        description={`"${selectedGroup?.name}" group will be deleted. Skills in this group will become ungrouped.`}
      />
    </div>
  );
}
