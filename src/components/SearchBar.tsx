"use client";

import React, { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";

type SearchBarWithFilterProps = {
    placeholder?: string;
    onFilterSearch?: (filterKey: string, query: string) => void; // ✅ combined callback
    showFilterButton?: boolean;
};

const FILTER_OPTIONS = ["Tag No", "Gender", "Breed", "Status"];

export default function SearchBarWithFilter({
                                                placeholder = "Search...",
                                                onFilterSearch,
                                                showFilterButton = false,
                                            }: SearchBarWithFilterProps) {
    const [query, setQuery] = useState("");
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState("Tag No"); // ✅ default filter

    const triggerFilterSearch = (newQuery?: string, newFilter?: string) => {
        const finalQuery = newQuery !== undefined ? newQuery : query;
        const finalFilter = newFilter !== undefined ? newFilter : selectedFilter;
        onFilterSearch?.(finalFilter, finalQuery);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);
        triggerFilterSearch(value);
    };

    const toggleDropdown = () => setDropdownOpen((prev) => !prev);

    const handleFilterSelect = (key: string) => {
        setSelectedFilter(key);
        setDropdownOpen(false);
        triggerFilterSearch(undefined, key); // ✅ trigger search with new filter
    };

    return (
        <div className="relative w-full flex items-center justify-end gap-2 my-4">
            {/* ✅ Search Bar */}
            <div className="flex w-[250px] sm:w-[300px] md:w-[400px] items-center text-black rounded-3xl bg-white shadow-sm border border-gray-200">
                <input
                    type="text"
                    placeholder={`${placeholder} (${selectedFilter})`}
                    value={query}
                    onChange={handleInputChange}
                    className="flex-grow px-3 py-2 text-sm sm:text-base rounded-l-3xl outline-none"
                />
                <div className="px-3 text-gray-500">
                    <Search size={18} />
                </div>
            </div>

            {/* ✅ Filter Button */}
            {showFilterButton && (
                <div className="relative">
                    <button
                        onClick={toggleDropdown}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 hover:scale-105 transition text-gray-700"
                    >
                        <SlidersHorizontal size={18} />
                    </button>

                    {/* ✅ Dropdown Menu */}
                    {dropdownOpen && (
                        <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-md z-50">
                            {FILTER_OPTIONS.map((option) => (
                                <button
                                    key={option}
                                    onClick={() => handleFilterSelect(option)}
                                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
