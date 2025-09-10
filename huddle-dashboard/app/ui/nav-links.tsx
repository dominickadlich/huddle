'use client'

import { 
    PresentationChartBarIcon,
    PhoneIcon,
    NewspaperIcon
} from '@heroicons/react/24/outline'
import { usePathname } from 'next/navigation'
import clsx from 'clsx';
import Link from 'next/link';

const navigation = [
  { 
    name: 'Dashboard',
    href: '/dashboard',
    icon: PresentationChartBarIcon
 },
 { 
    name: 'Directory',
    href: '/directory',
    icon: PhoneIcon
 },
 { 
    name: 'Documents',
    href: '/docs',
    icon: NewspaperIcon
 },
]

export default function NavLinks() {
    const pathname = usePathname();


    return (
        <>
            {navigation.map((item) => {
                const ItemIcon = item.icon;
                return (
                <Link
                key={item.name}
                href={item.href}
                className={clsx(
                    "-m-2.5 rounded-md p-2.5",
                    {
                        'text-black': pathname === item.href,
                        'text-white': pathname !== item.href,
                    },
                )}
                >
                <div className='flex item-center gap-2'>
                    <ItemIcon className='w-6' />
                    <p className='hidden md:block'>{item.name}</p>
                </div>
                </Link>
                );
            })}
        </>
    )
}