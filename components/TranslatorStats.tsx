export function TranslatorStats() {
  const stats = [
    { value: "20+", label: "Languages" },
    { value: "99%", label: "Accuracy" },
    { value: "1s", label: "Response" },
    { value: "Free", label: "Forever" },
  ];

  return (
    <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-px bg-border rounded-lg overflow-hidden">
      {stats.map((stat, i) => (
        <div key={i} className="bg-card p-6 text-center">
          <p className="text-2xl font-semibold">{stat.value}</p>

          <p className="text-xs text-muted-foreground mt-1 uppercase">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
}
