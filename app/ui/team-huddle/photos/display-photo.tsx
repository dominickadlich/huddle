'use client'

import { getHuddleImage } from "@/app/lib/actions/get-huddle-image"
import { formatDate } from "@/app/lib/utils/utils"
import { useEffect, useState } from "react"
import PhotoLightbox from "./lightbox"
import { CameraIcon } from "@heroicons/react/24/outline"

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
            <div className="mt-4 min-h-77 group relative overflow-hidden rounded-2xl border border-gray-400/50 bg-gray-800/30 backdrop-blur-sm p-6">
                {/* Content */}
                <div className="relative z-10">
                {/* Header */}
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-700/50 transition-colors duration-300">
                    <div className="flex items-center justify-center gap-2 flex-1">
                    <CameraIcon className="h-6 w-6 text-md font-semibold text-gray-300  transition-colors duration-300" />
                    <h3 className="text-lg font-semibold text-gray-300  transition-colors duration-300">
                        Pictures
                    </h3>
                    </div>
                </div>
                </div>

                {/* Value Display */}
                <div className="flex justify-center items-center min-h-[2rem]">
                    {signedUrls?.length !== 0 
                        ? signedUrls?.map((url, i) => (
                            <img
                                className="p-2 size-44 object-contain cursor-pointer"
                                key={url.url}
                                src={url.url}
                                alt={`${department} photo, created on:${formatDate(url.created_at)}`}
                                onClick={() =>  {
                                    setSelectedIndex(i)
                                    setLightboxOpen(true)
                                }}
                            />
                    ))
                    : <p>No pictures</p>
                }
                </div>
            </div>
            
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