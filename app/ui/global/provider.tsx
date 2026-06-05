"use client"

import { EditModeContext } from "@/app/lib/context/EditModeContext"
import { useState } from "react"

// Pulls isEditMode data from page client to prevent navigation before updates have been submitted
export default function EditModeProvider({ children }: { children: React.ReactNode}) {
    const [isEditMode, setIsEditMode] = useState<boolean>(false)

    return (
        <EditModeContext value={{ isEditMode, setIsEditMode}}>
            {children}
        </EditModeContext>
    )
}