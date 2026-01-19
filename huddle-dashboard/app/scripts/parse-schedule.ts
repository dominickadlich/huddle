import fs from "fs";
import path from "path";

type Shift = {
  name: string;
  team: string;
  date: string;
  shiftName: string;
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

function parseCSV(filePath: string): Shift[] {
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const lines = fileContent.trim().split(/\r?\n/);

  // First line is the header with dates
  const headerColumns = parseCSVLine(lines[0]);

  // Extract dates from the header (skip the first 2 columns: Name, Team)
  const dates = headerColumns.slice(2);

  console.log(
    `📅 Found ${dates.length} dates from ${dates[0]} to ${dates[dates.length - 1]}`,
  );

  const shifts: Shift[] = [];

  for (let i = 1; i < lines.length; i++) {
    const columns = parseCSVLine(lines[i]);

    if (columns.length < 3 || !columns[0]) continue; // Skip invalid lines

    const name = columns[0];
    const team = columns[1];

    for (let dateIndex = 0; dateIndex < dates.length; dateIndex++) {
      const columnIndex = dateIndex + 2; // +2 because the first 2 columns are name/team
      const shiftName = columns[columnIndex];

      // Skip empty shifts or placeholders
      if (!shiftName || shiftName === "-" || shiftName === "") continue;

      shifts.push({
        name,
        team,
        date: dates[dateIndex],
        shiftName,
      });
    }
  }

  return shifts;
}

// Parse schedule CSV
const schedule = parseCSV(
  path.join(process.cwd(), "1-4-26_to_2-14-26_Schedule.csv"),
);

const tsContent = `
// Auto-generate from CSV file
// Do not edit manually - run pnpm run parse-schedule to regenerate

export type Shift = {
    name: string
    team: string
    date: string
    shiftName: string
}

export const schedule: Shift[] = ${JSON.stringify(schedule, null, 2)}

// Helper function to find who's working on a specific date
export function getShiftsByDate(date: string): Shift[] {
    return schedule.filter(shift => shift.date === date)
}

// Helper function to find a person's schedule
export function getShiftsByPerson(name: string): Shift[] {
    return schedule.filter(shift => 
        shift.name.toLowerCase().includes(name.toLowerCase())
    )
}

// Helper function to find shifts by team
export function getShiftsByTeam(team: string): Shift[] {
    return schedule.filter(shift => shift.team === team)
}

// Get all unique dates in the schedule
export function getAllDates(): string[] {
    const dates = [...new Set(schedule.map(shift => shift.date))]
    return dates.sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
}

// Get all unique people
export function getAllPeople(): string[] {
    return [...new Set(schedule.map(shift => shift.name))].sort()
}

// Get all unique teams
export function getAllTeams(): string[] {
    return [...new Set(schedule.map(shift => shift.team))].sort()
}
`;

const outputPath = path.join(process.cwd(), "app", "lib", "schedule.ts");
fs.writeFileSync(outputPath, tsContent, "utf-8");

console.log(`✅ Generated ${outputPath}`);
console.log(`📊 Total shifts: ${schedule.length}`);
console.log(
  `👥 Total people: ${[...new Set(schedule.map((s) => s.name))].length}`,
);
console.log(
  `📅 Date range: ${schedule[0]?.date} to ${schedule[schedule.length - 1]?.date}`,
);
