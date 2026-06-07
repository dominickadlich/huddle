'use client'

import { useContext } from 'react'
import { Dispatch, SetStateAction } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { EditModeContext } from "@/app/lib/context/EditModeContext"
import { useRouter } from 'next/navigation'
import { CancelButton, SubmitButton } from '../global/buttons'

export default function MisclickPopUp({ summaryModal }: { summaryModal: Dispatch<SetStateAction<boolean>>}) {
    const router = useRouter()
  const { 
          isEditMode, 
          setIsEditMode,
          misclickWarning, 
          setMisclickWarning,
          pendingHref, 
          setPendingHref,
       } = useContext(EditModeContext)

  return (
    <div>
      <Dialog open={misclickWarning} onClose={setMisclickWarning} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-900/50 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-gray-800 px-4 pt-5 pb-4 text-left shadow-xl outline -outline-offset-1 outline-white/10 transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg sm:p-6 data-closed:sm:translate-y-0 data-closed:sm:scale-95"
            >
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-500/10 sm:mx-0 sm:size-10">
                  <ExclamationTriangleIcon aria-hidden="true" className="size-6 text-red-400" />
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <DialogTitle as="h3" className="text-base font-semibold text-white">
                    Continue without saving?
                  </DialogTitle>
                  <div className="mt-2">
                    <p className="text-sm text-gray-400">
                      Are you sure you want to continue without saving? None of the information will be saved. This action cannot be undone.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse gap-4">
                <SubmitButton
                  onClick={() => {
                    setMisclickWarning(false)
                    summaryModal(true)
                }} />
                <CancelButton
                  data-autofocus
                  onClick={() => setMisclickWarning(false)}
                 />
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  )
}
