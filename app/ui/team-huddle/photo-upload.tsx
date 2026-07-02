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
    return (
        <div className="col-span-full">
              <div className="mb-4 flex justify-center rounded-lg border border-dashed border-white/25 px-6 py-10">
                <div className="text-center">
                  <PhotoIcon aria-hidden="true" className="mx-auto size-12 text-gray-500" />
                  <div className="mt-4 flex text-sm/6 text-gray-400">
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
                        onChange={(e) => {
                          const formData = new FormData()
                          const id = crypto.randomUUID()
                          if (e.target.files !== null) {
                            const file = e.target.files[0]
                            formData.append("file-upload", file)
                            const fileName = file.name.split('.')
                            const ext = fileName.at(-1)
                            const storage_path = `${department}/${id}.${ext}`
                            uploadHuddleImage({formData, storage_path, id, huddle_id})
                          }
                        }}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs/5 text-gray-400">PNG, JPG up to 10MB</p>
                </div>
              </div>
            </div>
    )
}