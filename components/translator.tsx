"use client";

import { useState, useCallback, useEffect } from "react";
import { Footer } from "./Footer";
import { TranslatorStats } from "./TranslatorStats";
import { Hero } from "./Hero";
import { Header } from "./Header";
import { TargetPanel } from "./TargetPanel";
import { SourcePanel } from "./SoucerPanel";
import { translateText } from "./services/translate";

export function Translator() {
  const [sourceText, setSourceText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [sourceLang, setSourceLang] = useState("auto");
  const [targetLang, setTargetLang] = useState("en");
  const [copied, setCopied] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);

  const handleTranslate = useCallback(async () => {
    if (!sourceText.trim()) return;

    setIsTranslating(true);

    const translation = await translateText(sourceText, targetLang);

    setTranslatedText(translation);

    setIsTranslating(false);
  }, [sourceText, targetLang]);

  useEffect(() => {
    if (!sourceText.trim()) {
      setTranslatedText("");
      return;
    }

    const timer = setTimeout(() => {
      handleTranslate();
    }, 250);

    return () => clearTimeout(timer);
  }, [sourceText, handleTranslate]);

  const handleCopy = async () => {
    if (!translatedText) return;

    await navigator.clipboard.writeText(translatedText);

    setCopied(true);

    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 flex flex-col">
        <Hero />

        <div className="flex-1 max-w-7xl w-full mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-border border border-border rounded-lg bg-card">
            <SourcePanel
              sourceText={sourceText}
              setSourceText={setSourceText}
              sourceLang={sourceLang}
              setSourceLang={setSourceLang}
            />

            <TargetPanel
              targetLang={targetLang}
              setTargetLang={setTargetLang}
              translatedText={translatedText}
              copied={copied}
              handleCopy={handleCopy}
              isTranslating={isTranslating}
            />
          </div>

          <TranslatorStats />
        </div>
      </main>

      <Footer />
    </div>
  );
}
