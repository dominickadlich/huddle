import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

interface AccordionSectionProps {
  title: string;
  children: React.ReactNode;
  isOpen?: boolean;
  onToggle: () => void;
}

export default function AccordionSection({
  title,
  children,
  isOpen,
  onToggle,
}: AccordionSectionProps) {
  return (
    <div className="border border-gray-400/50 rounded-lg mb-4">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex justify-between items-center p-4 text-left hover:bg-gray-700/50 transition-colors"
      >
        <span className="font-semibold text-lg">{title}</span>
        <ChevronDownIcon
          className={`w-5 h-5 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="p-4 border-t border-gray-700">{children}</div>
      </div>
    </div>
  );
}
