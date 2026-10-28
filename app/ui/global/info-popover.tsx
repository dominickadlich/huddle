'use client';

import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import type { ReactNode } from 'react';

type InfoPopoverProps = {
  /** What shows in the header/bar (the date, "Last Update: ..."). */
  trigger: ReactNode;
  /** What opens on click (Calendar, AuditSummaryCard, ...). */
  children: ReactNode;
  /** Override panel width per use, e.g. 'w-[26rem]'. */
  panelWidth?: string;
  /** Replaces the default (small gray) trigger styling, e.g. for the big header date. */
  buttonClassName?: string;
};

const DEFAULT_BUTTON =
  'inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm text-gray-400 transition hover:bg-gray-700/40 hover:text-gray-200 focus:outline-none data-focus:ring-2 data-focus:ring-indigo-500 data-open:bg-gray-700/40 data-open:text-gray-200';

export default function InfoPopover({
  trigger,
  children,
  panelWidth = 'w-[24rem]',
  buttonClassName = DEFAULT_BUTTON,
}: InfoPopoverProps) {
  return (
    <Popover>
      <PopoverButton className={buttonClassName}>
        {trigger}
      </PopoverButton>

      <PopoverPanel
        anchor="bottom end"
        transition
        className={`z-50 ${panelWidth} max-w-[calc(100vw-2rem)] rounded-xl border border-white/10 bg-gray-900/90 p-2 shadow-2xl backdrop-blur-md [--anchor-gap:8px] transition duration-150 ease-out data-closed:-translate-y-1 data-closed:opacity-0`}
      >
        {children}
      </PopoverPanel>
    </Popover>
  );
}