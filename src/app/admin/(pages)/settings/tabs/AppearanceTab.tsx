import React, { useState } from "react";
import { Moon, Sun } from "lucide-react";
import Toggle  from "@/components/ui/Toggle";

export const AppearanceTab = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="bg-slate-950/50 border border-slate-800 rounded-2xl p-5">
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">
          Theme Engine
        </h3>
        <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-xl border border-slate-800">
          <div className="flex items-center gap-3">
            <div
              className={`p-2.5 rounded-xl ${isDarkMode ? "bg-purple-500/10 text-purple-400" : "bg-yellow-500/10 text-yellow-500"}`}
            >
              {isDarkMode ? <Moon size={18} /> : <Sun size={18} />}
            </div>
            <div>
              <p className="font-black text-white text-xs uppercase tracking-tight">Dark Appearance</p>
              <p className="text-[10px] text-slate-500">Optimize UI for low-light environments</p>
            </div>
          </div>
          <Toggle active={isDarkMode} onChange={setIsDarkMode} />
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Accent Color</h3>
        <div className="grid grid-cols-6 gap-3">
          {["blue", "purple", "emerald", "orange", "rose", "cyan"].map((color) => (
            <div key={color} className="group cursor-pointer text-center space-y-1.5">
              <div
                className={`w-full aspect-square rounded-xl bg-${color}-500/20 border-2 border-transparent group-hover:border-${color}-500 transition-all flex items-center justify-center`}
              >
                <div className={`w-6 h-6 rounded-full bg-${color}-500`} />
              </div>
              <p className="text-[9px] font-bold text-slate-500 uppercase">{color}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};