import { 
    ChartBarIcon,
    CakeIcon,
    ExclamationTriangleIcon,
    EyeDropperIcon,
    ChatBubbleLeftEllipsisIcon
 } from '@heroicons/react/24/outline'
import { inter } from '../fonts'
import { fetchLatestHuddleData } from '../../lib/data';
import { title } from 'process';

 const iconMap = {
    census: ChartBarIcon,
    tpn_count: CakeIcon,
    haz_count: ExclamationTriangleIcon,
    non_sterile_count: EyeDropperIcon,
    opportunities: ChatBubbleLeftEllipsisIcon,
 };

 export default async function CardWrapper() {
    const {
        census,
        tpn_count,
        haz_count,
        non_sterile_count,
        opportunities,
    } = await fetchLatestHuddleData();

    return (
      <>
        <Card title="Census" value={census} type='census' />
        <Card title='TPN Count' value={tpn_count} type='tpn_count' />
        <Card title='Hazardous Count' value={haz_count} type='haz_count' />
        <Card title='Non-Sterile Count' value={non_sterile_count} type='non_sterile_count' />
        <Card title='Opportunities' value={opportunities} type='opportunities' />
      </>
    );
 }

 export function Card({
    title,
    value,
    type,
 }: {
    title: string,
    value: number | string,
    type: 'census' | 'tpn_count' | 'haz_count' | 'non_sterile_count' | 'opportunities';
 }) {
    const Icon = iconMap[type];

    return (
    <div className="rounded-xl bg-indigo-100 p-2 shadow-sm">
         <div className="flex p-4">
            {Icon ? <Icon className="h-5 w-5 text-white" /> : null}
            <h3 className="ml-2 text-sm font-medium">{title}</h3>
         </div>
      <p
        className={`${inter.className}
          truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
      >
        {value}
      </p>
    </div>
    )
 };