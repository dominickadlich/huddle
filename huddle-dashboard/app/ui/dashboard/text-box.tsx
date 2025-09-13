import {
    ShieldCheckIcon,
    ArchiveBoxIcon,
    RocketLaunchIcon,
    ShieldExclamationIcon,
    ArrowRightStartOnRectangleIcon,
    BellAlertIcon,
    WrenchScrewdriverIcon,
    TrophyIcon
 } from '@heroicons/react/24/outline'
import { fetchLatestHuddleData } from '../../lib/data';

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

 export default async function TextWrapper() {
    const {
        safety,
        inventory,
        go_lives,
        barriers,
        pass_off,
        unresolved_issues,
        opportunities,
        shout_outs,
    } = await fetchLatestHuddleData();

    return (
      <>
        <TextCard title="Safety" value={safety} type='safety' />
        <TextCard title='Inventory' value={inventory} type='inventory' />
        <TextCard title='Go Lives' value={go_lives} type='go_lives' />
        <TextCard title='Barriers' value={barriers} type='barriers' />
        <TextCard title='Pass Off' value={pass_off} type='pass_off' />
        <TextCard title='Unresolved Issues' value={unresolved_issues} type='unresolved_issues' />
        <TextCard title='Opportunities' value={opportunities} type='opportunities' />
        <TextCard title='Shout Outs' value={shout_outs} type='shout_outs' />
      </>
    );
 }

 export function TextCard({
    title,
    value,
    type,
 }: {
    title: string,
    value: number | string,
    type: 
      'safety' | 
      'inventory' | 
      'go_lives' | 
      'barriers' | 
      'pass_off' | 
      'unresolved_issues' |
      'opportunities' |
      'shout_outs' 
 }) {
    const Icon = iconMap[type];

    return (
    <div className="rounded-xl bg-indigo-500 p-1">
        <div className='flex rounded-xl bg-gray-200 text-black px-4 py-4 text-center text-2xl'>
            <div className="p-1 w-50">
                <div className='flex justify-center'>
                {Icon ? <Icon className="h-6 w-6 text-black" /> : null}
                </div>
                <h3 className="ml-2 text-lg font-medium">{title}</h3>
            </div>
            <div className='flex flex-1 justify-center items-center border-l-2 p-2'>
                    {/* Handle both empty and filled content */}
                    {value ? (
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">
                            {value}
                        </p>
                    ) : (
                        <p className="text-gray-400 text-sm italic text-center">
                            No updates
                        </p>
                    )}
            </div>
        </div>
    </div>
    );
 }