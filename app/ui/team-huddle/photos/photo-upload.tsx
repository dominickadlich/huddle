'use client'

import { uploadHuddleImage } from "@/app/lib/actions/upload-huddle-image"
import { PhotoIcon } from "@heroicons/react/24/outline"
import { SetStateAction, useState } from "react";

export default function UploadPhoto({
  huddle_id,
  department,
}: {
  huddle_id: string;
  department: string;
}) {
  const [uploadImageMessage, setUploadImageMessage] = useState<string | null>(null)
  const [successState, setSuccessState] = useState<boolean | null>(null)

const TEN_MEGABYTES = 10000000

  const messageColor = successState === true 
    ? 'text-green-400' 
    : successState === false 
      ? 'text-red-400' 
      : 'text-gray-400'

  const acceptableExt = ['jpg', 'jpeg', 'png']
      
  const messageText = uploadImageMessage ?? 'PNG, JPG up to 10MB'

    return (
        <div className="mt-4 col-span-full">
              <div className="mb-4 flex justify-center rounded-lg border border-dashed border-white/25 px-6 py-10">
                <div className="text-center">
                  <PhotoIcon aria-hidden="true" className="mx-auto size-12 text-gray-500" />
                  <div className="mt-4 flex text-sm/6">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-transparent font-semibold text-indigo-400 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input 
                        id="file-upload"
                        name="file-upload"
                        type="file" 
                        className="sr-only" 
                        onChange={async (e) => {
                          if (e.target.files !== null) {
                            const file = e.target.files[0]
                            const fileSize = file.size
                            const fileName = file.name.split('.')
                            const ext = fileName.at(-1)
                            console.log({ fileSize: file.size, ext })

                            if (fileSize > TEN_MEGABYTES) {
                              setSuccessState(false)
                              setUploadImageMessage("File too big")
                              return
                            }

                            if (!ext) {
                              setSuccessState(false)
                              setUploadImageMessage("Unable to determine file type")
                              return
                            }

                            if (!acceptableExt.includes(ext) ) {
                              setSuccessState(false)
                              setUploadImageMessage("Please upload a jpg, jpeg, or png file.")
                              return
                            }

                            const formData = new FormData()
                            const id = crypto.randomUUID()
                            formData.append("file-upload", file)
                            const storage_path = `${department}/${id}.${ext}`
                            const promise = await uploadHuddleImage({formData, storage_path, id, huddle_id})
                            setUploadImageMessage(promise.message)
                            setSuccessState(promise.success)
                          }
                        }}
                      />
                    </label>
                    <p className="pl-1 text-gray-400">or drag and drop</p>
                  </div>
                    <p className={`text-xs/5 ${messageColor}`}>{messageText}</p>
                </div>
              </div>
            </div>
    )
}