import { fetchLatestDailySummary, fetchLatestDailySummaryWithUpdates, fetchLatestHuddleUpdates } from "../lib/data";
import { DailySummaryWithUpdates, DashboardData, DepartmentUpdate, HuddleUpdate } from "../lib/types/database";
import DashboardPageClient from "./dashboard-page-client";

function toDashboardData(data: DailySummaryWithUpdates): DashboardData {
  const updatesByDepartment = data.updates.reduce((acc, item) => {
    acc[item.department] = item;
    return acc;
  }, {} as Record<string, HuddleUpdate>);

  return {
    daily_summary: data,
    updates: {
      distribution: updatesByDepartment["Distribution"] ?? null,
      ivr: updatesByDepartment["IVR"] ?? null,
      csr: updatesByDepartment["CSR"] ?? null,
      rx_leadership: updatesByDepartment["RX Leadership"] ?? null,
      nonsterile: updatesByDepartment["Nonsterile"] ?? null,
    }
  };
}

export default async function Page() {
  const dashboardData = await fetchLatestDailySummaryWithUpdates();

  if (!dashboardData) {
    return (
      <DashboardPageClient 
        initialData={{} as DashboardData}
      />
    )
  }

  const initialData = toDashboardData(dashboardData)
  console.log(initialData)

  return (
    <DashboardPageClient 
      initialData={initialData}
    />
  )
}