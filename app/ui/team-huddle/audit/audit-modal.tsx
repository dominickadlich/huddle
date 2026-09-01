"use client"

import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react"
import { formatDate } from "@/app/lib/utils/utils"
import type { AuditRow } from "@/app/lib/data/fetch_audit"

const FIELD_LABELS: Record<string, string> = {
    safety: 'Safety',
    barriers: 'Barriers',
    wins: 'Wins',
    announcements: 'Announcements',
    inventory: 'Inventory',
}

const OPERATION_STYLES: Record<AuditRow['operation'], string> = {
    INSERT: 'bg-green-500/10 text-green-400 border-green-500/20',
    UPDATE: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    DELETE: 'bg-red-500/10 text-red-400 border-red-500/20',
}

function getChangedFields(row: AuditRow): string[] {
    if (row.operation !== 'UPDATE' || !row.old_data || !row.new_data) return []

    return Object.keys(row.new_data).filter(
        (key) => row.old_data![key] !== row.new_data![key]
    )
}

function displayValue(value: unknown): string {
    if (value === null || value === undefined || value === '') return '—'
    return String(value)
}

export default function AuditModal({
    showModal,
    onClose,
    rows,
}: {
    showModal: boolean
    onClose: () => void
    rows: AuditRow[]
}) {
    return (
        <Dialog open={showModal} onClose={onClose} className="relative z-10">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-900/50 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
            />
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center mt-50 sm:items-start sm:p-0">
                    <DialogPanel
                        transition
                        className="relative transform overflow-hidden rounded-lg bg-gray-800 px-4 pt-4 pb-4 text-left shadow-xl outline -outline-offset-1 outline-white/10 transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-2xl sm:p-6 data-closed:sm:translate-y-0 data-closed:sm:scale-95"
                    >
                        <h2 className="text-lg font-medium text-white mb-4">Today's Changes</h2>

                        <div className="grid grid-cols-1 gap-3 max-h-96 overflow-y-auto">
                            {rows.length === 0 && (
                                <p className="text-sm text-gray-500 py-4 text-center">No changes today</p>
                            )}

                            {rows.map((row) => {
                                const changedFields = getChangedFields(row)
                                const userName = row.users?.full_name ?? 'Unknown'

                                return (
                                    <div key={row.id} className="border border-gray-700/50 rounded-lg p-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className={`text-xs font-medium px-2 py-1 rounded-md border ${OPERATION_STYLES[row.operation]}`}>
                                                {row.operation}
                                            </span>
                                            <span className="text-xs text-gray-400">
                                                {userName} · {formatDate(row.created_at)}
                                            </span>
                                        </div>

                                        {row.operation === 'UPDATE' && changedFields.length > 0 && (
                                            <div className="space-y-1.5">
                                                {changedFields.map((key) => (
                                                    <div key={key} className="text-sm">
                                                        <span className="text-gray-400">{FIELD_LABELS[key] ?? key}:</span>{' '}
                                                        <span className="text-gray-500 line-through">
                                                            {displayValue(row.old_data![key])}
                                                        </span>{' '}
                                                        <span className="text-white">
                                                            → {displayValue(row.new_data![key])}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {row.operation === 'INSERT' && (
                                            <div className="text-sm text-gray-300">Entry created</div>
                                        )}

                                        {row.operation === 'DELETE' && (
                                            <div className="text-sm text-gray-300">Entry removed</div>
                                        )}
                                    </div>
                                )
                            })}
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}