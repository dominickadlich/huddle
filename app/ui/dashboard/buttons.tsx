"use client";

import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export function CreateHuddleReport() {
  return (
    <Link
      href="/dashboard/create"
      className="group flex items-center gap-2 px-3.5 py-3.5 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-lg shadow-indigo-500/30 transition-all duration-300 hover:shadow-indigo-500/50 hover:scale-105 whitespace-nowrap"
    >
      <PlusIcon className="h-5" />
      {/* <span className="hidden md:block">Create Report</span> */}
    </Link>
  );
}

export function UpdateHuddleReport({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/${id}/edit`}
      className="group flex items-center gap-2 px-3.5 py-3.5 rounded-full bg-gradient-to-r from-indigo-600 via-blue-600 to-gray-900 to-indigo-600 text-white font-semibold shadow-lg shadow-indigo-500/30 transition-all duration-300 hover:shadow-indigo-500/50 hover:scale-105 whitespace-nowrap"
    >
      <PencilIcon className="h-5 " />
      {/* <span className="hidden md:block">Update Report</span> */}
    </Link>
  );
}
