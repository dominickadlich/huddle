'use server'

import { getAuthenticatedClient } from "../supabase/auth-helpers";

export async function getHuddleImage({
    huddle_id,
}: {
    huddle_id: string,
}) {
    try {
        const { supabase } = await getAuthenticatedClient();

        const { data, error } = await supabase
            .from('team_huddle_images')
            .select("storage_path")
            .eq("huddle_id", huddle_id)

        const signedUrls = await Promise.all(
            data?.map(async (row) => {
                const { data: signedData, error } = await supabase.storage
                    .from('huddle_pics')
                    .createSignedUrl(row.storage_path, 3600)

                    if (error) throw error;

                return signedData?.signedUrl
            }) ?? []
)

        if (error) throw error;

        if (data) {
            console.log(signedUrls)
        }

        return {
            success: true,
            message: 'Image successfully loaded from the server',
            signedUrls
        }
    } catch (error) {
        return {
            success: false,
            message: `Failed to load image from the server. ${error}`
        }
    }
}