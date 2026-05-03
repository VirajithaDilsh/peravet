"use client";

import {
  Layer,
  PoultryVaccination,
  PoultryFeedManagement,
  WaterManagement,
} from "@/types/animals";
import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { addDays, addWeeks, format } from "date-fns";

type FieldConfig<T> = {
  key: keyof T;
  type: string;
  placeholder?: string;
  displayName?: string;
};

const formatDateForInput = (date?: string | Date) => {
  if (!date) return "";

  if (date instanceof Date) {
    return date.toISOString().split("T")[0];
  }

  return date.split("T")[0];
};

export default function PoultryHealthTables({
  animal,
  onUpdateAction,
}: {
  animal: Layer;
  onUpdateAction: (updated: Layer) => void;
}) {
  const [customVaccines, setCustomVaccines] = useState<PoultryVaccination[]>(
    animal.vaccinations || []
  );

  const [feed, setFeed] = useState<PoultryFeedManagement[]>(
    animal.feedManagement || []
  );

  const [water, setWater] = useState<WaterManagement[]>(
    animal.waterManagement || []
  );

  const [editing, setEditing] = useState<{ [key: string]: boolean }>({});
  const [startDate, setStartDate] = useState<string>("");

  const handleSave = (type: "vaccinations" | "feed" | "water") => {
    if (type === "vaccinations")
      onUpdateAction({ ...animal, vaccinations: customVaccines });

    if (type === "feed") onUpdateAction({ ...animal, feedManagement: feed });

    if (type === "water") onUpdateAction({ ...animal, waterManagement: water });

    setEditing({});
  };

  const handleChange = <T extends object>(
    data: T[],
    setData: React.Dispatch<React.SetStateAction<T[]>>,
    i: number,
    key: keyof T,
    value: string
  ) => {
    const copy = [...data];
    copy[i] = { ...copy[i], [key]: value };
    setData(copy);
    setEditing((prev) => ({ ...prev, [`${i}-${String(key)}`]: true }));
  };

  const formatHeader = (key: string, displayName?: string) => {
    if (displayName) return displayName;

    return key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase());
  };

  const renderTable = <T extends object>(
    title: string,
    data: T[],
    setData: React.Dispatch<React.SetStateAction<T[]>>,
    type: "vaccinations" | "feed" | "water",
    fields: FieldConfig<T>[]
  ) => (
    <div className="bg-white shadow-lg rounded-2xl p-4 md:p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg md:text-xl font-semibold text-gray-800">
          {title}
        </h2>

        <button
          onClick={() => handleSave(type)}
          className="px-4 py-1.5 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition"
        >
          Save
        </button>
      </div>

      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full border border-gray-200 text-sm md:text-base table-auto">
          <thead className="bg-gray-50">
            <tr>
              {fields.map((f) => (
                <th
                  key={String(f.key)}
                  className="border-r border-gray-200 px-3 py-2 text-left font-medium text-gray-700"
                >
                  {formatHeader(String(f.key), f.displayName)}
                </th>
              ))}

              <th className="px-3 py-2 text-center font-medium text-gray-700 border-l border-gray-200">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {data.map((row, i) => (
              <tr
                key={i}
                className="hover:bg-gray-50 border-b border-gray-200 transition"
              >
                {fields.map((f) => (
                  <td
                    key={String(f.key)}
                    className="px-3 py-2 border-r border-gray-200"
                  >
                    {String(f.key) === "type" ? (
                      <select
                        value={(row[f.key] as string) || "Layer Feed"}
                        onChange={(e) =>
                          handleChange(data, setData, i, f.key, e.target.value)
                        }
                        className={`w-full rounded-md px-2 py-1 text-sm focus:outline-none ${
                          editing[`${i}-${String(f.key)}`]
                            ? "border border-blue-500 focus:ring-2 focus:ring-blue-500"
                            : "border-none"
                        }`}
                      >
                        <option value="Starter">Starter</option>
                        <option value="Grower">Grower</option>
                        <option value="Layer Feed">Layer Feed</option>
                      </select>
                    ) : (
                      <input
                        type={f.type}
                        placeholder={f.placeholder}
                        value={
                          f.type === "date"
                            ? formatDateForInput(row[f.key] as string | Date)
                            : (row[f.key] as string) || ""
                        }
                        onChange={(e) =>
                          handleChange(data, setData, i, f.key, e.target.value)
                        }
                        className={`w-full rounded-md px-2 py-1 text-sm focus:outline-none ${
                          editing[`${i}-${String(f.key)}`]
                            ? "border border-blue-500 focus:ring-2 focus:ring-blue-500"
                            : "border-none"
                        }`}
                      />
                    )}
                  </td>
                ))}

                <td className="text-center border-l border-gray-200">
                  <button
                    onClick={() => setData(data.filter((_, idx) => idx !== i))}
                    className="p-1.5 rounded-full hover:bg-red-100"
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="md:hidden mt-4 space-y-3">
        {data.map((row, i) => (
          <div
            key={i}
            className="border border-gray-200 rounded-xl p-4 shadow-sm bg-gray-50"
          >
            {fields.map((f) => (
              <div key={String(f.key)} className="mb-3">
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  {formatHeader(String(f.key), f.displayName)}
                </label>

                {String(f.key) === "type" ? (
                  <select
                    value={(row[f.key] as string) || "Layer Feed"}
                    onChange={(e) =>
                      handleChange(data, setData, i, f.key, e.target.value)
                    }
                    className={`w-full rounded-md px-2 py-1 text-sm focus:outline-none ${
                      editing[`${i}-${String(f.key)}`]
                        ? "border border-blue-500 focus:ring-2 focus:ring-blue-500"
                        : "border border-gray-200"
                    }`}
                  >
                    <option value="Starter">Starter</option>
                    <option value="Grower">Grower</option>
                    <option value="Layer Feed">Layer Feed</option>
                  </select>
                ) : (
                  <input
                    type={f.type}
                    placeholder={f.placeholder}
                    value={
                      f.type === "date"
                        ? formatDateForInput(row[f.key] as string | Date)
                        : (row[f.key] as string) || ""
                    }
                    onChange={(e) =>
                      handleChange(data, setData, i, f.key, e.target.value)
                    }
                    className={`w-full rounded-md px-2 py-1 text-sm focus:outline-none ${
                      editing[`${i}-${String(f.key)}`]
                        ? "border border-blue-500 focus:ring-2 focus:ring-blue-500"
                        : "border border-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}

            <button
              onClick={() => setData(data.filter((_, idx) => idx !== i))}
              className="flex items-center text-red-500 text-sm mt-2 hover:underline"
            >
              <Trash2 className="w-4 h-4 mr-1" />
              Delete
            </button>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <button
          onClick={() =>
            setData([
              ...data,
              Object.fromEntries(
                fields.map((f) => [
                  f.key,
                  f.key === "type" ? "Layer Feed" : "",
                ])
              ) as T,
            ])
          }
          className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          <Plus className="w-4 h-4" />
          Add Row
        </button>
      </div>
    </div>
  );

  const standardSchedule = [
    {
      age: "Day 1",
      vaccine: "IB and ND (Cevac B1L or Ma5+Clone 30)",
      route: "ED",
    },
    { age: "Day 16", vaccine: "IB and ND (Avinew+H120)", route: "DW" },
    { age: "Day 19", vaccine: "IBD (D78)", route: "DW" },
    { age: "Day 23", vaccine: "IB (IB 1/96 or IB 88 or IB 4/91)", route: "DW" },
    { age: "Week 5", vaccine: "Fowl pox", route: "WW" },
    {
      age: "Week 6",
      vaccine: "Chicken anemia (CA Killed or Circomune L or CAV P4)",
      route: "WW/IM/SC",
    },
    {
      age: "Week 7",
      vaccine: "IB and ND (Ma5+Clone 30 or H120 HB1)",
      route: "DW",
    },
    { age: "Week 9", vaccine: "Fowl cholera (Optional)", route: "Killed SC" },
    { age: "Week 10", vaccine: "ND (Lasota)", route: "DW" },
    {
      age: "Week 11",
      vaccine: "IB (IB 1/96 or IB 88 or IB 4/91)",
      route: "DW",
    },
    { age: "Week 12", vaccine: "Fowl pox and AE (AE-Pox)", route: "WW" },
    { age: "Week 16", vaccine: "ND and IB Killed", route: "SC/IM" },
  ];

  const calculateDate = (age: string, start: Date) => {
    if (age.startsWith("Day")) {
      const dayNum = parseInt(age.replace("Day", "").trim());
      return format(addDays(start, dayNum - 1), "yyyy-MM-dd");
    }

    if (age.startsWith("Week")) {
      const weekNum = parseInt(age.replace("Week", "").trim());
      return format(addWeeks(start, weekNum), "yyyy-MM-dd");
    }

    return "";
  };

  const getStandardScheduleWithDates = () => {
    if (!startDate) return [];

    const start = new Date(startDate);

    return standardSchedule.map((s) => ({
      ...s,
      date: calculateDate(s.age, start),
    }));
  };

  return (
    <div className="space-y-8 mt-6">
      <div className="flex items-center gap-4">
        <label className="font-medium">Start Date:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border rounded px-2 py-1"
        />
      </div>

      <div className="bg-white shadow-lg rounded-2xl p-4 border border-gray-200">
        <h2 className="text-lg font-semibold border-b mb-4">
          Standard Vaccination Schedule
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 text-sm md:text-base table-auto">
            <thead className="bg-gray-50">
              <tr>
                <th className="border px-3 py-2 text-left">Age</th>
                <th className="border px-3 py-2 text-left">Vaccine</th>
                <th className="border px-3 py-2 text-left">Route</th>
                <th className="border px-3 py-2 text-left">Date</th>
              </tr>
            </thead>

            <tbody>
              {getStandardScheduleWithDates().map((v, i) => (
                <tr key={i} className="even:bg-gray-50">
                  <td className="border px-3 py-2">{v.age}</td>
                  <td className="border px-3 py-2">{v.vaccine}</td>
                  <td className="border px-3 py-2">{v.route}</td>
                  <td className="border px-3 py-2">{v.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {renderTable<PoultryVaccination>(
        "Custom Vaccinations",
        customVaccines,
        setCustomVaccines,
        "vaccinations",
        [
          { key: "vaccine", type: "text" },
          { key: "date", type: "date", displayName: "Due Date" },
          { key: "nextDate", type: "date", displayName: "Next Date" },
          { key: "route", type: "text" },
        ]
      )}

      {renderTable<PoultryFeedManagement>(
        "Feed Management",
        feed,
        setFeed,
        "feed",
        [
          { key: "type", type: "text", displayName: "Feed Type" },
          { key: "feedIntake", type: "text", displayName: "Intake" },
          {
            key: "feedRequirement",
            type: "text",
            displayName: "Feed Requirement",
          },
        ]
      )}

      {renderTable<WaterManagement>(
        "Water Management",
        water,
        setWater,
        "water",
        [
          { key: "waterIntake", type: "text", displayName: "Intake" },
          { key: "waterRequirement", type: "text", displayName: "Requirement" },
          { key: "chlorinating", type: "text" },
        ]
      )}
    </div>
  );
}