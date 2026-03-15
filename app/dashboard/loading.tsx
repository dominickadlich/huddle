import { CardSkeleton } from "../ui/dashboard/v1/daily-summary/daily-summary-card-skeleton";
import { HuddleUpdateCardsSkeleton } from "../ui/dashboard/v1/huddle-updates/huddle-update-card-skeleton";

export default function Loading() {
  <>
    <CardSkeleton />
    <HuddleUpdateCardsSkeleton />
  </>;
}
