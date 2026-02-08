import { fetchDailySummaryWithUpdates } from "@/app/lib/data";
import HuddleUpdateCard from "./huddle-update-card";
import { getCurrentShift } from "@/app/lib/utils";

type DepartmentUpdate = {
  id: string;
  update_text: string | null;
} | null;

export default async function HuddleUpdateCardWrapper() {
  const today = new Date().toISOString().split('T')[0]
  const currentShift = getCurrentShift()
  const data = await fetchDailySummaryWithUpdates(today, currentShift)

  if (!data) {
    return (
      <>
        <HuddleUpdateCard title="distribution" value="Click to add" type="distribution" id={null} />
        <HuddleUpdateCard title="csr" value="Click to add" type="csr" id={null} />
        <HuddleUpdateCard title="ivr" value="Click to add" type="ivr" id={null} />
        <HuddleUpdateCard title="non_sterile" value="Click to add" type="nonsterile" id={null} />
        <HuddleUpdateCard title="leadership" value="Click to add" type="rx_leadership" id={null} />
      </>
    );
  } 
  
  
  const updatesByDepartment = data.updates.reduce((acc, update) => {
    const key = update.department.toLowerCase().replace(' ', '_') as keyof typeof acc;
    acc[key] = { 
        id: update.id,
        update_text: update.update_text
    }
    return acc;
}, {
    distribution: null as DepartmentUpdate,
    csr: null as DepartmentUpdate,
    ivr: null as DepartmentUpdate,
    nonsterile: null as DepartmentUpdate,
    rx_leadership: null as DepartmentUpdate,
});

const { distribution, csr, ivr, nonsterile, rx_leadership } = updatesByDepartment;
  
  return (
    <>
      <HuddleUpdateCard title="Distribution" value={distribution?.update_text ?? 'Click to add'} type="distribution" id={distribution?.id}/>
      <HuddleUpdateCard title="CSR" value={csr?.update_text ?? 'Click to add'} type="csr" id={csr?.id} />
      <HuddleUpdateCard title="IVR" value={ivr?.update_text ?? 'Click to add'} type="ivr" id={ivr?.id} />
      <HuddleUpdateCard title="Non Sterile" value={nonsterile?.update_text ?? 'Click to add'} type="nonsterile" id={nonsterile?.id} />
      <HuddleUpdateCard title="Rx Leadership" value={rx_leadership?.update_text ?? 'Click to add'} type="rx_leadership" id={rx_leadership?.id} />
    </>
  );
}