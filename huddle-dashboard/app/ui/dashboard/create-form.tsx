'use client'

import Link from "next/link"
import { Button } from "../button"
import { createHuddleReport, HuddleState } from "@/app/lib/actions"
import { useActionState } from "react"
import FormField from "./form-field"
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
    TrophyIcon
} from '@heroicons/react/24/outline'
import { InputConfig } from "./form-field"

export default function Form() {
    const initialState: HuddleState = { message: null, errors: {} };
    const [ state, formAction] = useActionState(createHuddleReport, initialState);

    const inputConfigs: InputConfig[] = [
    // Numeric inputs
    { name: 'census', label: 'Census', type: 'number', icon: ChartBarIcon, placeholder: 'Enter census count' },
    { name: 'tpn_count', label: 'TPN Count', type: 'number', icon: CakeIcon, placeholder: 'Enter TPN count' },
    { name: 'haz_count', label: 'Hazardous Count', type: 'number', icon: ExclamationTriangleIcon, placeholder: 'Enter hazardous count' },
    { name: 'non_sterile_count', label: 'Non-Sterile Count', type: 'number', icon: EyeDropperIcon, placeholder: 'Enter non-sterile count' },
    { name: 'complex_preps_count', label: 'Complex Preps', type: 'number', icon: BeakerIcon, placeholder: 'Enter complex preps count' },
    
    // Text inputs
    { name: 'safety', label: 'Safety', type: 'textarea', icon: ShieldCheckIcon, placeholder: 'Safety updates...' },
    { name: 'inventory', label: 'Inventory', type: 'textarea', icon: ArchiveBoxIcon, placeholder: 'Inventory notes...' },
    { name: 'go_lives', label: 'Go Lives', type: 'textarea', icon: RocketLaunchIcon, placeholder: 'Go live updates...' },
    { name: 'barriers', label: 'Barriers', type: 'textarea', icon: ShieldExclamationIcon, placeholder: 'Barriers...'  },
    { name: 'pass_off', label: 'Pass Off', type: 'textarea', icon: ArrowRightStartOnRectangleIcon, placeholder: 'Pass-off updates...'  },
    { name: 'unresolved_issues', label: 'Unresolved Issues', type: 'textarea', icon: BellAlertIcon, placeholder: 'Unresolved Issues...'  },
    { name: 'opportunities', label: 'Opportunities', type: 'textarea', icon: WrenchScrewdriverIcon, placeholder: 'Opportunity updates...' },
    { name: 'shout_outs', label: 'Shout Outs', type: 'textarea', icon: TrophyIcon, placeholder: 'Shout Outs...'  },
    ];

    console.log('State:', state)

    return (
        <form action={formAction}>
            <div className="grid grid-cols-2">
                {inputConfigs.map((config) => (
                    <FormField key={config.name} config={config} state={state} />
                ))}
                
                {/* Special cases like checkboxes and select */}
                <div>
                <div className="mb-4">
                    <label className="flex items-center">
                    <input 
                        type="checkbox"
                        name="restock" 
                        className="mr-2" />
                        Restock Help Needed
                    </label>
                </div>

                <div className="mb-4">
                    <label className="flex items-center">
                    <input 
                        type="checkbox"
                        name="restock" 
                        className="mr-2" />
                        CS Queue Help Needed
                    </label>
                </div>
                </div>
            
                {/* Submit button */}
                <div className="mt-6 flex justify-end gap-4">
                    <Link
                        href="/directory"
                        className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
                    >
                        Cancel
                    </Link>
                    <Button type="submit">Create Report</Button>
                </div>
            </div>
        </form>
    );
}