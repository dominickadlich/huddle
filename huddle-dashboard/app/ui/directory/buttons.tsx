'use client'

import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { deleteExtension } from "@/app/lib/actions";

export function CreateExtension() {
    return (
        <Link 
            href='/directory/create'
            className="flex h-10 items-center rounded-lg bg-indigo-500 px-4 text-sm font-medium text-white transition-colors hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        >
            <span className="hidden md:block">Create Extension</span>
            <PlusIcon className="h-5 ml-2 md:ml-4" />
        </Link>
    );
}

export function UpdateExtension({ id }: { id: string }) {
    return (
        <Link
            href={`/directory/${id}/edit`}
            className="rounded-md border p-2 hover:bg-gray-100"
        >
            <PencilIcon className="w-5" />
        </Link>
    );
}

export function DeleteExtension({ id }: {id: string }) {
    const deleteExtensionWithId = deleteExtension.bind(null, id);

    return (
        <form action={deleteExtensionWithId}>
            <button 
                type="submit"
                className="rounded-md border p-2 hover:bg-gray-100"
                onClick={(e) => {
                    if (!confirm('Are you sure you want to delete this contact?')) {
                        e.preventDefault();
                    }
                }}
                >
            <span className="sr-only">Delete</span>
            <TrashIcon className="w-5"/>
            </button>
        </form>
    )
}