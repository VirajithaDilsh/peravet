"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { cattleData } from "@/data/CattleData";
import SearchBarWithFilter from "@/components/SearchBar";

const CattleTable: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedFilter, setSelectedFilter] = useState("Tag No");
    const router = useRouter();

    const handleFilterSearch = (filterKey: string, query: string) => {
        setSelectedFilter(filterKey);
        setSearchQuery(query);
    };

    const filteredData = cattleData.filter(({ id, sex, breed, age, weight, status }) => {
        const q = searchQuery.toLowerCase();

        switch (selectedFilter) {
            case "Tag No":
                return id.toString().includes(q);
            case "Gender":
                return sex.toLowerCase().includes(q);
            case "Age":
                return age.toString().includes(q);
            case "Weight":
                return weight.toString().includes(q);
            case "Breed":
                return breed.toLowerCase().includes(q);
            case "Status":
                return status.toLowerCase().includes(q);
            default:
                return (
                    id.toString().includes(q) ||
                    sex.toLowerCase().includes(q) ||
                    age.toString().includes(q) ||
                    weight.toString().includes(q) ||
                    breed.toLowerCase().includes(q) ||
                    status.toLowerCase().includes(q)
                );
        }
    });

    return (
        <div className="w-full">
            <div className="flex justify-end">
                <SearchBarWithFilter
                    placeholder="Search cattle"
                    showFilterButton={true}
                    onFilterSearch={handleFilterSearch}
                />
            </div>

            <div className="overflow-x-auto mt-4">
                <table className="min-w-full border border-black text-black">
                    <thead className="bg-gray-100">
                    <tr>
                        {[
                            "Tag No",
                            "Sex",
                            "Breed",
                            "Age",
                            "Weight",
                            "Last AI Date",
                            "Pregnancy Status",
                            "Expected Calving Date",
                            "Current Status",
                        ].map((header) => (
                            <th
                                key={header}
                                className="border border-black px-2 py-2 text-left text-xs sm:text-sm md:text-base lg:text-lg"
                            >
                                {header}
                            </th>
                        ))}
                    </tr>
                    </thead>

                    <tbody>
                    {filteredData.length > 0 ? (
                        filteredData.map(
                            ({
                                 id,
                                 sex,
                                 age,
                                 weight,
                                 breed,
                                 lastAIdate,
                                 pregnancyStatus,
                                 expectedCalvingDate,
                                 status,
                             }) => (
                                <tr
                                    key={id}
                                    className="hover:bg-gray-200 cursor-pointer"
                                    onClick={() => router.push(`/animals/${id}`)}
                                >
                                    <td className="border border-black px-2 py-2 text-xs sm:text-sm md:text-base lg:text-lg">{id}</td>
                                    <td className="border border-black px-2 py-2 text-xs sm:text-sm md:text-base lg:text-lg">{sex}</td>
                                    <td className="border border-black px-2 py-2 text-xs sm:text-sm md:text-base lg:text-lg">{breed}</td>
                                    <td className="border border-black px-2 py-2 text-xs sm:text-sm md:text-base lg:text-lg">{age}</td>
                                    <td className="border border-black px-2 py-2 text-xs sm:text-sm md:text-base lg:text-lg">{weight}</td>
                                    <td className="border border-black px-2 py-2 text-xs sm:text-sm md:text-base lg:text-lg">
                                        {lastAIdate ? lastAIdate.toLocaleDateString() : "N/A"}
                                    </td>
                                    <td className="border border-black px-2 py-2 text-xs sm:text-sm md:text-base lg:text-lg">
                                        {pregnancyStatus ? pregnancyStatus.toString() : "N/A"}
                                    </td>
                                    <td className="border border-black px-2 py-2 text-xs sm:text-sm md:text-base lg:text-lg">
                                        {expectedCalvingDate ? expectedCalvingDate.toLocaleDateString() : "N/A"}
                                    </td>
                                    <td className="border border-black px-2 py-2 text-xs sm:text-sm md:text-base lg:text-lg">{status}</td>
                                </tr>
                            )
                        )
                    ) : (
                        <tr>
                            <td colSpan={9} className="text-center py-4 text-gray-500">
                                No matching cattle found.
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CattleTable;
