// CREATE OR REPLACE FUNCTION HUDDLE_UPDATES
// RETURNS TABLE (department TEXT, safety TEXT, barriers TEXT, inventory TEXT, wins TEXT)
// SELECT 'IVR' as department, safety, barriers, inventory, wins
// FROM iv_room
// UNION ALL
// SELECT 'Distribution' as department, safety, barriers, inventory, wins
// FROM distribution
// UNION ALL
// SELECT 'CC/CSR/PP' as department, safety, barriers, inventory, wins
// FROM command_center

// Output
{
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
    
}