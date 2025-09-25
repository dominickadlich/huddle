"use client";

import Link from "next/link";
import { Button } from "../button";
import { HuddleState, updateHuddleReport } from "@/app/lib/actions";
import { useActionState } from "react";
import FormField from "./form-field";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import {
  ArchiveBoxArrowDownIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import TextBoxFormField from "./textbox-form-field";
import { HuddleDataForm } from "@/app/lib/definitions";
import {
  NUMERIC_INPUT_CONFIGS,
  TEXT_INPUT_CONFIGS,
} from "@/app/lib/form-configs";

export default function UpdateForm({
  huddle_data,
}: {
  huddle_data: HuddleDataForm;
}) {
  const initialState: HuddleState = { message: null, errors: {} };
  const updateReportWithId = updateHuddleReport.bind(null, huddle_data.id);
  const [state, formAction] = useActionState(updateReportWithId, initialState);

  console.log("State:", state);

  return (
    <form action={formAction}>
      <div className="">
        <div className="grid grid-cols-4">
          {NUMERIC_INPUT_CONFIGS.map((config) => (
            <FormField
              key={config.name}
              config={config}
              state={state}
              defaultValue={huddle_data[config.name]?.toString() || ""}
            />
          ))}
          <div className="mt-10">
            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="staffing"
                  className="flex items-center text-sm/6 font-medium text-gray-900 dark:text-white"
                >
                  <UserGroupIcon className="pointer-events-none h-[18px] w-[18px] text-gray-900 dark:text-white mr-2" />
                  Staffing
                </label>
                <div className="mt-2 grid grid-cols-1">
                  <select
                    id="staffing"
                    name="staffing"
                    defaultValue={huddle_data.staffing}
                    className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:*:bg-gray-800 dark:focus-visible:outline-indigo-500"
                  >
                    <option>Full</option>
                    <option>Contingency</option>
                  </select>
                  <ChevronDownIcon
                    aria-hidden="true"
                    className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4 dark:text-gray-400"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10">
            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="restock"
                  className="flex items-center text-sm/6 font-medium text-gray-900 dark:text-white"
                >
                  <ArchiveBoxArrowDownIcon className="pointer-events-none h-[18px] w-[18px] text-gray-900 dark:text-white mr-2" />
                  Restock
                </label>
                <div className="mt-2">
                  <div className="flex items-center rounded-md bg-white px-3 py-1.5 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600 dark:bg-white/5 dark:outline-white/10 dark:focus-within:outline-indigo-500">
                    <input
                      id="restock"
                      name="restock"
                      type="checkbox"
                      defaultValue={huddle_data.restock}
                      className="h-6 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <span className="ml-3 text-sm text-gray-700 dark:text-white">
                      Help Needed
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10">
            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="restock"
                  className="flex items-center text-sm/6 font-medium text-gray-900 dark:text-white"
                >
                  <ArchiveBoxArrowDownIcon className="pointer-events-none h-[18px] w-[18px] text-gray-900 dark:text-white mr-2" />
                  Restock
                </label>
                <div className="mt-2">
                  <div className="flex items-center rounded-md bg-white px-3 py-1.5 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600 dark:bg-white/5 dark:outline-white/10 dark:focus-within:outline-indigo-500">
                    <input
                      id="cs_queue"
                      name="cs_queue"
                      type="checkbox"
                      defaultValue={huddle_data.cs_queue}
                      className="h-6 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <span className="ml-3 text-sm text-gray-700 dark:text-white">
                      Help Needed
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2">
          {TEXT_INPUT_CONFIGS.map((config) => (
            <TextBoxFormField
              key={config.name}
              config={config}
              state={state}
              defaultValue={huddle_data[config.name]?.toString() || ""}
            />
          ))}
        </div>
        {/* Submit button */}
        <div className="flex justify-end mr-30 mt-10 gap-4">
          <Link
            href="/dashboard"
            className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
          >
            Cancel
          </Link>
          <Button type="submit">Update Report</Button>
        </div>
      </div>
    </form>
  );
}
