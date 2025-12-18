const ROLES = [
  { id: "frontend", label: "Frontend Developer" },
  { id: "backend", label: "Backend Developer" },
  { id: "fullstack", label: "Fullstack Developer" },
  { id: "qa", label: "QA Engineer" },
  { id: "data", label: "Data Analyst / Engineer" },
  { id: "devops", label: "DevOps / Platform Engineer" },
  { id: "mobile", label: "Mobile Developer" },
];

export function RoleSelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {ROLES.map((role) => (
        <button
          key={role.id}
          type="button"
          onClick={() => onChange(role.id)}
          className={`rounded-lg border p-3 text-sm transition
            ${
              value === role.id
                ? "border-blue-600 bg-blue-50"
                : "border-gray-200 hover:bg-gray-50"
            }`}>
          {role.label}
        </button>
      ))}
    </div>
  );
}
