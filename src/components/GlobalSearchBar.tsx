"use client";
import { useState } from "react";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

const dummyResults = [
    { label: "Cattle", path: "/dashboard/cattle" },
    { label: "Buffalo", path: "/dashboard/buffalo" },
    { label: "Pig", path: "/dashboard/swine" },
    { label: "Layer", path: "/dashboard/poultry/layer" },
    { label: "Goat", path: "/dashboard/ruminants/goat" },
    { label: "Students", path: "/dashboard/students" },
    { label: "Admin Panel", path: "/dashboard/admin" },
];

export default function GlobalSearchBar() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
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
        <div className="relative max-w-md w-full">
            <div className="flex items-center bg-white border rounded-lg px-3 py-2 shadow-sm">
                <Search size={16} className="text-[#8F9BBA] mr-2" />
                <input
                    type="text"
                    value={query}
                    onChange={handleSearch}
                    placeholder="Search anything..."
                    className="flex-1 bg-transparent outline-none text-[#8F9BBA] placeholder-[#8F9BBA]"
                />
            </div>
            {results.length > 0 && (
                <ul className="absolute z-10 w-full bg-white border mt-1 rounded shadow max-h-60 overflow-y-auto">
                    {results.map((item, index) => (
                        <li
                            key={index}
                            onClick={() => handleSelect(item.path)}
                            className="px-4 py-2 hover:bg-green-100 cursor-pointer text-sm"
                        >
                            {item.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
