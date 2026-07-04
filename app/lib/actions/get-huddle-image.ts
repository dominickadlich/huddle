'use server'

import { success } from "zod";
import { getAuthenticatedClient } from "../supabase/auth-helpers";

export async function getHuddleImage({
    huddle_id,
    storage_path
}: {
    huddle_id: string,
    storage_path: string,
}) {
    try {
        const { supabase } = await getAuthenticatedClient();

        const { data, error } = await supabase.storage
            .from('huddle_pics')
            .createSignedUrl(storage_path, 3600)

        if (error) throw error;

        if (data) {
            console.log(data.signedUrl)
        }

        return {
            success: true,
            message: 'Image successfully loaded from the server'
        }
    } catch (error) {
        return {
            success: false,
            message: `Failed to load image from the server. ${error}`
        }
    }
}