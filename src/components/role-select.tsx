"use client";

type RoleId =
  | "frontend"
  | "backend"
  | "fullstack"
  | "qa"
  | "data"
  | "devops"
  | "mobile";

interface RoleSelectProps {
  value: RoleId | "";
  onChange: (value: RoleId) => void;
  t: (key: string) => string;
}

export function RoleSelect({ value, onChange, t }: RoleSelectProps) {
  const ROLES: RoleId[] = [
    "frontend",
    "backend",
    "fullstack",
    "qa",
    "data",
    "devops",
    "mobile",
  ];

  return (
    <div className="grid grid-cols-2 gap-3">
      {ROLES.map((role) => {
        const isActive = value === role;
        return (
          <button
            key={role}
            type="button"
            onClick={() => onChange(role)}
            className={`rounded-lg border p-3 text-sm font-medium transition
              ${
                isActive
                  ? "border-blue-600 bg-blue-50 text-blue-700"
                  : "border-gray-200 hover:bg-gray-50"
              }`}>
            {t(`roles.${role}`)}
          </button>
        );
      })}
    </div>
  );
}
