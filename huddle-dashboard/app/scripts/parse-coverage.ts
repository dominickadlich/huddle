import fs from "fs";
import path from "path";

type Coverage = {
  team: string;
  phone: string;
  floors: string[];
  service?: string;
  shift: "weekday-day" | "weekday-evening" | "weekend";
};

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === "," && !inQuotes) {
      result.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }

  result.push(current.trim());
  return result;
}

function parseCSV(
  filePath: string,
  hasHeader: boolean,
  shift: Coverage["shift"],
): Coverage[] {
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const lines = fileContent.trim().split("\n");

  // Skip header if present
  const dataLines = hasHeader ? lines.slice(1) : lines;

  const coverage: Coverage[] = [];

  for (const line of dataLines) {
    const columns = parseCSVLine(line);

    if (columns.length < 3 || !columns[0]) continue; // Skip invalid lines

    const team = columns[0];
    const phone = columns[1] || "--";
    const floorsRaw = columns[2] || "";
    const service = columns[3] || undefined;

    // Split floors by comma and clean them up
    const floors = floorsRaw
      .split(",")
      .map((f) => f.trim())
      .filter((f) => f && f !== "--" && f !== '""' && f !== "-");

    if (floors.length === 0) continue; // Skip entries with no floors

    coverage.push({
      team,
      phone,
      floors,
      service,
      shift,
    });
  }

  return coverage;
}

// Parse all three CSV files
const weekdayDay = parseCSV(
  path.join(process.cwd(), "Weekday_Shifts.csv"),
  true, // Has header
  "weekday-day",
);

const weekdayEvening = parseCSV(
  path.join(process.cwd(), "Weekday_Evening_Shifts.csv"),
  false, // Has header
  "weekday-evening",
);

const weekend = parseCSV(
  path.join(process.cwd(), "Weekend_Shifts.csv"),
  true, // Has header
  "weekend",
);

// Combine TypeScript file content
const allCoverage = [...weekdayDay, ...weekdayEvening, ...weekend];

// Generate TypeScript file content
const tsContent = `// Auto-generated from CSV files
// Do not edit manually - run pnpm run parse-coverage to regenerate

export type Coverage = {
    team: string
    phone: string
    floors: string[]
    service?: string
    shift: 'weekday-day' | 'weekday-evening' | 'weekend'
}

export const floorCoverage: Coverage[] = ${JSON.stringify(allCoverage, null, 2)}

// Helper function to find coverage by floor name
export function findCoverageByFloor(
    floorName: string,
    shift: Coverage['shift']
): Coverage[] {
    const searchTerm = floorName.toUpperCase().trim()

    return floorCoverage.filter(coverage =>
        coverage.shift === shift &&
        coverage.floors.some(floor =>
            floor.toUpperCase().includes(searchTerm) ||
            searchTerm.includes(floor.toUpperCase())
        )
    )
}
`;

// Write the TypeScript file
const outputPath = path.join(process.cwd(), "app", "lib", "floor-coverage.ts");
fs.writeFileSync(outputPath, tsContent, "utf-8");

console.log(`✅ Generated ${outputPath}`);
console.log(`📊 Total entries: ${allCoverage.length}`);
console.log(`   - Weekday Day: ${weekdayDay.length}`);
console.log(`   - Weekday Evening: ${weekdayEvening.length}`);
console.log(`   - Weekend: ${weekend.length}`);
