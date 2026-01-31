import dotenv from "dotenv";
dotenv.config({ path: ".env" });

import { createClient } from "@supabase/supabase-js";
import { LoremIpsum } from "lorem-ipsum";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

const generateExtensionData = async (extensions = 10) => {
  const data = [
    {
      created_at: new Date().toISOString(),
      name: "Bell OR Pharmacy",
      extension: "8-4155",
    },
    {
      created_at: new Date().toISOString(),
      name: "Cambridge Pharmacy",
      extension: "4-3170",
    },
    {
      created_at: new Date().toISOString(),
      name: "Cambridge OR Pharmacy",
      extension: "4-3350",
    },
    {
      created_at: new Date().toISOString(),
      name: "CVOR Pharmacy",
      extension: "8-3812",
    },
    {
      created_at: new Date().toISOString(),
      name: "ED Pharmacist",
      extension: "8-6565",
    },
    {
      created_at: new Date().toISOString(),
      name: "Environemntal Services",
      extension: "4-1500",
    },
    {
      created_at: new Date().toISOString(),
      name: "Heart Center Pharmacy",
      extension: "8-3812",
    },
    {
      created_at: new Date().toISOString(),
      name: "Investigational",
      extension: "8-2314",
    },
    {
      created_at: new Date().toISOString(),
      name: "IV Room",
      extension: "8-2320",
    },
    {
      created_at: new Date().toISOString(),
      name: "Lester - Purchasing",
      extension: "8-2308",
    },
    {
      created_at: new Date().toISOString(),
      name: "Mark - Purchasing",
      extension: "4-3170",
    },
  ];

  // for (let i = 0; i < extensions; i++) {
  // data.push(
  // {
  // created_at: new Date(Date.now()), // Date is today's date
  // name: new LoremIpsum().generateWords(1), // Generate a one word name
  // extension: Math.floor(Math.random() * 1000) + 800 // 800 - 1799
  // },
  // )
  // }

  const { data: result, error } = await supabase
    .from("central_directory")
    .insert(data);

  if (error) console.error("Error:", error);
  else console.log("Extensions Seeded", result);
};

generateExtensionData();
