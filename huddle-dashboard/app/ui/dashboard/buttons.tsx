"use client";

import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export function CreateHuddleReport() {
  return (
    <Link
      href="/dashboard/create"
      className="group relative px-3.5 py-3.5 bg-gradient-to-r from-indigo-700 to-indigo-500 text-white font-semibold rounded-full shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-105 transition-all duration-300"
    >
      <PlusIcon className="h-5"/>
      {/* <span className="hidden md:block">Create Report</span> */}
    </Link>
  );
}

export function UpdateHuddleReport({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/${id}/edit`}
      className="group relative px-3.5 py-3.5 bg-gradient-to-r from-gray-400 to-gray-200 text-white font-semibold rounded-full shadow-lg shadow-indigo-500/30 hover:shadow-gray-500/50 hover:scale-105 transition-all duration-300"
    >
      <PencilIcon className="h-5"/>
      {/* <span className="hidden md:block">Update Report</span> */}
    </Link>
  );
}
