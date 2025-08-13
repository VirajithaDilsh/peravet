"use client";
import { useMemo, useState } from "react";
import { useTasks } from "@/context/TasksContext";
import { formatDate } from "@/utils/date";

export default function UpcomingTasksTable() {
    const {
        tasks,
        completed,
        markCompleted,
        undoCompleted,
        snooze,
        showCompleted,
        setShowCompleted,
        dueSoonWindowDays,
        setDueSoonWindowDays,
    } = useTasks();

    const [typeFilter, setTypeFilter] = useState<string>("all");
    const [speciesFilter, setSpeciesFilter] = useState<string>("all");

    // Filter visible tasks
    const visible = useMemo(() => {
        return tasks.filter(
            (t) =>
                (typeFilter === "all" || t.type === typeFilter) &&
                (speciesFilter === "all" || t.species === speciesFilter)
        );
    }, [tasks, typeFilter, speciesFilter]);

    // Generate dropdown filter options
    const types = useMemo(() => Array.from(new Set(tasks.map((t) => t.type))), [tasks]);
    const species = useMemo(() => Array.from(new Set(tasks.map((t) => t.species))), [tasks]);

    return (
        <div className="mt-6 rounded-2xl border bg-white shadow">
            {/* Filters */}
            <div className="p-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex gap-2">
                    {/* Task Type Filter */}
                    <select
                        value={typeFilter}
                        onChange={(e) => setTypeFilter(e.target.value)}
                        className="border rounded-xl px-3 py-2"
                    >
                        <option value="all">All types</option>
                        {types.map((t) => (
                            <option key={t} value={t}>
                                {t}
                            </option>
                        ))}
                    </select>

                    {/* Species Filter */}
                    <select
                        value={speciesFilter}
                        onChange={(e) => setSpeciesFilter(e.target.value)}
                        className="border rounded-xl px-3 py-2"
                    >
                        <option value="all">All species</option>
                        {species.map((s) => (
                            <option key={s} value={s}>
                                {s}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Due soon window & show completed */}
                <div className="flex gap-2 items-center">
                    <label className="text-sm text-gray-600">Due soon window</label>
                    <input
                        type="number"
                        min={1}
                        value={dueSoonWindowDays}
                        onChange={(e) =>
                            setDueSoonWindowDays(parseInt(e.target.value || "7", 10))
                        }
                        className="w-20 border rounded-xl px-3 py-2"
                    />
                    <label className="flex items-center gap-2 text-sm text-gray-600">
                        <input
                            type="checkbox"
                            checked={showCompleted}
                            onChange={(e) => setShowCompleted(e.target.checked)}
                        />
                        Show completed
                    </label>
                </div>
            </div>

            {/* Tasks Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                    <thead>
                    <tr className="bg-gray-50 text-left">
                        <th className="px-4 py-3">Due date</th>
                        <th className="px-4 py-3">Type</th>
                        <th className="px-4 py-3">Species</th>
                        <th className="px-4 py-3">Tag</th>
                        <th className="px-4 py-3">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {visible.map((t) => {
                        const isDone = !!completed[t.key];
                        return (
                            <tr
                                key={t.key}
                                className={`border-t ${isDone ? "opacity-60" : ""}`}
                            >
                                <td className="px-4 py-3 whitespace-nowrap">
                                    {formatDate(t.dueDate)}
                                </td>
                                <td className="px-4 py-3">{t.type}</td>
                                <td className="px-4 py-3">{t.species}</td>
                                <td className="px-4 py-3 font-mono">{t.animalTag}</td>
                                <td className="px-4 py-3">
                                    {!isDone ? (
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => markCompleted(t.key)}
                                                className="px-3 py-1 rounded-xl bg-green-600 text-white"
                                            >
                                                Mark done
                                            </button>
                                            <div className="relative">
                                                <details>
                                                    <summary className="cursor-pointer select-none px-3 py-1 rounded-xl border">
                                                        Snooze ▾
                                                    </summary>
                                                    <div className="absolute z-10 mt-1 bg-white border rounded-xl shadow p-2 grid gap-1">
                                                        <button
                                                            className="px-3 py-1 rounded hover:bg-gray-100"
                                                            onClick={() => snooze(t.key, 7)}
                                                        >
                                                            +7 days
                                                        </button>
                                                        <button
                                                            className="px-3 py-1 rounded hover:bg-gray-100"
                                                            onClick={() => snooze(t.key, 14)}
                                                        >
                                                            +14 days
                                                        </button>
                                                        <button
                                                            className="px-3 py-1 rounded hover:bg-gray-100"
                                                            onClick={() => snooze(t.key, 30)}
                                                        >
                                                            +30 days
                                                        </button>
                                                    </div>
                                                </details>
                                            </div>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => undoCompleted(t.key)}
                                            className="px-3 py-1 rounded-xl border"
                                        >
                                            Undo
                                        </button>
                                    )}
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
