import PageClient from "./page-client";

export default function Page() {
    return (
        <PageClient initialData={{
            announcements: null,
            assignment_two: null,
            barriers: null,
            bell_iv: null,
            created_at: null,
            created_by: null,
            date: "",
            hazardous: null,
            id: "",
            inventory: null,
            iv_support: null,
            opportunities: null,
            safety: null,
            sc: null,
            shift: "",
            summary_text: null,
            team_building: null,
            tpn: null,
            training: null,
            updated_at: null,
            updated_by: null,
            wins: null
        }} />
    )
}