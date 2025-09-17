"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex h-screen flex-col items-center justify-center gap-2">
      <h2 className="text-center text-white">Something went wrong!</h2>
      <button
        className="mt-4 rounded-md bg-indigo-600 px-4 py-2 text-sm text-white transition-colors hover:bg-indigo-400"
        onClick={
          // Attempt to recover by trying to re-rended the directory route
          () => reset()
        }
      >
        Try Again
      </button>
    </main>
  );
}
