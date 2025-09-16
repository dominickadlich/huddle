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
} from "@heroicons/react/24/outline";
import { fetchLatestHuddleData } from "../../lib/data";

const iconMap = {
  census: ChartBarIcon,
  tpn_count: CakeIcon,
  haz_count: ExclamationTriangleIcon,
  non_sterile_count: EyeDropperIcon,
  opportunities: ChatBubbleLeftEllipsisIcon,
  restock: ArchiveBoxArrowDownIcon,
  cs_queue: LockClosedIcon,
  staffing: UserGroupIcon,
  complex_preps_count: BeakerIcon,
};

export default async function CardWrapper() {
  const {
    census,
    tpn_count,
    haz_count,
    non_sterile_count,
    opportunities,
    restock,
    cs_queue,
    staffing,
    complex_preps_count,
  } = await fetchLatestHuddleData();

  return (
    <>
      <Card title="Census" value={census} type="census" />
      <Card title="TPN Count" value={tpn_count} type="tpn_count" />
      <Card title="Hazardous Count" value={haz_count} type="haz_count" />
      <Card
        title="Non-Sterile Count"
        value={non_sterile_count}
        type="non_sterile_count"
      />
      {/* <Card title='Opportunities' value={opportunities?.length || 0} type='opportunities' /> */}
      <Card title="Complex Preps" value={complex_preps_count} type="complex_preps_count" />
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
    | "restock"
    | "cs_queue"
    | "staffing"
    | "complex_preps_count";
}) {
  const Icon = iconMap[type];

  const isBooleanCard = type === "restock" || type === "cs_queue";

  return (
    <div className="rounded-xl bg-indigo-500 p-1">
      <div className="rounded-xl bg-gray-200 text-black p-2 text-center text-lg">
        <div className="flex justify-center border-b-2">
          {Icon ? <Icon className="h-6 w-6 text-black" /> : null}
          <h3 className="ml-2 text-lg font-medium">{title}</h3>
        </div>
        {isBooleanCard ? (
          <div className="flex justify-center items-center h-8 mt-2">
            <div
              className={`w-6 h-6 rounded-full ${
                value ? "bg-red-400" : "bg-green-400"
              }`}
            />
          </div>
        ) : (
          <p className="text-2xl mt-2">{value}</p>
        )}
      </div>
    </div>
  );
}
