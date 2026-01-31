import { Description } from "@headlessui/react";
import {
  BoltIcon,
  ArrowTrendingUpIcon,
  HandThumbUpIcon,
} from "@heroicons/react/24/outline";

const features = [
  {
    icon: BoltIcon,
    title: "Instant Updates",
    description:
      "Share critical information in real-time across all shifts and locations",
  },
  {
    icon: ArrowTrendingUpIcon,
    title: "Track What Matters",
    description: "Monitor staffing, inventory, and priorities at a glance",
  },
  {
    icon: HandThumbUpIcon,
    title: "Better Handoffs",
    description:
      "Seamless shift transitions with complete context and accountability",
  },
];

export default function HomePageCardWrapper() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {features.map((feature, index) => (
        <div
          key={index}
          className="group relative overflow-hidden rounded-2xl border border-gray-700/50 bg-gray-800/30 backdrop-blur-sm p-6 transition-all duration-300 hover:bg-gray-800/50 hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-2"
        >
          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Content */}
          <div className="relative z-10">
            {/* Icon Container */}
            {/* <div className="">
                            <feature.icon className="h-6 w-6 text-indigo-400" />
                        </div> */}

            {/* Title */}
            <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-indigo-300 transition-colors duration-300">
              <div className="flex gap-4">
                <feature.icon className="h-6 w-6 text-indigo-400" />
                {feature.title}
              </div>
            </h3>

            {/* Description */}
            <p className="text-gray-400 leading-relaxed text-sm">
              {feature.description}
            </p>
          </div>

          {/* Bottom accent line */}
          <div className="absolute bottom-0 left-0 right-0 h-0.25 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      ))}
    </div>
  );
}
