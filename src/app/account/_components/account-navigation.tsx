"use client";

import { cn } from "@/lib/utils";
import { LucideIcon, Package, Settings } from "lucide-react";
import { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AccountNavigation() {
  const pathname = usePathname();
  const accountLinks: {
    name: string;
    href: Route;
    icon: LucideIcon;
  }[] = [
    { name: "Orders", href: "/account/orders", icon: Package },
    { name: "Settings", href: "/account/settings", icon: Settings },
  ];
  return (
    <nav className="mt-6 space-y-2">
      {accountLinks.map((link) => {
        const isActive = pathname === link.href;
        const Icon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={cn(
              "flex items-center gap-3 rounded-xl px-4 py-2 text-sm font-normal transition-all",
              isActive
                ? "bg-primary text-secondary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-muted",
            )}
          >
            <Icon className="size-4" />
            {link.name}
          </Link>
        );
      })}
    </nav>
  );
}
