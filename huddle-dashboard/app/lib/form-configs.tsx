import { InputConfig } from "../ui/dashboard/form-field";
import {
  ChartBarIcon,
  CakeIcon,
  ExclamationTriangleIcon,
  EyeDropperIcon,
  BeakerIcon,
  ShieldCheckIcon,
  ArchiveBoxIcon,
  RocketLaunchIcon,
  ShieldExclamationIcon,
  ArrowRightStartOnRectangleIcon,
  BellAlertIcon,
  WrenchScrewdriverIcon,
  TrophyIcon,
  PencilSquareIcon,
  CheckBadgeIcon,
} from "@heroicons/react/24/outline";

export const NUMERIC_INPUT_CONFIGS = [
  // Numeric inputs
  {
    name: "census",
    label: "Census",
    type: "number",
    icon: ChartBarIcon,
    placeholder: "Enter census count",
  },
  {
    name: "tpn_count",
    label: "TPN Count",
    type: "number",
    icon: CakeIcon,
    placeholder: "Enter TPN count",
  },
  {
    name: "haz_count",
    label: "Hazardous Count",
    type: "number",
    icon: ExclamationTriangleIcon,
    placeholder: "Enter hazardous count",
  },
  {
    name: "non_sterile_count",
    label: "Non-Sterile Count",
    type: "number",
    icon: EyeDropperIcon,
    placeholder: "Enter non-sterile count",
  },
  {
    name: "complex_preps_count",
    label: "Complex Preps",
    type: "number",
    icon: BeakerIcon,
    placeholder: "Enter complex preps count",
  },
  {
    name: "missed_dispense_prep",
    label: "Missed Dispense Preps",
    type: "number",
    icon: PencilSquareIcon,
    placeholder: "Enter missed dispense preps",
  },
  {
    name: "missed_dispense_check",
    label: "Dispense Checks",
    type: "number",
    icon: CheckBadgeIcon,
    placeholder: "Enter missed dispense checks",
  },
] as const satisfies readonly InputConfig[];

export const TEXT_INPUT_CONFIGS = [
  // Text inputs
  {
    name: "safety",
    label: "Safety",
    type: "textarea",
    icon: ShieldCheckIcon,
    placeholder: "Safety updates...",
  },
  {
    name: "inventory",
    label: "Inventory",
    type: "textarea",
    icon: ArchiveBoxIcon,
    placeholder: "Inventory notes...",
  },
  {
    name: "go_lives",
    label: "Go Lives",
    type: "textarea",
    icon: RocketLaunchIcon,
    placeholder: "Go live updates...",
  },
  {
    name: "barriers",
    label: "Barriers",
    type: "textarea",
    icon: ShieldExclamationIcon,
    placeholder: "Barriers...",
  },
  {
    name: "pass_off",
    label: "Pass Off",
    type: "textarea",
    icon: ArrowRightStartOnRectangleIcon,
    placeholder: "Pass-off updates...",
  },
  {
    name: "unresolved_issues",
    label: "Unresolved Issues",
    type: "textarea",
    icon: BellAlertIcon,
    placeholder: "Unresolved Issues...",
  },
  {
    name: "opportunities",
    label: "Opportunities",
    type: "textarea",
    icon: WrenchScrewdriverIcon,
    placeholder: "Opportunity updates...",
  },
  {
    name: "shout_outs",
    label: "Shout Outs",
    type: "textarea",
    icon: TrophyIcon,
    placeholder: "Shout Outs...",
  },
] as const satisfies readonly InputConfig[];
