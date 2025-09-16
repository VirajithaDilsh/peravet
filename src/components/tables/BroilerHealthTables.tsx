"use client";
import { Broiler, BroilerVaccination, BroilerFeedManagement,WaterManagement } from "@/types/animals";
import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";

export default function BroilerHealthTables({
                                                animal,
                                                onUpdateAction,
                                            }: {
    animal: Broiler;
    onUpdateAction: (updated: Broiler) => void;
}) {
    const [vaccinations, setVaccinations] = useState<BroilerVaccination[]>(animal.vaccinations || []);
    const [feed, setFeed] = useState<BroilerFeedManagement[]>(animal.feedManagement || []);
    const [water, setWater] = useState<WaterManagement[]>(animal.waterManagement || []);

    // Save handlers
    const saveVaccinations = () => onUpdateAction({ ...animal, vaccinations });
    const saveFeed = () => onUpdateAction({ ...animal, feedManagement: feed });
    const saveWater = () => onUpdateAction({ ...animal, waterManagement: water });

    return (
        <div className="space-y-6 mt-6">
            {/* Vaccination Schedule */}
            <div>
                <h2 className="text-lg font-semibold border-b mb-2">Vaccination Schedule</h2>
                <table className="w-full border-collapse border border-gray-300">
                    <thead className="bg-gray-100">
                    <tr>
                        <th className="border p-2">Vaccine</th>
                        <th className="border p-2">Date</th>
                        <th className="border p-2">Route</th>
                        <th className="border p-2">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {vaccinations.map((v, i) => (
                        <tr key={i} className="even:bg-gray-50">
                            <td className="border p-2">
                                <input
                                    type="text"
                                    value={v.vaccine || ""}
                                    onChange={(e) => {
                                        const copy = [...vaccinations];
                                        copy[i].vaccine = e.target.value;
                                        setVaccinations(copy);
                                    }}
                                    className="w-full border rounded px-1 py-0.5"
                                />
                            </td>
                            <td className="border p-2">
                                <input
                                    type="date"
                                    value={v.date || ""}
                                    onChange={(e) => {
                                        const copy = [...vaccinations];
                                        copy[i].date = e.target.value;
                                        setVaccinations(copy);
                                    }}
                                    className="w-full border rounded px-1 py-0.5"
                                />
                            </td>
                            <td className="border p-2">
                                <input
                                    type="text"
                                    value={v.route || ""}
                                    onChange={(e) => {
                                        const copy = [...vaccinations];
                                        copy[i].route = e.target.value;
                                        setVaccinations(copy);
                                    }}
                                    className="w-full border rounded px-1 py-0.5"
                                />
                            </td>
                            <td className="border p-2 text-center">
                                <Trash2
                                    className="w-4 h-4 text-red-600 cursor-pointer mx-auto"
                                    onClick={() => setVaccinations(vaccinations.filter((_, idx) => idx !== i))}
                                />
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <div className="flex gap-2 mt-2">
                    <button
                        onClick={() => setVaccinations([...vaccinations, { vaccine: "", date: "", route: "" }])}
                        className="flex items-center gap-1 text-blue-600"
                    >
                        <Plus className="w-4 h-4" /> Add Row
                    </button>
                    <button onClick={saveVaccinations} className="px-3 py-1 bg-green-500 text-white rounded">
                        Save Vaccinations
                    </button>
                </div>
            </div>

            {/* Feed Management */}
            <div>
                <h2 className="text-lg font-semibold border-b mb-2">Feed Management</h2>
                <table className="w-full border-collapse border border-gray-300">
                    <thead className="bg-gray-100">
                    <tr>
                        <th className="border p-2">Feed Type</th>
                        <th className="border p-2">Intake</th>
                        <th className="border p-2">Feed Requirement</th>
                        <th className="border p-2">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {feed.map((f, i) => (
                        <tr key={i} className="even:bg-gray-50">
                            <td className="border p-2">
                                <select
                                    value={f.type}
                                    onChange={(e) => {
                                        const copy = [...feed];
                                        copy[i].type = e.target.value as "Starter" | "Grower" | "Layer Feed";
                                        setFeed(copy);
                                    }}
                                    className="w-full border rounded px-1 py-0.5"
                                >
                                    <option value="Starter">Starter</option>
                                    <option value="Grower">Grower</option>
                                    <option value="Layer Feed">Layer Feed</option>
                                </select>
                            </td>
                            <td className="border p-2">
                                <input
                                    type="text"
                                    value={f.feedIntake}
                                    onChange={(e) => {
                                        const copy = [...feed];
                                        copy[i].feedIntake = e.target.value;
                                        setFeed(copy);
                                    }}
                                    className="w-full border rounded px-1 py-0.5"
                                />
                            </td>
                            <td className="border p-2">
                                <input
                                    type="text"
                                    value={f.feedRequirement || ""}
                                    onChange={(e) => {
                                        const copy = [...feed];
                                        copy[i].feedRequirement = e.target.value;
                                        setFeed(copy);
                                    }}
                                    className="w-full border rounded px-1 py-0.5"
                                />
                            </td>
                            <td className="border p-2 text-center">
                                <Trash2
                                    className="w-4 h-4 text-red-600 cursor-pointer mx-auto"
                                    onClick={() => setFeed(feed.filter((_, idx) => idx !== i))}
                                />
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <div className="flex gap-2 mt-2">
                    <button
                        onClick={() =>
                            setFeed([...feed, { type: "Layer Feed", feedIntake: "", feedRequirement: "" }])
                        }
                        className="flex items-center gap-1 text-blue-600"
                    >
                        <Plus className="w-4 h-4" /> Add Row
                    </button>
                    <button onClick={saveFeed} className="px-3 py-1 bg-green-500 text-white rounded">
                        Save Feed
                    </button>
                </div>
            </div>

            {/* Water Management */}
            <div>
                <h2 className="text-lg font-semibold border-b mb-2">Water Management</h2>
                <table className="w-full border-collapse border border-gray-300">
                    <thead className="bg-gray-100">
                    <tr>
                        <th className="border p-2">Water Intake</th>
                        <th className="border p-2">Water Requirement</th>
                        <th className="border p-2">Chlorinating</th>
                        <th className="border p-2">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {water.map((w, i) => (
                        <tr key={i} className="even:bg-gray-50">
                            <td className="border p-2">
                                <input
                                    type="text"
                                    value={w.waterIntake}
                                    onChange={(e) => {
                                        const copy = [...water];
                                        copy[i].waterIntake = e.target.value;
                                        setWater(copy);
                                    }}
                                    className="w-full border rounded px-1 py-0.5"
                                />
                            </td>
                            <td className="border p-2">
                                <input
                                    type="text"
                                    value={w.waterRequirement || ""}
                                    onChange={(e) => {
                                        const copy = [...water];
                                        copy[i].waterRequirement = e.target.value;
                                        setWater(copy);
                                    }}
                                    className="w-full border rounded px-1 py-0.5"
                                />
                            </td>
                            <td className="border p-2">
                                <input
                                    type="text"
                                    value={w.chlorinating || ""}
                                    onChange={(e) => {
                                        const copy = [...water];
                                        copy[i].chlorinating = e.target.value;
                                        setWater(copy);
                                    }}
                                    className="w-full border rounded px-1 py-0.5"
                                />
                            </td>
                            <td className="border p-2 text-center">
                                <Trash2
                                    className="w-4 h-4 text-red-600 cursor-pointer mx-auto"
                                    onClick={() => setWater(water.filter((_, idx) => idx !== i))}
                                />
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <div className="flex gap-2 mt-2">
                    <button
                        onClick={() =>
                            setWater([...water, { waterIntake: "", waterRequirement: "", chlorinating: "" }])
                        }
                        className="flex items-center gap-1 text-blue-600"
                    >
                        <Plus className="w-4 h-4" /> Add Row
                    </button>
                    <button onClick={saveWater} className="px-3 py-1 bg-green-500 text-white rounded">
                        Save Water
                    </button>
                </div>
            </div>
        </div>
    );
}
