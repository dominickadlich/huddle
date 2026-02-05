import { CardSkeleton } from "../ui/dashboard/daily-summary/daily-summary-card-skeleton";
import { HuddleUpdateCardsSkeleton } from "../ui/dashboard/huddle-updates/huddle-update-card-skeleton";

export default function Loading() {
  <>
    <CardSkeleton />
    <HuddleUpdateCardsSkeleton />
  </>
}