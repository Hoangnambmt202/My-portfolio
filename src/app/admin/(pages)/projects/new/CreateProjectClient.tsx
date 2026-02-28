import {
  Save,
  X,
  ChevronRight,
  Image as ImageIcon,
  CloudUpload,
  Link as LinkIcon,
  Code,
  Eye,
  Plus,
  Trash2,
  FileText,
} from "lucide-react";
import Link from "next/link";
import { useProjectStore } from "@/stores/project.store";

const CreateProjectClient = () => {
  const {
    title,
    description,
    content,
    techStack,
    loading,
    error,
    setField,
    addTech,
    removeTech,
    submit,
  } = useProjectStore();
  const handleSubmit = async () => {
    const ok = await submit();
    if (ok) {
      alert("Project created successfully 🚀");
    }
  };
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-blue-500/30">
      {/* Top Header Section */}
      <header className="sticky top-0 z-10 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between py-4 gap-4">
            <div>
              <nav className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-1 tracking-wider">
                <Link
                  href="/admin/projects"
                  className="hover:text-blue-400 transition-colors"
                >
                  Projects
                </Link>
                <ChevronRight size={14} />
                <span className="text-slate-300">Create New</span>
              </nav>
              <h1 className="text-2xl font-bold text-white tracking-tight">
                Create Project
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-400 hover:text-white border border-slate-800 hover:bg-slate-900 rounded-lg transition-all">
                <Trash2 size={18} />
                <span>Discard</span>
              </button>
              <button
                onClick={handleSubmit}
                className="flex items-center gap-2 px-5 py-2 text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-lg shadow-blue-900/20 transition-all active:scale-95"
              >
                <Save size={18} />
                {loading ? "Saving..." : "Save Project"}
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Main Content */}
          <div className="lg:col-span-8 space-y-8">
            {/* Project Basic Info */}
            <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <Code className="text-blue-400" size={20} />
                </div>
                <h2 className="text-lg font-bold text-white">
                  General Information
                </h2>
              </div>

              <div className="space-y-5">
                <div className="group">
                  <label className="block text-sm font-semibold text-slate-400 mb-2 group-focus-within:text-blue-400 transition-colors">
                    Project Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={title}
                    placeholder="e.g. AI-Powered Analytics Dashboard"
                    onChange={(e) => setField("title", e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>

                <div className="group">
                  <label className="block text-sm font-semibold text-slate-400 mb-2 group-focus-within:text-blue-400 transition-colors">
                    Short Description
                  </label>
                  <textarea
                    rows={3}
                    value={description}
                    onChange={(e) => setField("description", e.target.value)}
                    placeholder="Briefly describe the core value of this project..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none"
                  ></textarea>
                  <div className="flex justify-end mt-1">
                    <span className="text-[10px] text-slate-600 uppercase font-bold tracking-widest">
                      0 / 1000 Characters
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* Media Upload Section */}
            <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-purple-500/10 rounded-lg">
                  <ImageIcon className="text-purple-400" size={20} />
                </div>
                <h2 className="text-lg font-bold text-white">Media Assets</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-slate-400">
                    Cover Image
                  </p>
                  <div className="relative aspect-square rounded-xl border-2 border-dashed border-slate-800 bg-slate-950 hover:bg-slate-900 hover:border-blue-500/50 flex flex-col items-center justify-center transition-all cursor-pointer group">
                    <CloudUpload
                      size={32}
                      className="text-slate-600 group-hover:text-blue-400 mb-2 transition-colors"
                    />
                    <span className="text-xs font-medium text-slate-500">
                      Upload 1:1
                    </span>
                    <input
                      type="file"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </div>
                </div>

                <div className="md:col-span-2 space-y-2">
                  <p className="text-sm font-semibold text-slate-400">
                    Gallery Preview
                  </p>
                  <div className="relative h-full max-h-[175px] rounded-xl border-2 border-dashed border-slate-800 bg-slate-950 hover:bg-slate-900 hover:border-blue-500/50 flex flex-col items-center justify-center transition-all cursor-pointer group">
                    <div className="flex flex-col items-center gap-2">
                      <div className="p-3 bg-slate-800 rounded-full text-slate-400 group-hover:bg-blue-500/10 group-hover:text-blue-400 transition-all">
                        <CloudUpload size={24} />
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-bold text-slate-300">
                          Drop project screenshots
                        </p>
                        <p className="text-xs text-slate-500">
                          PNG, JPG up to 10MB
                        </p>
                      </div>
                    </div>
                    <input
                      type="file"
                      multiple
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </div>
                </div>
                <div className="flex justify-end mt-1">
                  <span className="text-[10px] text-slate-600 uppercase font-bold tracking-widest">
                    Maximum file size: 10 MB
                  </span>
                </div>
              </div>
            </section>
            <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-purple-500/10 rounded-lg">
                  <FileText className="text-purple-400" size={20} />
                </div>
                <h2 className="text-lg font-bold text-white">Case Study</h2>
              </div>

              <div className="grid grid-cols-1">
                <textarea
                  rows={5}
                  value={content}
                  onChange={(e) => setField("content", e.target.value)}
                  placeholder="Briefly describe the core value of this project..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none"
                ></textarea>
              </div>
              <div className="flex justify-end mt-2">
                <span className="text-[10px] text-slate-600 uppercase font-bold tracking-widest">
                  Character count: 0 / 1000
                </span>
              </div>
            </section>
          </div>

          {/* Right Column: Settings & Meta */}
          <aside className="lg:col-span-4 space-y-6">
            {/* Status Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">
                Publishing
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-300">Current Status</span>
                  <span className="px-2.5 py-1 text-[10px] font-bold bg-amber-500/10 text-amber-500 border border-amber-500/20 rounded-full uppercase tracking-tight">
                    Draft
                  </span>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">
                    Visibility
                  </label>
                  <select className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all">
                    <option>Public</option>
                    <option>Private</option>
                    <option>Password Protected</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Tech Stack Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">
                Technologies
              </h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {techStack.map((tag) => (
                  <span key={tag} className="...">
                    {tag}
                    <X
                      size={12}
                      onClick={() => removeTech(tag)}
                      className="cursor-pointer hover:text-red-400"
                    />
                  </span>
                ))}
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Add technology..."
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      const value = e.currentTarget.value.trim();
                      if (value) {
                        addTech(value);
                        e.currentTarget.value = "";
                      }
                    }
                  }}
                  className="..."
                />
                <button className="absolute right-2 top-1.5 p-1 text-slate-500 hover:text-blue-400">
                  <Plus size={18} />
                </button>
              </div>
            </div>

            {/* Project Links */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">
                Project Links
              </h3>
              <div className="space-y-4">
                <div className="relative group">
                  <LinkIcon
                    size={16}
                    className="absolute left-3 top-3 text-slate-600 group-focus-within:text-blue-400 transition-colors"
                  />
                  <input
                    type="url"
                    placeholder="Live Demo URL"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white focus:border-blue-500 outline-none transition-all"
                  />
                </div>
                <div className="relative group">
                  <Code
                    size={16}
                    className="absolute left-3 top-3 text-slate-600 group-focus-within:text-blue-400 transition-colors"
                  />
                  <input
                    type="url"
                    placeholder="Source Code URL"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white focus:border-blue-500 outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Preview Banner */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-5 text-white shadow-lg shadow-blue-900/20">
              <Eye className="mb-3 opacity-80" />
              <h4 className="font-bold text-lg mb-1">Live Preview</h4>
              <p className="text-blue-100 text-sm mb-4">
                Check how your project card looks on the homepage.
              </p>
              <button className="w-full py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-lg text-sm font-bold transition-all">
                Preview Now
              </button>
            </div>
          </aside>
        </div>
      </main>
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm p-3 rounded-lg">
          {error}
        </div>
      )}
      <footer className="max-w-[1400px] mx-auto px-8 py-10 border-t border-slate-900 mt-12 text-center">
        <p className="text-xs font-medium text-slate-600 uppercase tracking-[0.2em]">
          © 2026 DevPortfolio • Crafting Digital Experiences
        </p>
      </footer>
    </div>
  );
};

export default CreateProjectClient;
