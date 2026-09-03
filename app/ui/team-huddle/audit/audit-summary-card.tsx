'use client'

import { AuditRow, fetchAuditByDate } from "@/app/lib/data/fetch_audit"
import { formatDate, getLocalDate } from "@/app/lib/utils/utils"
import { useEffect, useState } from "react"
import AuditModal from "./audit-modal"

const FIELD_LABELS: Record<string, string> = {
    safety: 'Safety',
    barriers: 'Barriers',
    wins: 'Wins',
    announcements: 'Announcements',
    inventory: 'Inventory',
}

function describeChange(row: AuditRow): string {
    if (row.operation === 'INSERT') return 'Entry Created'
    if (row.operation === 'DELETE') return 'Entry removed'

    if (row.old_data && row.new_data) {
        const changedKey = Object.keys(row.new_data).find(
            key => row.old_data![key] !== row.new_data![key]
        )
        if (changedKey) return FIELD_LABELS[changedKey] ?? changedKey
    }
    return 'Updated'
}


export default function AuditSummaryCard({ 
    tableName,
    date,
}: { 
    tableName: string,
    date: string
}) {
    const [rows, setRows] = useState<AuditRow[] | null>(null)
    const [showModal, setShowModal] = useState<boolean>(false)


    useEffect(() => {
        fetchAuditByDate(date, tableName).then(setRows)
    }, [date, tableName])

    if (!rows || rows.length === 0) {
        return (
            <div className="rounded-2xl border border-gray-400/50 bg-gray-800/30 p-4">
                <h3 className="text-sm font-medium text-gray-400 mb-2">Recent Changes</h3>
                <p className="text-sm text-gray-500">No changes today</p>
            </div>
        )
    }

    const mostRecent = rows[0] // already ordered desc by created_at

    return (
        <>
            <button
                onClick={() => setShowModal(true)}
                className="w-full text-left rounded-2xl border border-gray-400/50 bg-gray-800/30 p-4 hover:border-gray-400 transition-colors"
            >
                <h3 className="text-sm font-medium text-gray-400 mb-2">Recent Changes</h3>
                <p className="text-white">{rows.length} update{rows.length !== 1 ? 's' : ''} today</p>
                <p className="text-sm text-gray-400 mt-1">
                    Last: {describeChange(mostRecent)} · {formatDate(mostRecent.created_at)}
                </p>
            </button>
            <AuditModal
                showModal={showModal}
                onClose={() => setShowModal(false)}
                rows={rows}
            />
        </>
    )

}