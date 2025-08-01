"use client";
import { useState } from "react";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

const dummyResults = [
    { label: "Animals", path: "/dashboard/cattle" },
    { label: "Buffalo", path: "/dashboard/buffalo" },
    { label: "Pig", path: "/dashboard/swine" },
    { label: "Layer", path: "/dashboard/poultry/layer" },
    { label: "Goat", path: "/dashboard/ruminants/goat" },
    { label: "Students", path: "/dashboard/students" },
    { label: "Admin Panel", path: "/dashboard/admin" },
];

export default function GlobalSearchBar() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<typeof dummyResults>([]);
    const router = useRouter();

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);

        const filtered = dummyResults.filter((item) =>
            item.label.toLowerCase().includes(value.toLowerCase())
        );
        setResults(filtered);
    };

    const handleSelect = (path: string) => {
        router.push(path);
        setQuery("");
        setResults([]);
    };

    return (
        <div className="relative w-full max-w-xs sm:max-w-[500px] md:max-w-md lg:max-w-lg">
            {/* Search Input */}
            <div className="flex items-center bg-white border rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 shadow-sm">
                <Search size={16} className="text-[#8F9BBA] mr-2" />
                <input
                    type="text"
                    value={query}
                    onChange={handleSearch}
                    placeholder="Search"
                    className="flex-1 bg-transparent outline-none text-xs sm:text-sm text-[#8F9BBA] placeholder-[#8F9BBA]"
                />
            </div>

            {/* Results Dropdown */}
            {results.length > 0 && (
                <ul className="absolute z-10 w-full bg-white border mt-1 rounded shadow max-h-60 overflow-y-auto">
                    {results.map((item, index) => (
                        <li
                            key={index}
                            onClick={() => handleSelect(item.path)}
                            className="px-3 py-2 hover:bg-green-100 cursor-pointer text-xs sm:text-sm"
                        >
                            {item.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
