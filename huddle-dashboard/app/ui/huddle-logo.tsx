import { EyeDropperIcon } from "@heroicons/react/24/outline";
import { inter } from "./fonts";
import Image from "next/image";

export default function HuddleLogo() {
    return (
        <div
            className={`${inter.className} flex flex-row items-center leading-none text-white`}
        >
            <Image 
                src="/icon.png"
                width={25}
                height={50}
                className='hidden md:block'
                alt='Syringe Outline'
            />
            {/* <EyeDropperIcon className="h-8 w-12" /> */}
            <p className="text-[22px] pl-2">Central Pharmacy</p>
        </div>
    )
}