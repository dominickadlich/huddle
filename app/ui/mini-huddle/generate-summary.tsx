import { CommandCenter, Distribution, IvRoom, Nonsterile } from "@/app/lib/types/database";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";

export default function GenerateSummary({
    fields,
    open,
    onSave,
    onClose,
}: {
    fields: IvRoom | Distribution | CommandCenter | Nonsterile;
    open: boolean;
    onSave: (value: string) => void;
    onClose: () => void;
}) {
  const [editedSummary, setEditedSummary] = useState('');

    useEffect(() => {
        if (open) {
            const parts = [];
            if (fields.safety) parts.push(`Safety: ${fields.safety.substring(0, 500)}`);
            if (fields.barriers) parts.push(`Barriers: ${fields.barriers.substring(0, 500)}`);
            if (fields.wins) parts.push(`Wins: ${fields.wins.substring(0, 500)}`);
            
            setEditedSummary(parts.join('.\n'));
        }
    }, [open, fields]);

    return (
    <div>
      <Dialog open={open} onClose={onClose} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-900/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        />

        <div className="fixed inset-0 z-10 flex items-center justify-center p-4">
            <DialogPanel
              transition
              className="group relative w-full max-w-lg transform overflow-hidden rounded-2xl border border-gray-400/50 bg-gray-800/30 backdrop-blur-sm p-6 text-left shadow-xl transition-all data-closed:scale-95 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
            >
              {/* Content */}
              <div className="relative z-10">
                {/* Header */}
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-700/50 group-hover:border-indigo-500/30 transition-colors duration-300">
                  <div className="flex items-center justify-center gap-2 flex-1">
                    <CheckIcon className="h-6 w-6 text-gray-300 group-hover:text-indigo-300 transition-colors duration-300" />
                    <DialogTitle as="h3" className="text-lg font-semibold text-gray-300 group-hover:text-indigo-300 transition-colors duration-300">
                      Generate Summary
                    </DialogTitle>
                  </div>
                </div>
              </div>

              {/* Value Display */}
              <div className="flex justify-center items-center min-h-[2rem]">
                <textarea
                    name="summary_text"
                    value={editedSummary}
                    onChange={(e) => setEditedSummary(e.target.value)}
                    rows={6}
                    className="w-full p-2 text-white bg-gray-900/50 border border-gray-600 rounded-md focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="mt-5 grid grid-flow-row-dense grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    onSave(editedSummary);
                    onClose()
                    }}
                  className="inline-flex w-full justify-center rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 col-start-2"
                >
                  Save
                </button>
                <button
                  type="button"
                  data-autofocus
                  onClick={onClose}
                  className="inline-flex w-full justify-center rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white shadow-xs inset-ring-1 inset-ring-white/5 hover:bg-white/20 col-start-1"
                >
                  Cancel
                </button>
              </div>
            </DialogPanel>
        </div>
      </Dialog>
    </div>
  )
}

