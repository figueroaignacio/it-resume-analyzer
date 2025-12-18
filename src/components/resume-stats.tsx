export function ResumeStats({ scores }: { scores: Record<string, number> }) {
  if (!scores) return null;

  return (
    <div className="rounded-xl border p-6">
      <h3 className="mb-4 font-semibold">Scores</h3>
      <div className="space-y-2 text-sm">
        {Object.entries(scores).map(([key, value]) => (
          <div
            key={key}
            className="flex justify-between border-b border-gray-50 pb-1">
            {/* Reemplazamos camelCase por espacios para que se vea bien */}
            <span className="capitalize">{key.replace(/([A-Z])/g, " $1")}</span>
            <span className="font-medium text-blue-600">{value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
