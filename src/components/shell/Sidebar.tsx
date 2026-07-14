"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  BookOpenCheck,
  Braces,
  Brain,
  LayoutDashboard,
  MessagesSquare,
  Rocket,
  Search,
  Settings2,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/aerospace", label: "Core Aerospace", icon: Rocket },
  { href: "/coding", label: "Coding", icon: Braces },
  { href: "/aptitude", label: "Aptitude", icon: Brain },
  { href: "/interview", label: "Interview Prep", icon: MessagesSquare },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/revision", label: "Revision", icon: BookOpenCheck },
  { href: "/search", label: "Search", icon: Search },
  { href: "/admin", label: "Admin", icon: Settings2 },
];

export function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="glass fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around border-t px-1 py-1 md:sticky md:top-0 md:h-screen md:w-60 md:flex-col md:items-stretch md:justify-start md:gap-1 md:rounded-none md:border-r md:border-t-0 md:px-4 md:py-6">
      <Link href="/" className="mb-0 hidden items-center gap-2 px-2 md:mb-8 md:flex">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent text-lg">
          🚀
        </span>
        <div>
          <div className="text-sm font-bold tracking-tight">Myplacement</div>
          <div className="text-[10px] uppercase tracking-widest text-muted">
            IITB Aerospace
          </div>
        </div>
      </Link>
      {NAV.map(({ href, label, icon: Icon }) => {
        const active =
          href === "/" ? pathname === "/" : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            title={label}
            className={cn(
              "flex flex-col items-center gap-1 rounded-xl px-2 py-2 text-[10px] font-medium transition-colors md:flex-row md:gap-3 md:px-3 md:py-2.5 md:text-sm",
              active
                ? "bg-primary-soft text-primary"
                : "text-muted hover:bg-primary-soft/50 hover:text-foreground"
            )}
          >
            <Icon size={18} />
            <span className="hidden sm:block">{label}</span>
          </Link>
        );
      })}
    </aside>
  );
}
