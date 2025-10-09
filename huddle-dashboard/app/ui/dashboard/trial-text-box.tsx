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
        <div className="">
            <div className="flex p-2">
                <div className="flex justify-center w-50">
                    <h3 className="ml-2 text-lg font-medium">{title}</h3>
                </div>

                {/* Handle both empty and filled content */}
                <div className="flex flex-1 justify-center">
                {value ? (
                    <p className="flex flex-1 justify-center items-center p-2 text-gray-900 text-sm text-center border-l-2">
                    {value}
                    </p>
                ) : (
                    <p className="flex flex-1 justify-center items-center p-2 text-gray-400 text-sm italic text-center border-l-2">
                    No updates
                    </p>
                )}
                </div>
            </div>
        </div>
    )
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
    <div className="rounded-xl bg-indigo-500 p-1">
      <div className="rounded-xl bg-gray-200 text-black px-4 py-4 text-center text-2xl">
          <div className="flex justify-center border-b-2 ">
            {Icon ? <Icon className="h-6 w-6 text-black" /> : null}
          <h3 className="ml-2 text-lg font-medium">{title}</h3>
          </div>
          <TextBoxInput title="Morning" value={value_morning}/>
          <TextBoxInput title="Afternoon" value={value_noon}/>
          <TextBoxInput title="Evening" value={value_night}/>
      </div>
    </div>
  );
}
