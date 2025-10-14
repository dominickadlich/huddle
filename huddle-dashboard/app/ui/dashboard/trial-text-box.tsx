import {
  ShieldCheckIcon,
  ArchiveBoxIcon,
  RocketLaunchIcon,
  ShieldExclamationIcon,
  ArrowRightStartOnRectangleIcon,
  BellAlertIcon,
  WrenchScrewdriverIcon,
  TrophyIcon,
} from "@heroicons/react/24/outline";
import { fetchLatestHuddleData } from "../../lib/data";

const iconMap = {
  safety: ShieldCheckIcon,
  inventory: ArchiveBoxIcon,
  go_lives: RocketLaunchIcon,
  barriers: ShieldExclamationIcon,
  pass_off: ArrowRightStartOnRectangleIcon,
  unresolved_issues: BellAlertIcon,
  opportunities: WrenchScrewdriverIcon,
  shout_outs: TrophyIcon,
};

export default async function TrialTextWrapper() {
  const {
    safety_morning,
    safety_noon,
    safety_night,

    inventory_morning,
    inventory_noon,
    inventory_night,

    go_lives_morning,
    go_lives_noon,
    go_lives_night,

    barriers_morning,
    barriers_noon,
    barriers_night,

    pass_off_morning,
    pass_off_noon,
    pass_off_night,
    
    unresolved_issues_morning,
    unresolved_issues_noon,
    unresolved_issues_night,

    opportunities_morning,
    opportunities_noon,
    opportunities_night,

    shout_outs_morning,
    shout_outs_noon,
    shout_outs_night,
  } = await fetchLatestHuddleData();

  return (
    <>
      <TextCard 
        title="Safety"
        value_morning={safety_morning}
        value_noon={safety_noon}
        value_night={safety_night}
        type="safety" 
      />
      <TextCard 
        title="Inventory" 
        value_morning={inventory_morning}
        value_noon={inventory_noon}
        value_night={inventory_night}
        type="inventory" 
      />
      <TextCard 
        title="Go Lives" 
        value_morning={go_lives_morning}
        value_noon={go_lives_noon}
        value_night={go_lives_night}
        type="go_lives" 
      />
      <TextCard 
        title="Barriers" 
        value_morning={barriers_morning}
        value_noon={barriers_noon}
        value_night={barriers_night}
        type="barriers" 
      />
      <TextCard 
        title="Pass Off" 
        value_morning={pass_off_morning} 
        value_noon={pass_off_noon} 
        value_night={pass_off_night} 
        type="pass_off" 
      />
      <TextCard
        title="Unresolved Issues"
        value_morning={unresolved_issues_morning}
        value_noon={unresolved_issues_noon}
        value_night={unresolved_issues_night}
        type="unresolved_issues"
      />
      <TextCard
        title="Opportunities"
        value_morning={opportunities_morning}
        value_noon={opportunities_noon}
        value_night={opportunities_night}
        type="opportunities"
      />
      <TextCard 
        title="Shout Outs" 
        value_morning={shout_outs_morning} 
        value_noon={shout_outs_noon}
        value_night={shout_outs_night}
        type="shout_outs" 
      />
    </>
  );
}

export function TextBoxInput({
    title,
    value, 
  }: {
    title: string,
    value: number | string,
}) {
    return (
    <div className="group/row relative">
      <div className="grid grid-cols-[120px_1px_1fr] gap-4 p-3 items-center transition-all duration-300 rounded-lg hover:bg-indigo-500/5">
        {/* Label */}
        <div className="flex justify-start">
          <h3 className="text-sm font-semibold text-gray-200 group-hover/row:text-indigo-300 transition-colors duration-300">
            {title}
          </h3>
        </div>

        {/* Divider */}
        <div className="w-px h-full bg-gradient-to-b from-transparent via-gray-700 to-transparent group-hover/row:via-indigo-500/50 transition-colors duration-300" />

        {/* Content */}
        <div className="flex items-center">
          {value ? (
            <p className="text-sm text-gray-300 leading-relaxed group-hover/row:text-gray-100 transition-colors duration-300">
              {value}
            </p>
          ) : (
            <p className="text-sm text-gray-600 italic">
              No updates
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export function TextCard({
  title,
  value_morning,
  value_noon,
  value_night,
  type,
}: {
  title: string;
  value_morning: number | string;
  value_noon: number | string;
  value_night: number | string;
  type:
    | "safety"
    | "inventory"
    | "go_lives"
    | "barriers"
    | "pass_off"
    | "unresolved_issues"
    | "opportunities"
    | "shout_outs";
}) {
  const Icon = iconMap[type];

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-gray-500/80 bg-gray-800/30 backdrop-blur-sm transition-all duration-300 hover:bg-gray-800/50 hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/10">
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Content */}
      <div className="relative z-10 p-6">
        {/* Header with Icon */}
        <div className="flex justify-center items-center gap-3 mb-6 pb-4 border-b border-gray-700/50 group-hover:border-indigo-500/30 transition-colors duration-300">
          {Icon ? (
            // <div className="inline-flex rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 p-2.5 shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-shadow duration-300">
              <Icon className="h-6 w-6 text-md font-semibold text-gray-300 group-hover:text-indigo-300 transition-colors duration-300" />
            // </div>
          ) : null}
          <h3 className="text-lg font-semibold text-white group-hover:text-indigo-300 transition-colors duration-300">
            {title}
          </h3>
        </div>

        {/* Text Box Inputs */}
        <div className="space-y-1">
          <TextBoxInput title="Morning" value={value_morning} />
          <TextBoxInput title="Afternoon" value={value_noon} />
          <TextBoxInput title="Evening" value={value_night} />
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-0.25 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
}