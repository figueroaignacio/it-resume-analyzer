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
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
      {ROLES.map((role, index) => {
        const isActive = value === role;
        const Icon = ROLE_ICONS[role];

        return (
          <motion.button
            key={role}
            type="button"
            onClick={() => onChange(role)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.03 }}
            className={`
              relative overflow-hidden rounded-lg border p-3.5 text-left
              transition-all duration-200
              ${
                isActive
                  ? "border-white bg-white/5"
                  : "border-[#2a2b2c] bg-[#1e1f20] hover:border-[#3a3b3c] hover:bg-[#252626]"
              }
            `}>
            <div className="flex items-center gap-3">
              <div
                className={`
                  flex h-9 w-9 shrink-0 items-center justify-center rounded-md
                  transition-all duration-200
                  ${isActive ? "bg-white/10 text-white" : "bg-white/5 text-[#a0a0a0]"}
                `}>
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className={`
                    text-sm font-medium truncate
                    transition-colors
                    ${isActive ? "text-white" : "text-[#e5e5e5]"}
                  `}>
                  {t(`roles.${role}`)}
                </p>
              </div>
            </div>
            {isActive && (
              <motion.div
                layoutId="activeRole"
                className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-white"
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
