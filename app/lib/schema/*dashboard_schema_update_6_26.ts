// CREATE OR REPLACE FUNCTION huddle_categories(p_date date, p_shift text)
// RETURNS TABLE (department TEXT, safety TEXT, barriers TEXT, inventory TEXT, wins TEXT)
// LANGUAGE sql
// AS $$
// SELECT 'IVR' as department, safety, barriers, inventory, wins
// FROM iv_room
// WHERE date = p_date 
// AND shift = p_shift
// UNION ALL
// SELECT 'Distribution' as department, safety, barriers, inventory, wins
// FROM distribution
// WHERE date = p_date 
// AND shift = p_shift
// UNION ALL
// SELECT 'CC/CSR/PP' as department, safety, barriers, inventory, wins
// FROM command_center
// WHERE date = p_date 
// AND shift = p_shift
// $$

// SQL output
// [
//   { "department": "IVR", "safety": "...", "barriers": "...", "inventory": "...", "wins": "..." },
//   { "department": "Distribution", "safety": "...", "barriers": "...", "inventory": "...", "wins": "..." },
//   { "department": "CC/CSR/PP", "safety": "...", "barriers": "...", "inventory": "...", "wins": "..." }
// ]

interface HandleRow {
    department: string;
    safety: string;
    barriers: string;
    inventory: string;
    wins: string
}

interface TransposedOutput {
    safety: { department: string; text: string}[];
    barriers: { department: string; text: string}[];
    inventory: { department: string; text: string}[];
    wins: { department: string; text: string}[];
}

export default function transposeLoop({ 
    data
}: {
    data: HandleRow[] 
}) {
    const result: TransposedOutput = {
        safety: [],
        barriers: [],
        inventory: [],
        wins: []
    };

    data.forEach((row) => {
        result.safety.push({ department: row.department, text: row.safety})
        result.barriers.push({ department: row.department, text: row.barriers})
        result.inventory.push({ department: row.department, text: row.inventory})
        result.wins.push({ department: row.department, text: row.wins})
    })

    return result;
}

// TypeScript output
// Output
// {
    // safety: [
        // { department: 'IVR', text: '...',}
        // { department:'Distribution', text: '...',}
        // { department: 'CC/CSR/PP', text: '...',}
    // ],
    // barriers: [
        // { department: 'IVR', text: '...',}
        // { department:'Distribution', text: '...',}
        // { department: 'CC/CSR/PP', text: '...',}
    // ],
    // inventory: [
        // { department: 'IVR', text: '...',}
        // { department:'Distribution', text: '...',}
        // { department: 'CC/CSR/PP', text: '...',}
    // ],
    // wins: [
        // { department: 'IVR', text: '...',}
        // { department:'Distribution', text: '...',}
        // { department: 'CC/CSR/PP', text: '...',}
    // ],
    
// }