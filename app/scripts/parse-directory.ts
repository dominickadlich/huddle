import fs from "fs";
import path from "path";

type Contact = {
  location: string;
  phone: string;
  category: string;
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

function parseCSV(filePath: string, hasHeader: boolean): Contact[] {
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const lines = fileContent.trim().split(/\r?\n/);

  // Skip if header present
  const dataLines = hasHeader ? lines.slice(1) : lines;

  const contact: Contact[] = [];

  for (const line of dataLines) {
    const columns = parseCSVLine(line);

    if (columns.length < 3 || !columns[0]) continue;

    const location = columns[0];
    const phone = columns[1];
    const category = columns[2];

    contact.push({
      location,
      phone,
      category,
    });
  }

  return contact;
}

// Parse directory CSV
const phoneDirectory = parseCSV(
  path.join(process.cwd(), "Phone_Directory.csv"),
  true, // Has Header
);

// Generate TypeScript file content
const tsContent = `
// Auto-generated from CSV file
// Do not edit manually - run pnpm run parse-directory to regenerate

export type Contact = {
   location: string
   phone: string
   category: string
}

export const directory: Contact[] = ${JSON.stringify(phoneDirectory, null, 2)}`;

const outputPath = path.join(process.cwd(), "app", "lib", "phone-directory.ts");
fs.writeFileSync(outputPath, tsContent, "utf-8");

console.log(`✅ Generated ${outputPath}`);
console.log(`📊 Total entries: ${phoneDirectory.length}`);
