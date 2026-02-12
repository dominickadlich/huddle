"use client";

import { useEffect, useRef, useState } from "react";
import { upsertDailySummaryField } from "@/app/lib/actions/daily-summary";
import {
  ChartBarIcon,
  CakeIcon,
  ExclamationTriangleIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

const iconMap = {
  census: ChartBarIcon,
  tpn: CakeIcon,
  hazardous: ExclamationTriangleIcon,
  staffing: UserGroupIcon,
};

export default function HistoryDailySummaryCard({
  id,
  title,
  value,
  type,
}: {
  id: string | null;
  title: string;
  value: number | string | null;
  type: "census" | "tpn" | "hazardous" | "staffing";
}) {
  const Icon = iconMap[type];

  return (
    <>
        {/* Content */}
        <div className="relative z-10">
          {/* Header with Icon */}
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-700/50 group-hover:border-indigo-500/30 transition-colors duration-300">
            <div className="flex items-center justify-center gap-2 flex-1">
              <Icon className="h-6 w-6 text-md font-semibold text-gray-300 group-hover:text-indigo-300 transition-colors duration-300" />
              <h3 className="text-lg font-semibold text-gray-300 group-hover:text-indigo-300 transition-colors duration-300">
                {title}
              </h3>
            </div>
          </div>
        </div>

        {/* Value Display */}
        <div className="flex justify-center items-center min-h-[2rem]">
            <p className="text-xl font-bold text-white group-hover:text-indigo-200 transition-colors duration-300">
              {value}
            </p>
          {/* Bottom accent line */}
          <div className="absolute bottom-0 left-0 right-0 h-0.25 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
    </>
  );
}
