import React from "react";
import Link from "next/link";
import { cattleData } from "@/data/CattleData";

const CattleTable: React.FC = () => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full border border-black text-black">
                <thead className="bg-gray-100">
                <tr>
                    <th className="border border-black px-2 py-2 text-left text-xs sm:text-sm md:text-base lg:text-lg">
                        ID
                    </th>
                    <th className="border border-black px-2 py-2 text-left text-xs sm:text-sm md:text-base lg:text-lg">
                        Name
                    </th>
                    <th className="border border-black px-2 py-2 text-left text-xs sm:text-sm md:text-base lg:text-lg">
                        Age
                    </th>
                    <th className="border border-black px-2 py-2 text-left text-xs sm:text-sm md:text-base lg:text-lg">
                        Vaccine
                    </th>
                    <th className="border border-black px-2 py-2 text-left text-xs sm:text-sm md:text-base lg:text-lg">
                        Status
                    </th>
                </tr>
                </thead>
                <tbody>
                {cattleData.map(({ id, name, age, vaccine, status }) => (
                    <tr key={id} className="hover:bg-gray-200 cursor-pointer">
                        <Link href={`/animals/${id}`} className="contents">
                            <td className="border border-black px-2 py-2 text-xs sm:text-sm md:text-base lg:text-lg">
                                {id}
                            </td>
                            <td className="border border-black px-2 py-2 text-xs sm:text-sm md:text-base lg:text-lg">
                                {name}
                            </td>
                            <td className="border border-black px-2 py-2 text-xs sm:text-sm md:text-base lg:text-lg">
                                {age}
                            </td>
                            <td className="border border-black px-2 py-2 text-xs sm:text-sm md:text-base lg:text-lg">
                                {vaccine}
                            </td>
                            <td className="border border-black px-2 py-2 text-xs sm:text-sm md:text-base lg:text-lg">
                                {status}
                            </td>
                        </Link>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default CattleTable;
