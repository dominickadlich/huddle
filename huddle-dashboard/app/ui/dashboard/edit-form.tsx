"use client";

import Link from "next/link";
import { Button } from "../button";
import { createHuddleReport, HuddleState } from "@/app/lib/actions";
import { useActionState } from "react";
import FormField from "./form-field";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import {
  ChartBarIcon,
  CakeIcon,
  ExclamationTriangleIcon,
  EyeDropperIcon,
  ChatBubbleLeftEllipsisIcon,
  ArchiveBoxArrowDownIcon,
  LockClosedIcon,
  UserGroupIcon,
  BeakerIcon,
  ShieldCheckIcon,
  ArchiveBoxIcon,
  RocketLaunchIcon,
  ShieldExclamationIcon,
  ArrowRightStartOnRectangleIcon,
  BellAlertIcon,
  WrenchScrewdriverIcon,
  TrophyIcon,
} from "@heroicons/react/24/outline";
import { InputConfig } from "./form-field";
import TextBoxFormField from "./textbox-form-field";

export default function Form() {
  const initialState: HuddleState = { message: null, errors: {} };
  const [state, formAction] = useActionState(createHuddleReport, initialState);

  const numericInputConfigs: InputConfig[] = [
    // Numeric inputs
    {
      name: "census",
      label: "Census",
      type: "number",
      icon: ChartBarIcon,
      placeholder: "Enter census count",
    },
    {
      name: "tpn_count",
      label: "TPN Count",
      type: "number",
      icon: CakeIcon,
      placeholder: "Enter TPN count",
    },
    {
      name: "haz_count",
      label: "Hazardous Count",
      type: "number",
      icon: ExclamationTriangleIcon,
      placeholder: "Enter hazardous count",
    },
    {
      name: "non_sterile_count",
      label: "Non-Sterile Count",
      type: "number",
      icon: EyeDropperIcon,
      placeholder: "Enter non-sterile count",
    },
    {
      name: "complex_preps_count",
      label: "Complex Preps",
      type: "number",
      icon: BeakerIcon,
      placeholder: "Enter complex preps count",
    },
  ];

  const textInputConfigs: InputConfig[] = [
    // Text inputs
    {
      name: "safety",
      label: "Safety",
      type: "textarea",
      icon: ShieldCheckIcon,
      placeholder: "Safety updates...",
    },
    {
      name: "inventory",
      label: "Inventory",
      type: "textarea",
      icon: ArchiveBoxIcon,
      placeholder: "Inventory notes...",
    },
    {
      name: "go_lives",
      label: "Go Lives",
      type: "textarea",
      icon: RocketLaunchIcon,
      placeholder: "Go live updates...",
    },
    {
      name: "barriers",
      label: "Barriers",
      type: "textarea",
      icon: ShieldExclamationIcon,
      placeholder: "Barriers...",
    },
    {
      name: "pass_off",
      label: "Pass Off",
      type: "textarea",
      icon: ArrowRightStartOnRectangleIcon,
      placeholder: "Pass-off updates...",
    },
    {
      name: "unresolved_issues",
      label: "Unresolved Issues",
      type: "textarea",
      icon: BellAlertIcon,
      placeholder: "Unresolved Issues...",
    },
    {
      name: "opportunities",
      label: "Opportunities",
      type: "textarea",
      icon: WrenchScrewdriverIcon,
      placeholder: "Opportunity updates...",
    },
    {
      name: "shout_outs",
      label: "Shout Outs",
      type: "textarea",
      icon: TrophyIcon,
      placeholder: "Shout Outs...",
    },
  ];

  console.log("State:", state);

  return (
    <form action={formAction}>
      <div className="">
        <div className="grid grid-cols-4">
          {numericInputConfigs.map((config) => (
            <FormField key={config.name} config={config} state={state} />
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
                    defaultValue="Full"
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
          {textInputConfigs.map((config) => (
            <TextBoxFormField key={config.name} config={config} state={state} />
          ))}
        </div>
        {/* Submit button */}
        <div className="flex justify-end mr-30 mt-10 gap-4">
          <Link
            href="/directory"
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
