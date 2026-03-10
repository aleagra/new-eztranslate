"use client";

import { cn } from "@/lib/utils";
import LanguageDropdown from "./LanguageDropdown";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import { useRef, useState } from "react";
const MAX_CHARS = 1000;

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
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [limitError, setLimitError] = useState(false);

  const handleSourceChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;

    if (value.length > MAX_CHARS) return;

    setSourceText(value);

    const el = textareaRef.current;
    if (!el) return;

    if (value.length === 0) {
      el.style.height = "";
      return;
    }

    el.style.height = "auto";
    el.style.height = el.scrollHeight + "px";
  };

  const handleClear = () => {
    setSourceText("");

    const el = textareaRef.current;
    if (el) {
      el.style.height = "240px";
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const pastedText = e.clipboardData.getData("text");
    const newLength = sourceText.length + pastedText.length;

    if (newLength > MAX_CHARS) {
      e.preventDefault();
      setLimitError(true);

      setTimeout(() => setLimitError(false), 2500);
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
          ref={textareaRef}
          value={sourceText}
          onChange={handleSourceChange}
          spellCheck={false}
          onPaste={handlePaste}
          autoCorrect="off"
          autoCapitalize="off"
          placeholder="Enter text..."
          className="w-full min-h-[240px] py-4 pl-4 pr-10 pb-8 bg-transparent text-foreground placeholder:text-muted-foreground/40 resize-none overflow-hidden focus:outline-none text-[15px] leading-relaxed"
        />

        {limitError && (
          <div className="absolute bottom-2 left-2 text-sm text-destructive bg-background/80 backdrop-blur px-2 py-1 rounded">
            Character limit exceeded (max {MAX_CHARS})
          </div>
        )}

        {sourceText && (
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClear}
            className="absolute top-3 right-2 h-7 w-7 cursor-pointer text-muted-foreground hover:text-foreground"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
