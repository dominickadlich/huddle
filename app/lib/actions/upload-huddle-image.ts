'use server'

import { getAuthenticatedClient } from "../supabase/auth-helpers"

export async function uploadHuddleImage({
    formData,
    storage_path,
    id,
    department
}: {
    formData: FormData
    storage_path: string
    id: string,
    department: string
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
            uploaded_by: userId,
            department: department
        })

        if (insertError) {
            console.error(`DB Insertion failed: ${insertError.message}`)
            try {
                const { error: removeError } = await supabase.storage.from('huddle_pics').remove([storage_path])

                if (removeError) throw removeError;
            } catch (error) {
                console.error(`Failed to clean up orphaned file at ${storage_path}: ${error}`)
            }

            throw insertError;
        }

        return {
            success: true,
            message: 'Uploaded image successfully!',
        }
    } catch (error) {
        return {
            success: false,
            message: 'Upload failed. Please try a smaller file or contact support.',
        }
    }
}