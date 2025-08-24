import { EyeDropperIcon } from "@heroicons/react/24/outline";
import { inter } from "./fonts";
import Image from "next/image";

export default function HuddleLogo() {
    return (
        <div
            className={`${inter.className} flex flex-row items-center leading-none text-white`}
        >
            {/* <Image 
                src="/logo.png"
                width={50}
                height={100}
                className='hidden md:block'
                alt='Huddle whiteboard logo'
            /> */}
            <EyeDropperIcon className="h-8 w-12" />
            <p className="text-[22px]">Central Pharmacy</p>
        </div>
    )
}