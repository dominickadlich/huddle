"use client";

import Link from "next/link";
import {
  BuildingOfficeIcon,
  ClockIcon,
  PhoneIcon,
  CheckIcon,
  XMarkIcon
} from "@heroicons/react/24/outline";
import { CreateReportButton } from "../button";
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
            ></input>
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

      {/* Submit button */}
      <div className="mt-10 flex justify-end gap-4">
        <Link
          href="/directory"
          className="group relative px-3.5 py-3.5 bg-gray-300 text-white font-semibold rounded-full shadow-lg shadow-gray-500/30 hover:shadow-gray-500/50 hover:scale-105 transition-all duration-300"
        >
          <XMarkIcon className="h-5 w-5 text-gray-700" />
        </Link>
        <CreateReportButton type="submit">
          <CheckIcon className="h-5 w-5" />
        </CreateReportButton>
      </div>
    </form>
  );
}
