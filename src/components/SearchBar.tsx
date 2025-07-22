"use client";

import React from "react";
import { Search, SlidersHorizontal } from "lucide-react";

type SearchBarWithFilterProps = {
    placeholder?: string;
    onSearch?: (value: string) => void;
    onFilterClick?: () => void;
};

export default function SearchBarWithFilter({
                                                placeholder = "Search...",
                                                onSearch,
                                                onFilterClick,
                                            }: SearchBarWithFilterProps) {
    const [query, setQuery] = React.useState("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);
        if (onSearch) onSearch(value);
    };

    return (
        <div className="flex justify-end w-full">
            {/* Search Bar container fills the parent width */}
            <div
                className="
          flex items-center
          w-full
          h-11
          rounded-3xl
          bg-white
          shadow-sm
          transition-all
        "
            >
                {/* Input fills available space */}
                <input
                    type="text"
                    placeholder={placeholder}
                    value={query}
                    onChange={handleInputChange}
                    className="flex-grow px-3 py-2 outline-none text-sm rounded-l-3xl"
                />

                {/* Search Icon */}
                <div className="px-3 text-gray-500">
                    <Search size={18} />
                </div>
            </div>

            {/* Filter Button */}
            <button
                onClick={onFilterClick}
                className="
          ml-2
          flex items-center gap-1
          px-4 py-2
          rounded-lg
          hover:scale-105
          text-gray-700
          transition-transform
        "
            >
                <SlidersHorizontal size={18} />
            </button>
        </div>
    );
}
