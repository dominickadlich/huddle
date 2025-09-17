"use client";

import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export function CreateExtension() {
  return (
    <Link
      href="/dashboard/create"
      className="flex h-10 items-center rounded-lg bg-indigo-500 px-4 text-sm font-medium text-white transition-colors hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
    >
      <span className="hidden md:block">Create Report</span>
      <PlusIcon className="h-5 ml-2 md:ml-4" />
    </Link>
  );
}
