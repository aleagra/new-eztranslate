import { developers } from "@/lib/developerts";
import { Github, Linkedin, Globe } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">Built by</p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {developers.map((dev) => (
              <div key={dev.name} className="flex items-center gap-2">
                <span className="text-sm text-foreground">{dev.name}</span>
                <div className="flex items-center">
                  {dev.linkedin && (
                    <a
                      href={dev.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Linkedin className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {dev.github && (
                    <a
                      href={dev.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Github className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {dev.website && (
                    <a
                      href={dev.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Globe className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground font-mono">2026</p>
        </div>
      </div>
    </footer>
  );
}
