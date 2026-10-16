import {
  ArrowsRightLeftIcon,
  ArrowTrendingDownIcon,
  BeakerIcon,
  ChevronDownIcon,
  ClockIcon,
  Cog6ToothIcon,
  EllipsisHorizontalCircleIcon,
  ExclamationCircleIcon,
  FaceSmileIcon,
  LightBulbIcon,
  MegaphoneIcon,
  TrophyIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";
import { HeroIcon } from "./team-huddle-card";
import { useIsMobile } from "@/app/lib/hooks/use-is-mobile";
import { useEffect, useRef, useState } from "react";


const iconMap: Record<string, HeroIcon> = {
  announcements: MegaphoneIcon,
  barriers: WrenchScrewdriverIcon,
  safety: ExclamationCircleIcon,
  wins: TrophyIcon,
  opportunities: LightBulbIcon, // TODO: Remove opportunities from DB
  inventory: ArrowTrendingDownIcon,
  team_building: FaceSmileIcon,
  operational_needs: Cog6ToothIcon,
  misc: EllipsisHorizontalCircleIcon,
  pass_off: ArrowsRightLeftIcon,
  batching: BeakerIcon,
short_dated: ClockIcon,
};

const alignClass = {
    left: 'text-left',
    center: 'text-center',
} as const;


export function displayValue(value: string | number | null | undefined): string {
  if (value === null || value === undefined) return 'Nothing reported today!';
  const str = String(value).trim();
  return str === '' ? 'Nothing reported today!' : String(value);
}


export default function SharedTextArea({
  title,
  value,
  name,
  isEditMode,
  onChange,
  align = 'left'
}: {
  title: string;
  value: number | string | null | undefined;
  name: string
  isEditMode: boolean
  onChange?: (value: string) => void;
  align?: 'left' | 'center';
}) {

  const Icon = iconMap[name] ?? ExclamationCircleIcon;

  return (
    <>
    <div className="group relative overflow-hidden rounded-2xl border border-gray-400/50 bg-gray-800/30 backdrop-blur-sm p-6">
        {/* Content */}
        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-700/50 transition-colors duration-300">
            <div className="flex items-center justify-center gap-2 flex-1">
              <Icon className="h-6 w-6 text-md font-semibold text-gray-300  transition-colors duration-300" />
              <h3 className="text-lg font-semibold text-gray-300  transition-colors duration-300">
                {title}
              </h3>
            </div>
          </div>
        </div>

        {/* Value Display */}
        <div className="flex items-center min-h-[2rem]">
            {isEditMode
            ? (
                <textarea
                  spellCheck="true"
                  name={name}
                  value={value ?? ''}
                  onChange={(e) => onChange?.(e.target.value)}
                  rows={4}
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              )
            : (
                <p className={`w-full whitespace-pre-line ${alignClass[align]} text-base text-white`}> 
                    {displayValue(value)}
                </p>
              )
            }
        </div>
      </div>
    </>
  );
}