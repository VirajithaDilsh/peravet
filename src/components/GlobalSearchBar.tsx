"use client";

import { useState, useRef, useEffect } from "react";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAnimalContext } from "@/context/AnimalContext";

export default function GlobalAnimalSearchBar() {
    const { animals } = useAnimalContext(); // get animals from context
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<typeof animals>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);
    const router = useRouter();
    const containerRef = useRef<HTMLDivElement>(null);

    // Search animals by tag or species
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);

        if (value.trim() === "") {
            setResults([]);
            setIsOpen(false);
            return;
        }

        const filtered = animals.filter((animal) =>
            `${animal.tag} ${animal.species}`.toLowerCase().includes(value.toLowerCase())
        );

        setResults(filtered);
        setIsOpen(filtered.length > 0);
        setActiveIndex(-1);
    };

    // Navigate to animal detail page or species page
    const handleSelect = (value: string) => {
        // Check if value matches any species
        const speciesMatch = animals.find(
            (a) => a.species.toLowerCase() === value.toLowerCase()
        );

        if (speciesMatch && query.toLowerCase() === speciesMatch.species.toLowerCase()) {
            // Navigate to species page
            router.push(`/dashboard/${speciesMatch.species.toLowerCase()}`);
        } else {
            // Navigate to animal detail page by tag
            router.push(`/animals/${value}`);
        }

        setQuery("");
        setResults([]);
        setIsOpen(false);
    };

    // Keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (!isOpen) return;

        if (e.key === "ArrowDown") {
            setActiveIndex((prev) => Math.min(prev + 1, results.length - 1));
        } else if (e.key === "ArrowUp") {
            setActiveIndex((prev) => Math.max(prev - 1, 0));
        } else if (e.key === "Enter") {
            if (activeIndex >= 0) {
                handleSelect(results[activeIndex].tag);
            } else if (query.trim() !== "") {
                handleSelect(query.trim());
            }
        } else if (e.key === "Escape") {
            setIsOpen(false);
        }
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div ref={containerRef} className="relative w-full max-w-xs sm:max-w-[500px] md:max-w-md lg:max-w-lg">
            {/* Search Input */}
            <div className="flex items-center bg-white border rounded-lg px-2 sm:px-3 py-1 sm:py-1 shadow-sm">
                <Search size={16} className="text-[#8F9BBA] mr-2" />
                <input
                    type="text"
                    value={query}
                    onChange={handleSearch}
                    onKeyDown={handleKeyDown}
                    placeholder="Search animals by tag or species"
                    className="flex-1 bg-transparent outline-none text-xs sm:text-sm text-[#8F9BBA] placeholder-[#8F9BBA]"
                />
            </div>

            {/* Results Dropdown */}
            {isOpen && (
                <ul className="absolute z-10 w-full bg-white text-[#8F9BBA] border mt-1 rounded shadow max-h-52 sm:max-h-60 overflow-y-auto">
                    {results.length > 0 ? (
                        results.map((animal, index) => (
                            <li
                                key={animal.tag}
                                id={`search-item-${index}`}
                                onClick={() => handleSelect(animal.tag)}
                                className={`px-3 py-2 cursor-pointer text-xs sm:text-sm ${
                                    index === activeIndex ? "bg-green-200 font-semibold" : "hover:bg-green-100"
                                }`}
                            >
                                {animal.tag} ({animal.species})
                            </li>
                        ))
                    ) : (
                        <li className="px-3 py-2 text-xs sm:text-sm text-gray-400">No animals found</li>
                    )}
                </ul>
            )}
        </div>
    );
}
