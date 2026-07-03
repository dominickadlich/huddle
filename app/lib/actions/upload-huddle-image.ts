'use server'

import { UUID } from "crypto"
import { getAuthenticatedClient } from "../supabase/auth-helpers"

export async function uploadHuddleImage({
    formData,
    storage_path,
    id,
    huddle_id,
}: {
    formData: FormData
    storage_path: string
    id: string,
    huddle_id: string,
}) {
    const file = formData.get("file-upload")
    if (!file) throw new Error("No file provided")

    try {
        const { supabase, userId } = await getAuthenticatedClient();

        const { data, error } = await supabase.storage
            .from('huddle_pics')
            .upload(storage_path, file)

        if (error) {
            console.error(`Storage upload failed: ${error.message}`)
            throw error;
        }

        const { error: insertError } = await supabase
        .from("team_huddle_images")
        .insert({
            storage_path: storage_path,
            id: id,
            huddle_id: huddle_id,
            uploaded_by: userId
        })

        if (insertError) {
            console.error(`DB Insertion failed: ${insertError.message}`)
            throw insertError;
        }

        return {
            success: true,
            message: 'Uploaded image successfully!',
        }
    } catch (error) {
        return {
            success: false,
            message: 'Failed to upload image to database',
        }
    }
}