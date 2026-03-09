"use client";

import { cn } from "@/lib/utils";
import LanguageDropdown from "./LanguageDropdown";

const MAX_CHARS = 5000;

type SourcePanelProps = {
  sourceText: string;
  setSourceText: (text: string) => void;
  sourceLang: string;
  setSourceLang: (lang: string) => void;
};

export function SourcePanel({
  sourceText,
  setSourceText,
  sourceLang,
  setSourceLang,
}: SourcePanelProps) {
  const handleSourceChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;

    if (value.length <= MAX_CHARS) {
      setSourceText(value);
    }
  };

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <LanguageDropdown
          value={sourceLang}
          onChange={setSourceLang}
          label="Source"
        />

        <span
          className={cn(
            "text-xs font-mono transition-colors",
            sourceText.length > MAX_CHARS * 0.9
              ? "text-destructive"
              : "text-muted-foreground",
          )}
        >
          {sourceText.length}/{MAX_CHARS}
        </span>
      </div>

      {/* Textarea */}
      <div className="relative flex-1 min-h-[240px]">
        <textarea
          value={sourceText}
          onChange={handleSourceChange}
          placeholder="Enter text..."
          className="absolute inset-0 w-full h-full p-4 bg-transparent text-foreground placeholder:text-muted-foreground/40 resize-none focus:outline-none text-[15px] leading-relaxed"
        />
      </div>
    </div>
  );
}
