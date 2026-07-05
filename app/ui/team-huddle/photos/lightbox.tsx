'use client'

import { useEffect ,useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import { XMarkIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

interface PhotoInterface { 
    url: string;
    created_at: string 
}

export default function PhotoLightbox({ 
    photos,
    initialPhotoIndex,
    open, 
    onClose
}: {
    photos: PhotoInterface[],
    initialPhotoIndex: number
    open: boolean
    onClose: () => void 
}) {
  const [currentIndex, setCurrentIndex] = useState(initialPhotoIndex || 0);

  const currentPhoto = photos[currentIndex];

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  }

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent ) => {
      if (!open) return;

      switch (e.key) {
        case 'ArrowLeft':
          goToPrevious();
          break;
        case 'ArrowRight':
          goToNext();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    };

  }, [open])

  return (
    <div>
      <Dialog open={open} onClose={onClose} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in data-closed:sm:translate-y-0 data-closed:sm:scale-95"
            >
                <button
                  type="button"
                  onClick={onClose}
                  className="absolute top-4 left-4 z-10 rounded-full p-2 bg-black/50 text-white hover:bg-black/70"
                >
                  <span className="sr-only">Close</span>
                  <XMarkIcon aria-hidden="true" className="size-6" />
                </button>

                <div className='group relative'>
                  { currentPhoto &&
                    <img 
                        src={currentPhoto.url}
                        alt={currentPhoto.created_at}
                        className="max-w-[90vw] max-h-[90vh] rounded-lg shadow-2xl"
                    />
                  }
                <button
                  type='button'
                  onClick={() => goToNext()}
                  className="absolute top-1/2 right-4 rounded-full p-2 bg-black/50 text-white hover:bg-black/70"
                >
                  <span className="sr-only">Next Picture</span>
                  <ChevronRightIcon aria-hidden="true" className="size-6" />
                </button>

                  <button
                  type='button'
                  onClick={() => goToPrevious()}
                  className="absolute top-1/2 left-4 rounded-full p-2 bg-black/50 text-white hover:bg-black/70"
                >
                  <span className="sr-only">Previous Picture</span>
                  <ChevronLeftIcon aria-hidden="true" className="size-6" />
                </button>

                <p className='absolute top-4 right-4 text-white rounded-full bg-black/50 p-2'>{currentIndex + 1}/{photos.length}</p>
                </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  )
}