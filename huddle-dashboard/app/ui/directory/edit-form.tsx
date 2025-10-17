"use client";

import Link from "next/link";
import { BuildingOfficeIcon, ClockIcon, PhoneIcon } from "@heroicons/react/24/outline";
import { Button } from "../button";
import { updateExtension, State } from "@/app/lib/actions";
import { useActionState } from "react";
import { ExtensionForm } from "@/app/lib/definitions";

export default function EditExtensionForm({
  extension,
}: {
  extension: ExtensionForm;
}) {
  const initialState: State = { message: null, errors: {} };
  const updateExtensionWithId = updateExtension.bind(null, extension.id);
  const [state, formAction] = useActionState(
    updateExtensionWithId,
    initialState,
  );

  return (
    <form action={formAction}>
      <div className="mt-10 grid grid-cols-3 gap-6">

        {/* Extension Name */}
        <div className="">
          <label
            htmlFor="siteName"
            className="flex items-center text-sm/6 font-medium text-gray-900 dark:text-white"
          >
            <BuildingOfficeIcon className="pointer-events-none h-[18px] w-[18px] text-gray-900 dark:text-white mr-2" />
            Site Name
          </label>
          <div className="mt-2">
            <input
              id="siteName"
              name="name"
              type="text"
              defaultValue={extension.name}
              placeholder="Enter site name here"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
              aria-describedby="name-error"
            />
          </div>
        </div>

        {/* Error Handling */}
        {/* <div id="name-error" aria-live="polite" aria-atomic="true">
          {state.errors?.name &&
            state.errors.name.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
        </div> */}

        {/* Extension Number */}
        <div>
          <label
            htmlFor="siteNumber"
            className="flex items-center text-sm/6 font-medium text-gray-900 dark:text-white"
          >
            <PhoneIcon className="pointer-events-none h-[18px] w-[18px] text-gray-900 dark:text-white mr-2" />
            Site Number
          </label>
          <div className="mt-2">
            <input
              id="siteNumber"
              name="extension"
              type="text"
              defaultValue={extension.extension}
              placeholder="Enter site number here"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
              aria-describedby="text-error"
            />
          </div>
          {/* Error Handling */}
        <div id="text-error" aria-live="polite" aria-atomic="true">
          {state.errors?.extension &&
            state.errors.extension.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
        </div>
        </div>
      


      {/* Extension Hours */}
      <div className="">
        <label
          htmlFor="hours"
          className="flex items-center text-sm/6 font-medium text-gray-900 dark:text-white"
        >
          <ClockIcon className="pointer-events-none h-[18px] w-[18px] text-gray-900 dark:text-white mr-2" />
          Hours
        </label>
        <div className="mt-2">
        <input
          id="hours"
          name="hours"
          type="text"
          defaultValue={extension.hours}
          placeholder="Enter site hours here"
          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
          aria-describedby="hours-error"
        >
        </input>
        </div>
        <div id="hours-error" aria-live="polite" aria-atomic="true">
          {state.errors?.extension &&
            state.errors.extension.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
        </div>
      </div>
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/directory"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Edit Extension</Button>
      </div>
    </form>
  );
}
