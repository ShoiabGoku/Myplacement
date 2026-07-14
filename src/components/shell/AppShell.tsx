"use client";

import { usePathname } from "next/navigation";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

/**
 * App chrome: sidebar + topbar around every page except the distraction-free
 * test runner, which takes over the full screen.
 */
export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const fullscreen = pathname.startsWith("/test/");

  if (fullscreen) return <main className="min-h-screen">{children}</main>;

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <Sidebar />
      <main className="min-w-0 flex-1 px-4 pb-24 md:px-8 md:pb-10">
        <Topbar />
        {children}
      </main>
    </div>
  );
}
