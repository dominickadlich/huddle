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