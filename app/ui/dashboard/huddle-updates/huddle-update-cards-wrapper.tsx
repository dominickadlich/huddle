// import { fetchLatestDailySummary, fetchLatestHuddleUpdates } from "@/app/lib/data";
// import HuddleUpdateCard from "./huddle-update-card";

// export default async function HuddleUpdateCardWrapper() {
//   const data = await fetchLatestHuddleUpdates()

//   if (!data) {
//     return (
//       <>
//         <HuddleUpdateCard title="distribution" value="Click to add" type="distribution" id={null} />
//         <HuddleUpdateCard title="csr" value="Click to add" type="csr" id={null} />
//         <HuddleUpdateCard title="ivr" value="Click to add" type="ivr" id={null} />
//         <HuddleUpdateCard title="non_sterile" value="Click to add" type="non_sterile" id={null} />
//         <HuddleUpdateCard title="leadership" value="Click to add" type="leadership" id={null} />
//       </>
//     );
//   } 

//   const { id, distribution, csr, ivr, non_sterile, leadership } = data
  
//   return (
//     <>
//       <HuddleUpdateCard title="distribution" value={distribution} type="distribution" id={id}/>
//       <HuddleUpdateCard title="csr" value={csr} type="csr" id={id} />
//       <HuddleUpdateCard title="ivr" value={ivr} type="ivr" id={id} />
//       <HuddleUpdateCard title="non_sterile" value={non_sterile} type="non_sterile" id={id} />
//       <HuddleUpdateCard title="leadership" value={leadership} type="leadership" id={id} />
//     </>
//   );
// }