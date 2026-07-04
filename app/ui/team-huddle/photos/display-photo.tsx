'use client'

import { getHuddleImage } from "@/app/lib/actions/get-huddle-image"
import { formatDate } from "@/app/lib/utils/utils"
import { useEffect, useState } from "react"
import PhotoLightbox from "./lightbox"

export default function DisplayPhoto({
    huddle_id,
    department
}: {
    huddle_id: string
    department: string
}) {
    const [signedUrls, setSignedUrls] = useState<{ url: string, created_at: string }[] | undefined>()
    const [lightboxOpen, setLightboxOpen] = useState<boolean>(false)
    const [selectedIndex, setSelectedIndex] = useState<number>(0)
    
    useEffect(() => {
        (async () => {
            const promise = await getHuddleImage({huddle_id})
            if (promise.success === true) {
                setSignedUrls(promise.signedUrls)
            }
        })
        () // Call the async function immediately
    }, [huddle_id])

    
    
    
    return (
        <div>
            {signedUrls && 
                signedUrls?.map((url, i) => (
                    <img
                        key={url.url}
                        src={url.url}
                        alt={`${department} photo, created on:${formatDate(url.created_at)}`}
                        onClick={() =>  {
                            setLightboxOpen(true)
                            setSelectedIndex(i)
                        }}
                    />
            ))}
            {signedUrls && (
                <PhotoLightbox 
                    photos={signedUrls} 
                    initialPhotoIndex={selectedIndex} 
                    open={lightboxOpen}
                    onClose={() => setLightboxOpen(false)}
                />
            )}
        </div>
    )
}