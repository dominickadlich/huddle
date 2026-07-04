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
            .select("storage_path, created_at")
            .eq("huddle_id", huddle_id)


        const signedUrls = (await Promise.all(
            data?.map(async (row: { storage_path: string, created_at: string }) => {
                const { data: signedData, error } = await supabase.storage
                    .from('huddle_pics')
                    .createSignedUrl(row.storage_path, 3600)

                if (error) throw error;

                return { url: signedData?.signedUrl, created_at: row.created_at }
            }) ?? []
        )).filter((item): item is { url: string; created_at: string } => !!item.url)

        if (error) throw error;

        if (data) {
            console.log(signedUrls)
        }

        return {
            success: true,
            message: 'Image successfully loaded from the server',
            signedUrls,
        }
    } catch (error) {
        return {
            success: false,
            message: `Failed to load image from the server. ${error}`
        }
    }
}