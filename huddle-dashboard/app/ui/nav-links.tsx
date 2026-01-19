"use client";

import {
  BookOpenIcon,
  PhoneIcon,
  DocumentTextIcon,
  ArrowUpOnSquareIcon,
  CalendarIcon,
} from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import Link from "next/link";

const links = [
  {
    name: "Huddle",
    href: "/dashboard",
    icon: BookOpenIcon,
  },
  {
    name: "Directory",
    href: "/directory",
    icon: PhoneIcon,
  },
  {
    name: "WDIP",
    href: "/WDIP",
    icon: ArrowUpOnSquareIcon,
  },
  // {
  //   name: "Schedule",
  //   href: "/schedule",
  //   icon: CalendarIcon,
  // },
  {
    name: "SOPs",
    href: "/docs",
    icon: DocumentTextIcon,
  },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        const isActive = pathname === link.href;

        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "group relative flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-300",
              {
                // Active state - glassmorphic with glow
                "bg-white/20 text-white shadow-lg shadow-white/10 border border-white/30":
                  isActive,
                // Inactive state - subtle hover
                "text-white/90 hover:bg-white/10 hover:text-white border border-transparent hover:border-white/20":
                  !isActive,
              },
            )}
          >
            <LinkIcon
              className={clsx("h-5 w-5 transition-all duration-300", {
                "text-white": isActive,
                "text-white/80 group-hover:text-white group-hover:scale-110":
                  !isActive,
              })}
            />
            <span className="hidden lg:block">{link.name}</span>

            {/* Active indicator line */}
            {/* {isActive && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent" />
              )} */}
          </Link>
        );
      })}
    </>
  );
}
