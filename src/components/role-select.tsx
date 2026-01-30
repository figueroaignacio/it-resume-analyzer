"use client";

import {
  BarChart3,
  Code2,
  Database,
  Layers,
  Server,
  Smartphone,
  TestTube,
} from "lucide-react";
import { motion } from "motion/react";

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

const ROLE_ICONS: Record<RoleId, any> = {
  frontend: Code2,
  backend: Server,
  fullstack: Layers,
  qa: TestTube,
  data: BarChart3,
  devops: Database,
  mobile: Smartphone,
};

const ROLE_COLORS: Record<
  RoleId,
  { bg: string; border: string; text: string; hover: string }
> = {
  frontend: {
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/30",
    text: "text-cyan-300",
    hover: "hover:border-cyan-500/60 hover:bg-cyan-500/20",
  },
  backend: {
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/30",
    text: "text-emerald-300",
    hover: "hover:border-emerald-500/60 hover:bg-emerald-500/20",
  },
  fullstack: {
    bg: "bg-violet-500/10",
    border: "border-violet-500/30",
    text: "text-violet-300",
    hover: "hover:border-violet-500/60 hover:bg-violet-500/20",
  },
  qa: {
    bg: "bg-fuchsia-500/10",
    border: "border-fuchsia-500/30",
    text: "text-fuchsia-300",
    hover: "hover:border-fuchsia-500/60 hover:bg-fuchsia-500/20",
  },
  data: {
    bg: "bg-amber-500/10",
    border: "border-amber-500/30",
    text: "text-amber-300",
    hover: "hover:border-amber-500/60 hover:bg-amber-500/20",
  },
  devops: {
    bg: "bg-blue-500/10",
    border: "border-blue-500/30",
    text: "text-blue-300",
    hover: "hover:border-blue-500/60 hover:bg-blue-500/20",
  },
  mobile: {
    bg: "bg-pink-500/10",
    border: "border-pink-500/30",
    text: "text-pink-300",
    hover: "hover:border-pink-500/60 hover:bg-pink-500/20",
  },
};

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
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
      {ROLES.map((role, index) => {
        const isActive = value === role;
        const Icon = ROLE_ICONS[role];
        const colors = ROLE_COLORS[role];

        return (
          <motion.button
            key={role}
            type="button"
            onClick={() => onChange(role)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`
              group relative overflow-hidden rounded-xl border-2 p-4 text-left
              transition-all duration-300
              ${
                isActive
                  ? `${colors.border} ${colors.bg} shadow-lg`
                  : `border-violet-500/20 bg-violet-950/10 ${colors.hover}`
              }
            `}>
            {isActive && (
              <div
                className={`absolute inset-0 ${colors.bg} opacity-50 blur-xl`}
              />
            )}
            <div className="relative flex items-center gap-3">
              <div
                className={`
                  flex h-10 w-10 shrink-0 items-center justify-center rounded-lg
                  transition-all duration-300
                  ${isActive ? `${colors.bg} ${colors.text}` : "bg-violet-500/10 text-violet-400 group-hover:bg-violet-500/20"}
                `}>
                <Icon className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className={`
                    text-sm font-semibold truncate
                    transition-colors
                    ${isActive ? "text-white" : "text-violet-200 group-hover:text-white"}
                  `}>
                  {t(`roles.${role}`)}
                </p>
              </div>
            </div>
            {isActive && (
              <motion.div
                layoutId="activeRole"
                className={`absolute right-2 top-2 h-2 w-2 rounded-full ${colors.text.replace("text-", "bg-")}`}
                initial={false}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </motion.button>
        );
      })}
    </div>
  );
}
