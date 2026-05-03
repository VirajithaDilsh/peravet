"use client";

import {
  Broiler,
  PoultryVaccination,
  PoultryFeedManagement,
  WaterManagement,
} from "@/types/animals";
import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";

const formatDateForInput = (date?: string | Date) => {
  if (!date) return "";

  if (date instanceof Date) {
    return date.toISOString().split("T")[0];
  }

  return date.split("T")[0];
};

export default function BroilerHealthTables({
  animal,
  onUpdateAction,
}: {
  animal: Broiler;
  onUpdateAction: (updated: Broiler) => void;
}) {
  const [vaccinations, setVaccinations] = useState<PoultryVaccination[]>(
    animal.vaccinations || []
  );
  const [feed, setFeed] = useState<PoultryFeedManagement[]>(
    animal.feedManagement || []
  );
  const [water, setWater] = useState<WaterManagement[]>(
    animal.waterManagement || []
  );

  const saveVaccinations = () => onUpdateAction({ ...animal, vaccinations });
  const saveFeed = () => onUpdateAction({ ...animal, feedManagement: feed });
  const saveWater = () => onUpdateAction({ ...animal, waterManagement: water });

  return (
    <div className="space-y-8 mt-6">
      {/* Vaccination Schedule */}
      <div className="bg-white shadow-lg rounded-2xl p-4 md:p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg md:text-xl font-semibold text-gray-800">
            Vaccination Schedule
          </h2>

          <button
            onClick={saveVaccinations}
            className="px-4 py-1.5 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition"
          >
            Save
          </button>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full border border-gray-200 text-sm md:text-base table-auto">
            <thead className="bg-gray-50">
              <tr>
                <th className="border-r border-gray-200 px-3 py-2 text-left font-medium text-gray-700">
                  Vaccine
                </th>
                <th className="border-r border-gray-200 px-3 py-2 text-left font-medium text-gray-700">
                  Date
                </th>
                <th className="border-r border-gray-200 px-3 py-2 text-left font-medium text-gray-700">
                  Route
                </th>
                <th className="px-3 py-2 text-center font-medium text-gray-700 border-l border-gray-200">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {vaccinations.map((v, i) => (
                <tr
                  key={i}
                  className="hover:bg-gray-50 border-b border-gray-200 transition"
                >
                  <td className="px-3 py-2 border-r border-gray-200">
                    <input
                      type="text"
                      value={v.vaccine || ""}
                      onChange={(e) => {
                        const copy = [...vaccinations];
                        copy[i].vaccine = e.target.value;
                        setVaccinations(copy);
                      }}
                      className="w-full rounded-md px-2 py-1 text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </td>

                  <td className="px-3 py-2 border-r border-gray-200">
                    <input
                      type="date"
                      value={formatDateForInput(v.date)}
                      onChange={(e) => {
                        const copy = [...vaccinations];
                        copy[i].date = e.target.value;
                        setVaccinations(copy);
                      }}
                      className="w-full rounded-md px-2 py-1 text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </td>

                  <td className="px-3 py-2 border-r border-gray-200">
                    <input
                      type="text"
                      value={v.route || ""}
                      onChange={(e) => {
                        const copy = [...vaccinations];
                        copy[i].route = e.target.value;
                        setVaccinations(copy);
                      }}
                      className="w-full rounded-md px-2 py-1 text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </td>

                  <td className="text-center border-l border-gray-200">
                    <button
                      onClick={() =>
                        setVaccinations(
                          vaccinations.filter((_, idx) => idx !== i)
                        )
                      }
                      className="p-1.5 rounded-full hover:bg-red-100 transition"
                    >
                      <Trash2 className="w-4 h-4 text-red-500 mx-auto" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden mt-4 space-y-3">
          {vaccinations.map((v, i) => (
            <div
              key={i}
              className="border border-gray-200 rounded-xl p-4 shadow-sm bg-gray-50"
            >
              <div className="mb-3">
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Vaccine
                </label>
                <input
                  type="text"
                  value={v.vaccine || ""}
                  onChange={(e) => {
                    const copy = [...vaccinations];
                    copy[i].vaccine = e.target.value;
                    setVaccinations(copy);
                  }}
                  className="w-full rounded-md px-2 py-1 text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="mb-3">
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  value={formatDateForInput(v.date)}
                  onChange={(e) => {
                    const copy = [...vaccinations];
                    copy[i].date = e.target.value;
                    setVaccinations(copy);
                  }}
                  className="w-full rounded-md px-2 py-1 text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="mb-3">
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Route
                </label>
                <input
                  type="text"
                  value={v.route || ""}
                  onChange={(e) => {
                    const copy = [...vaccinations];
                    copy[i].route = e.target.value;
                    setVaccinations(copy);
                  }}
                  className="w-full rounded-md px-2 py-1 text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <button
                onClick={() =>
                  setVaccinations(vaccinations.filter((_, idx) => idx !== i))
                }
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
              setVaccinations([
                ...vaccinations,
                { vaccine: "", date: "", route: "" },
              ])
            }
            className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            <Plus className="w-4 h-4" />
            Add Row
          </button>
        </div>
      </div>

      {/* Feed Management */}
      <div className="bg-white shadow-lg rounded-2xl p-4 md:p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg md:text-xl font-semibold text-gray-800">
            Feed Management
          </h2>

          <button
            onClick={saveFeed}
            className="px-4 py-1.5 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition"
          >
            Save
          </button>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full border border-gray-200 text-sm md:text-base table-auto">
            <thead className="bg-gray-50">
              <tr>
                <th className="border-r border-gray-200 px-3 py-2 text-left font-medium text-gray-700">
                  Feed Type
                </th>
                <th className="border-r border-gray-200 px-3 py-2 text-left font-medium text-gray-700">
                  Intake
                </th>
                <th className="border-r border-gray-200 px-3 py-2 text-left font-medium text-gray-700">
                  Feed Requirement
                </th>
                <th className="px-3 py-2 text-center font-medium text-gray-700 border-l border-gray-200">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {feed.map((f, i) => (
                <tr
                  key={i}
                  className="hover:bg-gray-50 border-b border-gray-200 transition"
                >
                  <td className="px-3 py-2 border-r border-gray-200">
                    <select
                      value={f.type}
                      onChange={(e) => {
                        const copy = [...feed];
                        copy[i].type = e.target.value as
                          | "Starter"
                          | "Grower"
                          | "Layer Feed";
                        setFeed(copy);
                      }}
                      className="w-full rounded-md px-2 py-1 text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="Starter">Starter</option>
                      <option value="Grower">Grower</option>
                      <option value="Layer Feed">Layer Feed</option>
                    </select>
                  </td>

                  <td className="px-3 py-2 border-r border-gray-200">
                    <input
                      type="text"
                      value={f.feedIntake}
                      onChange={(e) => {
                        const copy = [...feed];
                        copy[i].feedIntake = e.target.value;
                        setFeed(copy);
                      }}
                      className="w-full rounded-md px-2 py-1 text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </td>

                  <td className="px-3 py-2 border-r border-gray-200">
                    <input
                      type="text"
                      value={f.feedRequirement || ""}
                      onChange={(e) => {
                        const copy = [...feed];
                        copy[i].feedRequirement = e.target.value;
                        setFeed(copy);
                      }}
                      className="w-full rounded-md px-2 py-1 text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </td>

                  <td className="text-center border-l border-gray-200">
                    <button
                      onClick={() =>
                        setFeed(feed.filter((_, idx) => idx !== i))
                      }
                      className="p-1.5 rounded-full hover:bg-red-100 transition"
                    >
                      <Trash2 className="w-4 h-4 text-red-500 mx-auto" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden mt-4 space-y-3">
          {feed.map((f, i) => (
            <div
              key={i}
              className="border border-gray-200 rounded-xl p-4 shadow-sm bg-gray-50"
            >
              <div className="mb-3">
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Feed Type
                </label>
                <select
                  value={f.type}
                  onChange={(e) => {
                    const copy = [...feed];
                    copy[i].type = e.target.value as
                      | "Starter"
                      | "Grower"
                      | "Layer Feed";
                    setFeed(copy);
                  }}
                  className="w-full rounded-md px-2 py-1 text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="Starter">Starter</option>
                  <option value="Grower">Grower</option>
                  <option value="Layer Feed">Layer Feed</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Intake
                </label>
                <input
                  type="text"
                  value={f.feedIntake}
                  onChange={(e) => {
                    const copy = [...feed];
                    copy[i].feedIntake = e.target.value;
                    setFeed(copy);
                  }}
                  className="w-full rounded-md px-2 py-1 text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="mb-3">
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Feed Requirement
                </label>
                <input
                  type="text"
                  value={f.feedRequirement || ""}
                  onChange={(e) => {
                    const copy = [...feed];
                    copy[i].feedRequirement = e.target.value;
                    setFeed(copy);
                  }}
                  className="w-full rounded-md px-2 py-1 text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <button
                onClick={() => setFeed(feed.filter((_, idx) => idx !== i))}
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
              setFeed([
                ...feed,
                {
                  type: "Layer Feed",
                  feedIntake: "",
                  feedRequirement: "",
                },
              ])
            }
            className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            <Plus className="w-4 h-4" />
            Add Row
          </button>
        </div>
      </div>

      {/* Water Management */}
      <div className="bg-white shadow-lg rounded-2xl p-4 md:p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg md:text-xl font-semibold text-gray-800">
            Water Management
          </h2>

          <button
            onClick={saveWater}
            className="px-4 py-1.5 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition"
          >
            Save
          </button>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full border border-gray-200 text-sm md:text-base table-auto">
            <thead className="bg-gray-50">
              <tr>
                <th className="border-r border-gray-200 px-3 py-2 text-left font-medium text-gray-700">
                  Water Intake
                </th>
                <th className="border-r border-gray-200 px-3 py-2 text-left font-medium text-gray-700">
                  Water Requirement
                </th>
                <th className="border-r border-gray-200 px-3 py-2 text-left font-medium text-gray-700">
                  Chlorinating
                </th>
                <th className="px-3 py-2 text-center font-medium text-gray-700 border-l border-gray-200">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {water.map((w, i) => (
                <tr
                  key={i}
                  className="hover:bg-gray-50 border-b border-gray-200 transition"
                >
                  <td className="px-3 py-2 border-r border-gray-200">
                    <input
                      type="text"
                      value={w.waterIntake}
                      onChange={(e) => {
                        const copy = [...water];
                        copy[i].waterIntake = e.target.value;
                        setWater(copy);
                      }}
                      className="w-full rounded-md px-2 py-1 text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </td>

                  <td className="px-3 py-2 border-r border-gray-200">
                    <input
                      type="text"
                      value={w.waterRequirement || ""}
                      onChange={(e) => {
                        const copy = [...water];
                        copy[i].waterRequirement = e.target.value;
                        setWater(copy);
                      }}
                      className="w-full rounded-md px-2 py-1 text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </td>

                  <td className="px-3 py-2 border-r border-gray-200">
                    <input
                      type="text"
                      value={w.chlorinating || ""}
                      onChange={(e) => {
                        const copy = [...water];
                        copy[i].chlorinating = e.target.value;
                        setWater(copy);
                      }}
                      className="w-full rounded-md px-2 py-1 text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </td>

                  <td className="text-center border-l border-gray-200">
                    <button
                      onClick={() =>
                        setWater(water.filter((_, idx) => idx !== i))
                      }
                      className="p-1.5 rounded-full hover:bg-red-100 transition"
                    >
                      <Trash2 className="w-4 h-4 text-red-500 mx-auto" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden mt-4 space-y-3">
          {water.map((w, i) => (
            <div
              key={i}
              className="border border-gray-200 rounded-xl p-4 shadow-sm bg-gray-50"
            >
              <div className="mb-3">
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Water Intake
                </label>
                <input
                  type="text"
                  value={w.waterIntake}
                  onChange={(e) => {
                    const copy = [...water];
                    copy[i].waterIntake = e.target.value;
                    setWater(copy);
                  }}
                  className="w-full rounded-md px-2 py-1 text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="mb-3">
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Water Requirement
                </label>
                <input
                  type="text"
                  value={w.waterRequirement || ""}
                  onChange={(e) => {
                    const copy = [...water];
                    copy[i].waterRequirement = e.target.value;
                    setWater(copy);
                  }}
                  className="w-full rounded-md px-2 py-1 text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="mb-3">
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Chlorinating
                </label>
                <input
                  type="text"
                  value={w.chlorinating || ""}
                  onChange={(e) => {
                    const copy = [...water];
                    copy[i].chlorinating = e.target.value;
                    setWater(copy);
                  }}
                  className="w-full rounded-md px-2 py-1 text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <button
                onClick={() => setWater(water.filter((_, idx) => idx !== i))}
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
              setWater([
                ...water,
                {
                  waterIntake: "",
                  waterRequirement: "",
                  chlorinating: "",
                },
              ])
            }
            className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            <Plus className="w-4 h-4" />
            Add Row
          </button>
        </div>
      </div>
    </div>
  );
}