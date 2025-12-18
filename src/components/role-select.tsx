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
    <div>
      <label className="mb-3 block text-sm font-semibold text-foreground">
        Select your target role
      </label>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {ROLES.map((role) => {
          const isActive = value === role;
          return (
            <button
              key={role}
              type="button"
              onClick={() => onChange(role)}
              className={`rounded-lg border-2 px-4 py-3 text-sm font-semibold transition-all
              ${
                isActive
                  ? "border-primary bg-primary text-primary-foreground shadow-md"
                  : "border-border bg-background text-foreground hover:border-primary/50 hover:bg-muted/50"
              }`}>
              {t(`roles.${role}`)}
            </button>
          );
        })}
      </div>
    </div>
  );
}
