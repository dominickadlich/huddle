"use client";

import Link from "next/link";
import { Button } from "../button";
import { HuddleState, updateHuddleReport } from "@/app/lib/actions";
import { useActionState } from "react";
import FormField from "./form-field";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import {
  ArchiveBoxArrowDownIcon,
  LockClosedIcon,
  UserGroupIcon,
  XMarkIcon,
  CheckIcon,
  PlusIcon,
  MinusIcon,
} from "@heroicons/react/24/outline";
import TextBoxFormField from "./textbox-form-field";
import { HuddleDataForm } from "@/app/lib/definitions";
import {
  NUMERIC_INPUT_CONFIGS,
  TEXT_INPUT_CONFIGS_MORNING,
  TEXT_INPUT_CONFIGS_NOON,
  TEXT_INPUT_CONFIGS_NIGHT,
} from "@/app/lib/form-configs";
import AccordionSection from "./accordion";
import { CreateReportButton } from "../button";
import { useState } from "react";

export default function UpdateForm({
  huddle_data,
}: {
  huddle_data: HuddleDataForm;
}) {
  const initialState: HuddleState = { message: null, errors: {} };
  const updateReportWithId = updateHuddleReport.bind(null, huddle_data.id);
  const [state, formAction] = useActionState(updateReportWithId, initialState);

    // Track individual accordion states
    const [accordionStates, setAccordionStates] = useState({
      morning: false,
      afternoon: false,
      evening: false,
    });
  
    // Toggle individual accordion
    const toggleAccordion = (key: keyof typeof accordionStates) => {
      setAccordionStates((prev) => ({
        ...prev,
        [key]: !prev[key],
      }));
    };
  
    // Toggle all accordions
    const toggleAll = () => {
      const allOpen = Object.values(accordionStates).every((state) => state);
      setAccordionStates({
        morning: !allOpen,
        afternoon: !allOpen,
        evening: !allOpen,
      });
    };

    const allOpen = Object.values(accordionStates).every((state) => state);

  console.log("State:", state);

  return (
    <form action={formAction}>
      {/* Submit button */}
      <div className="flex justify-end gap-4">
        <Link
          href="/dashboard"
          className="group relative px-3.5 py-3.5 bg-gray-300 text-white font-semibold rounded-full shadow-lg shadow-gray-500/30 hover:shadow-gray-500/50 hover:scale-105 transition-all duration-300"
        >
          <XMarkIcon className="h-5 w-5 text-gray-700" />
        </Link>

         <CreateReportButton type="submit">
          <CheckIcon className="h-5 w-5" />
        </CreateReportButton>
      </div>

      <div className="">
        <div className="grid grid-cols-5 gap-6">
          {NUMERIC_INPUT_CONFIGS.map((config) => (
            <FormField
              key={config.name}
              config={config}
              state={state}
              defaultValue={huddle_data[config.name]?.toString() || ""}
            />
          ))}


          <div className="mt-10">
            <div>

              {/* Staffing Dropdown */}
              <div className="sm:col-span-5">
                <label
                  htmlFor="staffing"
                  className="flex items-center gap-2 text-sm font-semibold text-gray-200 mb-2 hover:text-indigo-300 transition-colors duration-300"
                >
                  <UserGroupIcon className="h-4 w-4 text-white" />
                  Staffing
                </label>
                <div className="relative mt-2">
                  <select
                    id="staffing"
                    name="staffing"
                    defaultValue={huddle_data.staffing}
                    className="w-full appearance-none rounded-lg bg-gray-800/30 backdrop-blur-sm border border-gray-400/50 px-4 py-3 pr-10 text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 focus:bg-gray-800/50 hover:border-gray-600/50 cursor-pointer"
                  >
                    <option className="bg-gray-800 text-white">Full</option>
                    <option className="bg-gray-800 text-white">
                      Contingency
                    </option>
                  </select>
                  <ChevronDownIcon
                    aria-hidden="true"
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Restock Help Needed */}
          <div className="mt-10">
            <div>
              <div className="sm:col-span-5">
                <label
                  htmlFor="restock"
                  className="flex items-center gap-2 text-sm font-semibold text-gray-200 mb-2 hover:text-indigo-300 transition-colors duration-300"
                >
                  <ArchiveBoxArrowDownIcon className="h-4 w-4 text-white" />
                  Restock
                </label>
                <div className="mt-2">
                  <label
                    htmlFor="restock"
                    className="group relative flex items-center gap-3 rounded-lg bg-gray-800/30 backdrop-blur-sm border border-gray-400/50 px-4 py-3.5 cursor-pointer transition-all duration-300 hover:bg-gray-800/50 hover:border-gray-600/50"
                  >
                    <input
                      id="restock"
                      name="restock"
                      type="checkbox"
                      defaultValue={huddle_data.restock}
                      className="h-5 w-5 rounded border-gray-600 bg-gray-700/50 text-indigo-600 focus:ring-2 focus:ring-indigo-500/50 focus:ring-offset-0 transition-all cursor-pointer"
                    />
                    <span className="text-sm text-gray-500 group-hover:text-white transition-colors">
                      Help Needed
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* CS Queue Help Needed */}
          <div className="mt-10">
            <div>
              <div className="sm:col-span-5">
                 <label
                  htmlFor="cs-queue-label"
                  className="flex items-center gap-2 text-sm font-semibold text-gray-200 mb-2 hover:text-indigo-300 transition-colors duration-300"
                >
                  <LockClosedIcon className="h-4 w-4 text-white" />
                  CS Queue
                </label>

                <div className="mt-2">
                   <label
                    htmlFor="cs_queue"
                    className="group relative flex items-center gap-3 rounded-lg bg-gray-800/30 backdrop-blur-sm border border-gray-400/50 px-4 py-3.5 cursor-pointer transition-all duration-300 hover:bg-gray-800/50 hover:border-gray-600/50"
                  >
                    <input
                      id="cs_queue"
                      name="cs_queue"
                      type="checkbox"
                      defaultValue={huddle_data.cs_queue}
                      className="h-5 w-5 rounded border-gray-600 bg-gray-700/50 text-indigo-600 focus:ring-2 focus:ring-indigo-500/50 focus:ring-offset-0 transition-all cursor-pointer"
                    />
                    <span className="text-sm text-gray-500 group-hover:text-white transition-colors">
                      Help Needed
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex justify-end gap-4">
          <button
            type="button"
            onClick={toggleAll}
            className="group relative px-3.5 py-3.5 bg-gray-300 text-white font-semibold rounded-full shadow-lg shadow-gray-500/30 hover:shadow-gray-500/50 hover:scale-105 transition-all duration-300"
            title="toggle all"
          >
            {allOpen ? (
              <MinusIcon className="h-5 w-5 text-gray-700" />
            ) : (
              <PlusIcon className="h-5 w-5 text-gray-700" />
            )}
          </button>
        </div>

        <div className="mt-10">
          <AccordionSection
            title="Morning Huddle"
            isOpen={accordionStates.morning}
            onToggle={() => toggleAccordion("morning")}
          >
            <div className="grid grid-cols-2 gap-8">
              {TEXT_INPUT_CONFIGS_MORNING.map((config) => (
                <TextBoxFormField
                  key={config.name}
                  config={config}
                  state={state}
                  defaultValue={huddle_data[config.name]?.toString() || ""}
                />
              ))}
            </div>
          </AccordionSection>

          <AccordionSection
            title="Afternoon Huddle"
            isOpen={accordionStates.afternoon}
            onToggle={() => toggleAccordion("afternoon")}
          >
            <div className="grid grid-cols-2 gap-8">
              {TEXT_INPUT_CONFIGS_NOON.map((config) => (
                <TextBoxFormField
                  key={config.name}
                  config={config}
                  state={state}
                  defaultValue={huddle_data[config.name]?.toString() || ""}
                />
              ))}
            </div>
          </AccordionSection>

          <AccordionSection
            title="Evening Huddle"
            isOpen={accordionStates.evening}
            onToggle={() => toggleAccordion("evening")}
          >
            <div className="grid grid-cols-2 gap-8">
              {TEXT_INPUT_CONFIGS_NIGHT.map((config) => (
                <TextBoxFormField
                  key={config.name}
                  config={config}
                  state={state}
                  defaultValue={huddle_data[config.name]?.toString() || ""}
                />
              ))}
            </div>
          </AccordionSection>
        </div>
      </div>
    </form>
  );
}
