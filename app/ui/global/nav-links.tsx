"use client";

import {
  PhoneIcon,
  ArrowUpOnSquareIcon,
  CalendarIcon,
  ArrowsPointingInIcon,
  PresentationChartLineIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import Link from "next/link";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

const links = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: PresentationChartLineIcon,
  },
  {
    name: 'History',
    href: '/dashboard/history',
    icon: CalendarIcon
  },
  {
    name: 'Mini-Huddles',
    href: '/mini-huddle',
    icon: ArrowsPointingInIcon,
    isDropDown: true,
    dropDownItems: [
      { name: 'IV Room', href: '/mini-huddle/iv-room'},
      { name: 'Command Center', href: '/mini-huddle/command-center'},
      { name: 'Distribution', href: '/mini-huddle/distribution'},
      // { name: 'Non-Sterile', href: 'nonsterile'},
    ]
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
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        const isActive = pathname.startsWith(link.href);

        if (link.isDropDown && link.dropDownItems) {
          return(
            <Menu key={link.name} as="div" className="relative">
              <MenuButton
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
                  <LinkIcon className="h-5 w-5" />
                  <span className="flex-1 text-left">{link.name}</span>
                  <ChevronDownIcon className="h-4 w-4"/>
                </MenuButton>

                <MenuItems className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-gray-800 outline-1 -outline-offset-1 outline-white/10 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in">
                  {link.dropDownItems.map((item) => (
                    <MenuItem key={item.name}>
                      <Link
                        href={item.href}
                        className="block px-4 py-2 text-sm text-white/90 hover:bg-white/20 hover:text-white rounded-md"
                      >
                        {item.name}
                      </Link>
                    </MenuItem>
                  ))}
                </MenuItems>
            </Menu>
          );
        }

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
            <span className="block">{link.name}</span>
          </Link>
        );
      })}
    </>
  );
}
