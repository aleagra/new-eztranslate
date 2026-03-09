export function Header() {
  return (
    <header className="border-b border-border">
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold tracking-tight">
            EZTranslate
          </span>
        </div>

        <div className="flex items-center gap-1">
          <span className="text-xs text-muted-foreground font-mono">v2.0</span>
        </div>
      </div>
    </header>
  );
}
