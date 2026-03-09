"use client";

import { ArrowRight, Copy, Check, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import LanguageDropdown from "./LanguageDropdown";

type TargetPanelProps = {
  targetLang: string;
  setTargetLang: (lang: string) => void;
  translatedText: string;
  copied: boolean;
  handleCopy: () => void;
  isTranslating: boolean;
};

const speakText = (text: string, lang: string) => {
  if (!text) return;

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;

  window.speechSynthesis.speak(utterance);
};

export function TargetPanel({
  targetLang,
  setTargetLang,
  translatedText,
  copied,
  handleCopy,
  isTranslating,
}: TargetPanelProps) {
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <div className="flex items-center gap-3">
          <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
          <LanguageDropdown
            value={targetLang}
            onChange={setTargetLang}
            excludeAuto
          />
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-foreground cursor-pointer"
            disabled={!translatedText}
            onClick={() => speakText(translatedText, targetLang)}
          >
            <Volume2 className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleCopy}
            disabled={!translatedText}
            className="h-8 w-8 text-muted-foreground hover:text-foreground cursor-pointer"
          >
            {copied ? (
              <Check className="w-4 h-4" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>

      <div className="relative flex-1 min-h-[240px] p-4">
        {isTranslating ? (
          <div className="flex items-center gap-2 text-muted-foreground">
            <span className="w-4 h-4 border-2 border-muted-foreground/30 border-t-muted-foreground rounded-full animate-spin" />
            <span className="text-sm">Translating...</span>
          </div>
        ) : (
          <div
            className={cn(
              "text-[15px] leading-relaxed",
              translatedText ? "text-foreground" : "text-muted-foreground/40",
            )}
          >
            {translatedText || "Translation will appear here..."}
          </div>
        )}
      </div>
    </div>
  );
}
