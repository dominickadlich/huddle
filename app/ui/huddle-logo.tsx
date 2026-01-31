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
        className="hidden md:block"
        alt="Syringe Outline"
      />
      <p className="text-[22px] pl-2">Pharmacy Huddle</p>
    </div>
  );
}
