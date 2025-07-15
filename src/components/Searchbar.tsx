"use client";
import { useState } from "react";
import { Search } from "lucide-react";

interface SearchBarProps {
    placeholder?: string;
    onSearch: (query: string) => void;
}

export default function SearchBar({ placeholder = "Search...", onSearch }: SearchBarProps) {
    const [query, setQuery] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(query.trim());
    };

    return (
        <form onSubmit={handleSubmit} className="flex items-center gap-2 w-full max-w-md px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm">
            <Search className="text-gray-400" size={18} />
            <input
                type="text"
                className="flex-1 outline-none bg-transparent"
                placeholder={placeholder}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit" className="text-sm text-green-600 font-medium hover:underline">
                Search
            </button>
        </form>
    );
}
