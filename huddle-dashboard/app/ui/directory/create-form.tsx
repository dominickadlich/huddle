"use client";

import Link from "next/link";
import { BuildingOfficeIcon, PhoneIcon } from "@heroicons/react/24/outline";
import { Button } from "../button";
import { createExtension, State } from "@/app/lib/actions";
import { useActionState } from "react";

export default function Form() {
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useActionState(createExtension, initialState);

  console.log("State:", state);

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Extension Name */}
        <div className="mb-4">
          <label
            htmlFor="siteName"
            className="mb-2 block text-sm font-medium text-black"
          >
            Site Name
          </label>
          <div className="relative">
            <input
              id="siteName"
              name="name"
              type="text"
              placeholder="Enter site name here"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm text-black outline-2 placeholder:text-gray-500"
              aria-describedby="name-error"
            />
            <BuildingOfficeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>
        <div id="name-error" aria-live="polite" aria-atomic="true">
          {state.errors?.name &&
            state.errors.name.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
        </div>

        {/* Extension Number */}
        <div className="mb-4">
          <label
            htmlFor="siteNumber"
            className="mb-2 block text-sm font-medium text-black"
          >
            Site Number
          </label>
          <div className="relative">
            <input
              id="siteNumber"
              name="extension"
              type="text"
              placeholder="Enter site number here"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm text-black outline-2 placeholder:text-gray-500"
              aria-describedby="number-error"
            />
            <PhoneIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>
        <div id="number-error" aria-live="polite" aria-atomic="true">
          {state.errors?.extension &&
            state.errors.extension.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/directory"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create Extension</Button>
      </div>
    </form>
  );
}
