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
  CheckBadgeIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import { fetchLatestHuddleData } from "../../lib/data";

const iconMap = {
  census: ChartBarIcon,
  tpn_count: CakeIcon,
  haz_count: ExclamationTriangleIcon,
  non_sterile_count: EyeDropperIcon,
  opportunities: ChatBubbleLeftEllipsisIcon,
  complex_preps_count: BeakerIcon,
  missed_dispense_prep: PencilSquareIcon,
  missed_dispense_check: CheckBadgeIcon,
  staffing: UserGroupIcon,
  restock: ArchiveBoxArrowDownIcon,
  cs_queue: LockClosedIcon,
};

export default async function CardWrapper() {
  const {
    census,
    tpn_count,
    haz_count,
    non_sterile_count,
    complex_preps_count,
    missed_dispense_prep,
    missed_dispense_check,
    staffing,
    restock,
    cs_queue,
  } = await fetchLatestHuddleData();

  return (
    <>
      <Card title="Census" value={census} type="census" />
      <Card title="TPN Count" value={tpn_count} type="tpn_count" />
      <Card title="Hazardous Count" value={haz_count} type="haz_count" />
      <Card
        title="Non-Sterile Projects"
        value={non_sterile_count}
        type="non_sterile_count"
      />
      {/* <Card title='Opportunities' value={opportunities?.length || 0} type='opportunities' /> */}
      <Card
        title="Complex Preps"
        value={complex_preps_count}
        type="complex_preps_count"
      />
      <Card
        title="Dispense Prep Defects"
        value={missed_dispense_prep}
        type="missed_dispense_prep"
      />
      <Card
        title="Dispense Check Defects"
        value={missed_dispense_check}
        type="missed_dispense_check"
      />
      <Card title="Staffing" value={staffing} type="staffing" />
      <Card title="Restock" value={restock} type="restock" />
      <Card title="CS Queue" value={cs_queue} type="cs_queue" />
    </>
  );
}

export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type:
    | "census"
    | "tpn_count"
    | "haz_count"
    | "non_sterile_count"
    | "opportunities"
    | "complex_preps_count"
    | "missed_dispense_prep"
    | "missed_dispense_check"
    | "staffing"
    | "restock"
    | "cs_queue";
}) {
  const Icon = iconMap[type];

  const isBooleanCard = type === "restock" || type === "cs_queue";
  const noValue = value === null;

  return (
    // Float & outline on hover
    <div className="group relative overflow-hidden rounded-2xl border border-gray-400/50 bg-gray-800/30 backdrop-blur-sm p-6 transition-all duration-300 hover:bg-gray-800/50 hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/10">
      {/* Lift card on hover: hover:-translate-y-2 */}

      {/* Gradient overlay on hover */}
      <div className="absolute insert-0 bg-gradient-to-br from-indigo-500/50 to-purple-500/50 opacity-0 group-hover:opacity duration-300" />

      {/* Content */}
      <div className="relative z-10">
        {/* Header with Icon */}
        <div className="flex justify-center gap-2 mb-4 pb-3 border-b border-gray-700/50 group-hover:border-indigo-500/30 transition-colors duration-300">
          {Icon ? (
            // <div className="inline-flex rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 p-2 shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-shadow duration--300">
            <Icon className="h-6 w-6 text-md font-semibold text-gray-300 group-hover:text-indigo-300 transition-colors duration-300" />
          ) : // </div>
          null}
          <h3 className="text-md font-semibold text-gray-300 group-hover:text-indigo-300 transition-colors duration-300">
            {title}
          </h3>
        </div>

        {/* Value Display */}
        <div className="flex justify-center items-center min-h-[2rem]">
          {isBooleanCard ? (
            <div
              className={`w-8 h-8 rounded-full shadow-lg transition-all duration-300 ${
                value
                  ? "bg-gradient-to-br from red-500 to-red-600 shadow-red-500/40 group-hover:shadow-red-500/60"
                  : "bg-gradient-to-br from-green-500 to-green-600 shadow-green-500/30 group-hover:shadow-green-500/60"
              }`}
            />
          ) : noValue ? (
            <p className="text-gray-500 text-lg italic">No updates</p>
          ) : (
            <p className="text-4xl font-bold text-white group-hover:text-indigo-200 transition-colors duration-300">
              {value}
            </p>
          )}
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-0.25 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
}
