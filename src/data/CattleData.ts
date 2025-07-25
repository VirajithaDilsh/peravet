export interface Cattle {
    id: number;
    name: string;
    age: number;
    vaccine: string;
    status: "Vaccinated" | "Pending" | "Unknown";
}

export const cattleData: Cattle[] = [
    { id: 1, name: "Cow A", age: 4, vaccine: "FMD", status: "Vaccinated" },
    { id: 2, name: "Cow B", age: 2, vaccine: "PPR", status: "Pending" },
    { id: 3, name: "Cow C", age: 3, vaccine: "Enterotoxemia", status: "Vaccinated" },
    { id: 4, name: "Cow D", age: 5, vaccine: "HS", status: "Pending" },
    { id: 5, name: "Cow E", age: 5, vaccine: "HS", status: "Pending" },
    // add more cattle here
];
