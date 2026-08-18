import {
  ArrowTrendingDownIcon,
  ChevronDownIcon,
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
  barriers: WrenchScrewdriverIcon,
  safety: ExclamationCircleIcon,
  wins: TrophyIcon,
  opportunities: LightBulbIcon, // TODO: Remove opportunities from DB
  inventory: ArrowTrendingDownIcon,
  team_building: FaceSmileIcon
};

export function AnnouncementTextArea({
  value,
  isEditMode,
  onChange,
}: {
  value: string | number | null | undefined;
  isEditMode: boolean;
  onChange?: (value: string) => void;
}) {
  const isMobile = useIsMobile();
  const rows = isMobile ? 8 : 10;

  const scrollRef = useRef<HTMLDivElement>(null);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el || isEditMode) {
      setHasMore(false);
      return;
    }

    const checkScroll = () => {
      const overflowing = el.scrollHeight - el.scrollTop - el.clientHeight > 4;
      setHasMore(overflowing);
    };

    checkScroll();
    el.addEventListener('scroll', checkScroll);
    const resizeObserver = new ResizeObserver(checkScroll);
    resizeObserver.observe(el);

    return () => {
      el.removeEventListener('scroll', checkScroll);
      resizeObserver.disconnect();
    };
  }, [value, isEditMode]);

  return (
    <div className="min-h-88 group relative overflow-hidden rounded-2xl border border-gray-400/50 bg-gray-800/30 backdrop-blur-sm p-6">
      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-700/50 transition-colors duration-300">
          <div className="flex items-center justify-center gap-2 flex-1">
            <MegaphoneIcon className="h-6 w-6 text-md font-semibold text-gray-300 transition-colors duration-300" />
            <h3 className="text-lg font-semibold text-gray-300 transition-colors duration-300">
              Announcements
            </h3>
          </div>
        </div>
      </div>

      {/* Value Display */}
      <div className="relative">
        <div
          ref={scrollRef}
          className={`flex justify-center min-h-[2rem] ${
            isEditMode ? '' : 'max-h-64 overflow-y-auto'
          }`}
        >
          {isEditMode ? (
            <textarea
              name="announcements"
              value={value ?? ''}
              onChange={(e) => onChange?.(e.target.value)}
              rows={rows}
              className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-white text-gray-900 outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
            />
          ) : (
            <p className="whitespace-pre-wrap leading-loose text-lg text-white transition-colors duration-300">
              {value ?? 'Nothing reported today!'}
            </p>
          )}
        </div>

        {hasMore && (
          <>
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-gray-900/80 to-transparent rounded-b-2xl" />
            <ChevronDownIcon className="pointer-events-none absolute bottom-1 left-1/2 -translate-x-1/2 h-5 w-5 text-indigo-400 animate-bounce" />
          </>
        )}
      </div>
    </div>
  );
}

export default function SharedTextArea({
  title,
  value,
  name,
  isEditMode,
  onChange
}: {
  title: string;
  value: number | string | null | undefined;
  name: string
  isEditMode: boolean
  onChange?: (value: string) => void;
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
        <div className="flex justify-items-start items-center min-h-[2rem]">
            {isEditMode
            ? (
                <textarea
                  name={name}
                  value={value ?? ''}
                  onChange={(e) => onChange?.(e.target.value)}
                  rows={4}
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-white text-gray-900 outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              )
            : (
                <p className="text-base text-white whitespace-pre-wrap"> 
                    {value ?? 'Nothing reported today!'}
                </p>
              )
            }
        </div>
      </div>
    </>
  );
}