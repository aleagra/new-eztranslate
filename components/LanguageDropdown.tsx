"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronDown, Search, X, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { languages } from "@/lib/languajes";

type Props = {
  value: string;
  onChange: (value: string) => void;
  excludeAuto?: boolean;
  label?: string;
};

export default function LanguageDropdown({
  value,
  onChange,
  excludeAuto = false,
  label,
}: Props) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const selected = languages.find((l) => l.code === value);

  const filteredLanguages = languages
    .filter((l) => (excludeAuto ? l.code !== "auto" : true))
    .filter(
      (l) =>
        l.name.toLowerCase().includes(search.toLowerCase()) ||
        l.code.toLowerCase().includes(search.toLowerCase()),
    );

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
    if (!open) setSearch("");
  }, [open]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    if (open) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [open]);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium cursor-pointer text-foreground transition-colors"
      >
        {selected?.flag && (
          <span className="text-[10px] font-mono text-muted-foreground/70">
            {selected.flag}
          </span>
        )}

        <span>{selected?.name || label}</span>

        <ChevronDown
          className={cn(
            "w-3.5 h-3.5 text-muted-foreground transition-transform",
            open && "rotate-180",
          )}
        />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />

          <div className="absolute top-full left-0 mt-2 z-50 w-[280px] bg-card border border-border rounded-lg shadow-xl overflow-hidden">
            {/* SEARCH */}
            <div className="relative border-b border-border">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />

              <input
                ref={inputRef}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar idioma..."
                className="w-full pl-9 pr-9 py-3 bg-transparent text-sm focus:outline-none"
              />

              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* LIST */}
            <div className="max-h-[280px] overflow-y-auto py-1">
              {filteredLanguages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    onChange(lang.code);
                    setOpen(false);
                  }}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2 text-sm",
                    value === lang.code
                      ? "bg-secondary text-foreground"
                      : "text-muted-foreground hover:bg-secondary/50",
                  )}
                >
                  <span className="text-[10px] font-mono w-8">{lang.flag}</span>

                  <span className="flex-1">{lang.name}</span>

                  {value === lang.code && <Check className="w-4 h-4" />}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
