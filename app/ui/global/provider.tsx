"use client"

import { EditModeContext } from "@/app/lib/context/EditModeContext"
import { useState } from "react"

// Pulls isEditMode data from page client to prevent navigation before updates have been submitted
export default function EditModeProvider({ children }: { children: React.ReactNode}) {
    const [isEditMode, setIsEditMode] = useState<boolean>(false)
    const [misclickWarning, setMisclickWarning] = useState<boolean>(false)
    const [pendingHref, setPendingHref] = useState<string | null>(null)

    return (
        <EditModeContext value={{ 
            isEditMode,
            setIsEditMode,
            misclickWarning,
            setMisclickWarning,
            pendingHref,
            setPendingHref,
        }}>
            {children}
        </EditModeContext>
    )
}