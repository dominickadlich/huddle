"use client";

import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { deleteExtension } from "@/app/lib/actions";

export function UpdateExtension({ id }: { id: string }) {
  return (
    <Link
      href={`/directory/${id}/edit`}
      className="group relative rounded-lg bg-gray-700/30 border border-gray-600/50 p-2 transition-all duration-300 hover:bg-indigo-600/20 hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/20 hover:scale-110"
    >
      <PencilIcon className="h-5 w-5 text-gray-400 group-hover:text-indigo-300 transition-colors duration-300" />
      <span className="sr-only">Edit</span>
    </Link>
  );
}

export function DeleteExtension({ id }: { id: string }) {
  const deleteExtensionWithId = deleteExtension.bind(null, id);

  return (
    <form action={deleteExtensionWithId}>
      <button
        type="submit"
        className="group relative rounded-lg bg-gray-700/30 border border-gray-600/50 p-2 transition-all duration-300 hover:bg-red-600/20 hover:border-red-500/50 hover:shadow-lg hover:shadow-red-500/20 hover:scale-110"
      >
        <TrashIcon className="h-5 w-5 text-gray-400 group-hover:text-red-300 transition-colors duration-300" />
        <span className="sr-only">Delete</span>
      </button>
    </form>
  );
}

export function CreateExtension() {
  return (
    <Link
      href="/directory/create"
      className="flex h-10 items-center rounded-lg bg-indigo-500 px-4 text-sm font-medium text-white transition-colors hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
    >
      <span className="hidden md:block">Create Extension</span>
      <PlusIcon className="h-5 ml-2 md:ml-4" />
    </Link>
  );
}
