"use client";

import {
  useContext,
  useEffect,
  useMemo,
  useState,
  type ChangeEvent,
} from "react";
import Fuse from "fuse.js";
import StaticSearch from "../ui/static-search";
import {
  floorCoverage,
  type CoverageRow,
  type Shift,
} from "../lib/script-docs/floor-coverage";
import type { WDIPAssignment } from "../lib/types/database";
import { EditModeContext } from "../lib/context/EditModeContext";
import { useRouter } from "next/navigation";
import { upsertWDIPAssignments } from "../lib/actions/wdip-assignments";
import { CancelButton, EditButton, SubmitButton } from "../ui/global/buttons";
import { formatDate } from "../lib/utils/utils";

type FourthColumn = { label: string; render: (c: CoverageRow) => string };

const FOURTH_COLUMN: Record<Shift, FourthColumn> = {
  "weekday-day": { label: "Service", render: (c) => c.service ?? "" },
  weekend: { label: "Service", render: (c) => c.service ?? "" },
  "weekday-evening": { label: "Pharmacist", render: (c) => c.pharmacist ?? "" },
};

type Props = {
  shift: Shift;
  shiftDate: string;
  assignments: WDIPAssignment[];
};

export default function WdipPageClient({
  shift,
  shiftDate,
  assignments,
}: Props) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const { isEditMode, setIsEditMode } = useContext(EditModeContext);

  const [lastUpdatedLabel, setLastUpdatedLabel] = useState<string | null>(null);

  const rows: CoverageRow[] = useMemo(() => {
    const byTeam = new Map(
      assignments.map((a) => [a.team, a.pharmacist_name ?? undefined]),
    );
    return floorCoverage
      .filter((c) => c.shift === shift)
      .map((c) => ({ ...c, pharmacist: byTeam.get(c.team) }));
  }, [assignments, shift]);

  const original = useMemo(
    () => Object.fromEntries(rows.map((r) => [r.team, r.pharmacist ?? ""])),
    [rows],
  );

  const [draft, setDraft] = useState<Record<string, string>>(original);

  const fuse = useMemo(
    () =>
      new Fuse(rows, {
        keys: ["team", "floors", "service", "phone", "pharmacist"],
        threshold: 0.3,
      }),
    [rows],
  );

  const displayedCoverage = searchQuery
    ? fuse.search(searchQuery).map((r) => r.item)
    : rows;

  const [saving, setSaving] = useState(false);

  function handleSearchQuery(e: ChangeEvent<HTMLInputElement>) {
    setSearchQuery(e.target.value);
  }

  useEffect(() => {
    return () => setIsEditMode(false);
  }, [setIsEditMode]);

  const lastUpdated = useMemo(
    () =>
      assignments.reduce<string | null>(
        (latest, a) =>
          a.updated_at && (!latest || a.updated_at > latest)
            ? a.updated_at
            : latest,
        null,
      ),
    [assignments],
  );

  useEffect(() => {
    setLastUpdatedLabel(lastUpdated ? formatDate(lastUpdated) : null);
  }, [lastUpdated]);

  function startEdit() {
    setSearchQuery("");
    setDraft(original);
    setIsEditMode(true);
  }

  function cancelEdit() {
    setDraft(original); // the step the huddle page is missing
    setIsEditMode(false);
  }

  async function save() {
    if (saving) return;

    const changed = Object.entries(draft)
      .filter(([team, name]) => name.trim() !== original[team])
      .map(([team, name]) => ({
        team,
        shift,
        shift_date: shiftDate,
        pharmacist_name: name,
      }));

    if (changed.length === 0) {
      setIsEditMode(false);
      return;
    }

    setSaving(true);
    try {
      const result = await upsertWDIPAssignments(changed);
      if (result.success) {
        setIsEditMode(false);
        router.refresh();
      } else {
        alert(result.message);
      }
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      {/* <Header title="WDIP"/> */}
      <div className="mt-20">
        <div className="flex">
          <div className="text-4xl font-bold pr-4">
            WDIP:{" "}
            {shift
              .split("-")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")}
          </div>

          {/* Search Bar */}
          <div className="flex flex-1 items-center gap-4">
            <div className="flex-1">
              <StaticSearch
                placeholder={
                  "Enter a team name, phone number, floor number, service, or pharmacist"
                }
                onChange={handleSearchQuery}
                value={searchQuery}
              />
            </div>

            {shift === "weekday-evening" && (
              <div className="flex justify-center gap-4 ">
                {isEditMode ? (
                  <>
                    <CancelButton onClick={cancelEdit} />
                    <SubmitButton onClick={save} />
                  </>
                ) : (
                  <EditButton onClick={startEdit} />
                )}
              </div>
            )}
          </div>
        </div>

        <div className="mb-4 flex items-center gap-4 mt-10">
          <h2 className="flex items-center justify-start w-40 px-3 text-3xl font-bold text-indigo-400">
            Team
          </h2>
          <h2 className="flex-1 flex items-center justify-center text-3xl font-bold text-indigo-400">
            Number
          </h2>
          <h2 className="flex-1 flex items-center justify-center text-3xl font-bold text-indigo-400">
            Floors
          </h2>
          <div className="flex-1 grid grid-cols-[1fr_auto_1fr] items-center">
            <h2 className="col-start-2 flex justify-self-end text-3xl font-bold text-indigo-400">
              {FOURTH_COLUMN[shift].label}
            </h2>

            {shift === "weekday-evening" && (
              <div className="col-start-3 justify-self-end pr-4 flex flex-col items-end leading-tight">
                {lastUpdatedLabel ? (
                  <>
                    <span className="text-xs uppercase tracking-wide text-gray-500">
                      Updated
                    </span>
                    <span className="text-sm text-gray-400 whitespace-nowrap">
                      {lastUpdatedLabel}
                    </span>
                  </>
                ) : (
                  <span className="text-sm text-gray-400 whitespace-nowrap">
                    Not filled in yet
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* <div className="h-0.5 bg-indigo-500/50" /> */}

        {/* Information Row */}
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6 ">
          {displayedCoverage.map((coverage) => (
            <div
              key={coverage.team}
              className="relative overflow-hidden rounded-2xl border border-gray-400/50 bg-gray-800/30 backdrop-blur-sm"
            >
              {/* Content */}
              <div className="relative z-10 flex items-center pl-2">
                {/* Team Section */}
                <div className="flex items-center justify-start w-40 px-3">
                  <h3 className="text-lg font-semibold text-white truncate">
                    {coverage.team}
                  </h3>
                </div>

                {/* Divider */}
                <div className="h-12 w-px bg-gradient-to-b from-transparent via-gray-700 to-transparent" />

                {/* Extension Number */}
                <div className="flex-1 flex items-center justify-center">
                  <p className="text-lg font-medium text-gray-300">
                    {coverage.phone}
                  </p>
                </div>

                {/* Divider */}
                <div className="h-12 w-px bg-gradient-to-b from-transparent via-gray-700 to-transparent" />

                {/* Floor Coverage */}
                <div className="flex-1 flex items-center justify-center w-80">
                  <p className="text-lg font-medium text-gray-300">
                    {coverage.floors.join(", ")}
                  </p>
                </div>

                {/* Divider */}
                <div className="h-12 w-px bg-gradient-to-b from-transparent via-gray-700 to-transparent" />

                {/* Fourth column */}
                <div className="flex-1 flex items-center justify-center px-4">
                  {isEditMode && shift === "weekday-evening" ? (
                    <input
                      type="text"
                      value={draft[coverage.team] ?? ""}
                      onChange={(e) =>
                        setDraft((prev) => ({
                          ...prev,
                          [coverage.team]: e.target.value,
                        }))
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") save();
                      }}
                      placeholder="Pharmacist name"
                      className="w-full rounded-lg border border-gray-600 bg-gray-900/50 px-3 py-1.5 text-lg text-gray-200 placeholder:text-gray-500 focus:border-indigo-400 focus:outline-none"
                    />
                  ) : (
                    <p className="text-lg font-medium text-gray-300">
                      {FOURTH_COLUMN[shift].render(coverage)}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
