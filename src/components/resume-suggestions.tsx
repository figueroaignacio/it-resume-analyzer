export function ResumeSuggestions({ suggestions }: { suggestions: string[] }) {
  return (
    <div className="rounded-xl border p-6">
      <h3 className="mb-4 font-semibold">Suggestions</h3>

      <ul className="list-disc space-y-2 pl-5 text-sm text-gray-700">
        {suggestions.map((s, i) => (
          <li key={i}>{s}</li>
        ))}
      </ul>
    </div>
  );
}
